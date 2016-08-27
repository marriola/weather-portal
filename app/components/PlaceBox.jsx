import React from "react";
import Panel from "components/Panel";
import { Place, PlaceStatus } from "place";
import Actions from "action-creators";
import { wuCountryCodeToName } from "country-codes";
import { store } from "initialize";


////////////////////////////////////////////////////////////////////////////////

class Conditions extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
        let zip = this.props.conditions.display_location.zip;
        if (zip === "00000")
            zip = null;
        
	return (
	    <div>
                { this.props.countryName }<br/>
		{ zip }

		<ul className="bulletless">
		    <li>{ this.props.conditions.weather }</li>
		    <li>{ this.props.conditions.temp_f } &deg;F</li>
		    {/* <li>{ this.props.conditions.relative_humidity } rel. humidity</li>
                    <li>{ this.props.conditions.wind_mph } mph { this.props.conditions.wind_dir }</li> */}
                    <li>Feels like { this.props.conditions.feelslike_f } &deg;F</li>
		</ul>
	    </div>
	);
    }
}


////////////////////////////////////////////////////////////////////////////////

export default class PlaceBox extends React.Component {
    constructor(props) {
	super(props);        
    }

    remove() {
	this.props.remove(this.props.place);
    }

    // Initiates a refresh
    refresh() {
	this.props.dispatch(Actions.Places.update(this.props.place.key, { "status": PlaceStatus.loading }));
        
	this.props.getConditions(this.props.place)
            .then(response => {
                let activePlace = store.getState().activePlace.place;
                
                if (activePlace && this.props.place.key === activePlace.key) {
                    this.props.dispatch(Actions.ActivePlace.set(this.props.place));
                }
            });
    }

    // Calls out to service, which will then update our place
    update() {
	if (this.props.place.status == PlaceStatus.loading) {
	    this.props.getConditions(this.props.place).then((response => {
                if (response)
		    this.props.dispatch(Actions.Places.load(this.props.place.key, response));
                else // If null was returned, then there was an error.
                    this.remove();
            }).bind(this));
	}
    }

    peek() {
        this.props.dispatch(Actions.ActivePlace.set(this.props.place));
    }

    chooseCity(zmw) {
        this.props.dispatch(Actions.Places.update(this.props.place.key, {
            status: PlaceStatus.loading,
            zmw
        }));
    }

    render() {
	let content;

        if (this.props.place.status == PlaceStatus.loading) {
	    content = <img className="loader" />;
        }
        else {
            let top = null;

            if (this.props.place.status == PlaceStatus.failed) {
                top = <div className="error">Failed</div>;
            }
            else if (this.props.place.status == PlaceStatus.loaded) {
                top = <Conditions conditions={ this.props.place.conditions.current_observation }
                                  countryName={ wuCountryCodeToName(this.props.place.country) }
                      />;
            }
            else if (this.props.place.results) {
                top = (
                    <ul>
                        { this.props.place.results.map(place => (
                              <li><a href="javascript:void(0)" onClick={ this.chooseCity.bind(this, place.zmw) }>
                                  { [place.city, place.state, wuCountryCodeToName(place.country)].filter(x => !!x).join(", ") }
                              </a></li>
                          )) }
                    </ul>
                );
            }

            content = (
                <div>
                    { top }

                    <button onClick={ this.refresh.bind(this) }>
                        Refresh
                    </button>
                    
                    <button onClick={ this.peek.bind(this) }>
                        Details
                    </button>
                </div>
            );
        }

	let weatherBox = (
            <Panel className="conditions"
                   title={ this.props.place.displayName }
                   close={ this.remove.bind(this) }>
		{ content }
	    </Panel>
	);
	
	return weatherBox;
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }
}
