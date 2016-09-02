import autobind from "autobind-decorator";
import React from "react";
import Panel from "components/Panel";
import store from "initialize";
import { Place, PlaceStatus } from "place";
import Actions from "action-creators";
import { wuCountryCodeToName } from "country-codes";


////////////////////////////////////////////////////////////////////////////////

let Conditions = ({ countryName, conditions, ...props }) => {
    let zip = conditions.display_location.zip;
    if (zip === "00000")
        zip = null;
    
    return (
	<div>
            { countryName }<br/>
	    { zip }

	    <ul className="bulletless">
		<li>
                    { conditions.weather }
                </li>
		<li>
                    { conditions.temp_f } &deg;F
                </li>
                <li>
                    Feels like { conditions.feelslike_f } &deg;F
                </li>
	    </ul>

	    <button onClick={ props.refresh }>
                Refresh
            </button>

            <button onClick={ props.peek }>
                Details
            </button>
        </div>
    );
}


////////////////////////////////////////////////////////////////////////////////

let SearchResults = ({ pb, results, chooseCity }) => (
    <ul className="padding-left-20">
        {
            results.map(place => (
                <li key={ place.zmw }>
                    <a className="pointer" onClick={ chooseCity.bind(chooseCity.prototype, place.zmw) }>
                        { [place.city, place.state, wuCountryCodeToName(place.country)].filter(x => !!x).join(", ") }
                    </a>
                </li>
            ))
        }
    </ul>
);


////////////////////////////////////////////////////////////////////////////////

@autobind
export default class PlaceBox extends React.Component {
    constructor(props) {
	super(props);
    }

    remove() {
	this.props.remove(this.props.place);
    }

    // Initiates a refresh
    refresh() {
	Actions.Places.update(this.props.place.key, {
            "status": PlaceStatus.loading
        });
    }

    // When status is set to loading, call out to provider to get conditions
    update() {
	if (this.props.place.status == PlaceStatus.loading) {
	    this.props.weather.getConditions(this.props.place).then((response => {
                if (response) {
		    Actions.Places.load(this.props.place.key, response);
                }
                else { //if (this.props.place.status == PlaceStatus.loading)
                    // If null was returned, then there was an error.
                    this.remove();
                }
            }).bind(this));
	}
    }

    peek() {
        Actions.ActivePlace.set(this.props.place);
    }

    chooseCity(zmw) {
        Actions.Places.update(this.props.place.key, {
            status: PlaceStatus.loading,
            zmw
        });
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    render() {
        let content = null;

        switch (this.props.place.status) {
            case PlaceStatus.loading:
	        content = <img className="loader" />;
                break;
                
            case PlaceStatus.choosing:
                content = <SearchResults results={ this.props.place.results }
                                         chooseCity={ this.chooseCity }
                          />;
                break;   
                
            case PlaceStatus.loaded:
                content = <Conditions conditions={ this.props.place.conditions.current_observation }
                                      countryName={ wuCountryCodeToName(this.props.place.country) }
                                      refresh={ this.refresh }
                                      peek={ this.peek }
                        />;
                break;
                
            default:
            case PlaceStatus.failed:
                content = (
                    <div>
                        <div className="error">Failed</div>
                        
                        <button onClick={ this.refresh }>
                            Refresh
                        </button>
                    </div>
                );
                break;
        }

	let weatherBox = (
            <Panel className="conditions"
                   title={ this.props.place.displayName }
                   close={ this.remove }
                   noFloat={true}>
                { content }
	    </Panel>
	);
	
	return weatherBox;
    }
}
