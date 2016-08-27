import React from "react";
import Axios from "axios";
import store from "initialize";
import { connect } from "decorators";
import Actions from "action-creators";
import { PlaceStatus } from "place";
import { SatelliteStatus } from "components/Satellite";

////////////////////////////////////////////////////////////////////////////////

const WEATHER_API_BASE = "http://api.wunderground.com/api";


////////////////////////////////////////////////////////////////////////////////

/*
 * Provides weather services to child components
 */
export default class WeatherProvider extends React.Component {
    constructor(props) {
        super(props);
        
        this.render = this.render.bind(this);
    }

    getConditions(place) {
        return this.get(place, "conditions")
            .then(response => {
                if (response.data.response.error) {
                    store.dispatch(Actions.Errors.add(response.data.response.error.description));
                    return null;
                }  
                else if (response.data.response.results) {
                    // Got search results
                    
                    store.dispatch(Actions.Places.update(place.key, {
                        status: PlaceStatus.choosing,
                        results: response.data.response.results
                    }));
                }
                else {
		    store.dispatch(Actions.Places.update(place.key, {
                        "status": PlaceStatus.loaded,
                        "conditions": response.data
                    }));
                }

                return response.data;
            })
            .catch(error => {
                store.dispatch(Actions.Places.fail(place.key));
            });
    }

    getSatellite (place) {
        store.dispatch(Actions.Satellite.update({
            refresh: false,
            status: SatelliteStatus.loading
        }));

        return this.get(place, "satellite")
            .then(response => {
                store.dispatch(Actions.Satellite.update({
                    status: SatelliteStatus.loaded,
                    pics: response.data.satellite
                }));
            })
            .catch(error => {
                store.dispatch(Actions.Satellite.fail());                
            });
    }

    get (place, feature, promise = null, tries = 0) {
        if (tries == this.props.maxTries) {
            throw "Max tries exceeded";
        }

        promise = promise || Axios.get(this.queryPath(place, feature));

        return promise
            .catch(error => {
		if (error.message == "Network Error") {
		    this.get(place, feature, promise, ++tries);
		} else {
                    /* store.dispatch(Actions.Errors.add(error.message));*/
                    console.log(error.message);
                }
            })
    }
    
    queryPath(place, feature) {
        let path = `${WEATHER_API_BASE}/${this.props.apiKey}/${feature}/q/`;

        if (place.zmw) {
            path += `zmw:${place.zmw}`;
        }
	else if (place.city) {
	    path += `${place.state}/${place.city}`;
	} else {
	    path += place.zip;
	}

	return path + ".json";
    }

    render() {
        let children = React.Children.map(this.props.children,x => !x.props.receiveWeather ? x :
            React.cloneElement(x, {
                getConditions: this.getConditions.bind(this),
                getSatellite: this.getSatellite.bind(this)
            }));
        
        if (children.length == 0) {
            return null;
        }
        else if (children.length == 1) {
            return children;
        }
        else {
            return (
                <div>
                    {children}
                </div>
            );
        }
    }
}
