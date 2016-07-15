import React from "react";
import { Place, PlaceStatus } from "place";
import * as Actions from "action-creators";
import { wuCountryCodeToName } from "country-codes";


////////////////////////////////////////////////////////////////////////////////

class Conditions extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	return (
	    <div>
                { this.props.countryName }<br/>
		{ this.props.conditions.display_location.zip }

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

    update() {
	this.props.dispatch(Actions.Places.update(this.props.place.key, { "status": PlaceStatus.loading }));
	this.props.place.weather.getConditions();
    }

    peek() {
        this.props.dispatch(Actions.ActivePlace.set(this.props.place));
    }

    chooseCity(zmw) {
        this.props.dispatch(Actions.Places.update(this.props.place.key, {
            status: PlaceStatus.loading,
            zmw
        }));
	this.props.place.weather.getConditions();
    }

    render() {
	let content;

        if (this.props.place.status == PlaceStatus.loading) {
	    content = <img className="loader" />;
        }
        else {
            let results = this.props.place.results ? (
                <ul>
                    { this.props.place.results.map(place => (
                          <li><a href="javascript:void(0)" onClick={ this.chooseCity.bind(this, place.zmw) }>
                              { place.city }, { place.state }, { wuCountryCodeToName(place.country) }
                          </a></li>
                      )) }
                </ul>
            ) : null;
            
            let top = this.props.place.status == PlaceStatus.loaded ?
                      <Conditions conditions={ this.props.place.conditions.current_observation }
                                  countryName={ wuCountryCodeToName(this.props.place.country) }
                      /> :
	              results;

            content = (
                <div>
                    { this.props.place.status == PlaceStatus.failed ?
                      <div className="error">Failed</div> :
                      top }

                    <button onClick={ this.update.bind(this) }>
                        Update
                    </button>
                    
                    <button onClick={ this.peek.bind(this) }>
                        Peek
                    </button>
                </div>
            );
        }

	let weatherBox = (
	    <div className="box">
		<a href="javascript:void(0)" className="float-button" onClick={ this.remove.bind(this) }></a>		
		<b>{ this.props.place.displayName }</b>
		{ content }
	    </div>
	);
	
	return weatherBox;
    }

    componentDidMount() {
	if (this.props.place.status == PlaceStatus.loading) {
	    this.props.place.weather.init(this.props.place);
	    this.props.place.weather.getConditions();
	}
    }
}
