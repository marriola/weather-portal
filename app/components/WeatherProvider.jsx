import React from "react";
import { connect } from "decorators";
import Axios from "axios";
import { PlaceStatus } from "place";
import Actions from "action-creators";


////////////////////////////////////////////////////////////////////////////////

const WEATHER_API_BASE = "http://api.wunderground.com/api";

const MAX_TRIES = 5;


////////////////////////////////////////////////////////////////////////////////

/*
 * Provides weather services to child components
 */
@connect("places")
export default class WeatherProvider extends React.Component {
    constructor(props) {
        super(props);
        
        this.render = this.render.bind(this);
    }

    getConditions(place) {
        return this.get(place, "conditions")
            .then(response => {
                if (response.data.response.error) {
                    this.props.dispatch(Actions.Errors.add(response.data.response.error.description));
                    return null;
                }  
                else if (response.data.response.results) {
                    // Got search results
                    
                    this.props.dispatch(Actions.Places.update(place.key, {
                        status: PlaceStatus.choosing,
                        results: response.data.response.results
                    }));
                }
                else {
		    this.props.dispatch(Actions.Places.update(place.key, {
                        "status": PlaceStatus.loaded,
                        "conditions": response.data
                    }));
                }

                return response.data;
            })
            .catch(error => {
                this.props.dispatch(Actions.Places.fail(place.key));
            });
    }

    getSatellite (place) {
        this.props.dispatch(Actions.Satellite.update({
            refresh: false,
            status: 0
        }));

        return this.get(place, "satellite")
            .then(response => {
                this.props.dispatch(Actions.Satellite.update({
                    status: 1,
                    pics: response.data.satellite
                }));
            })
            .catch(error => {
                this.props.dispatch(Actions.Satellite.update({
                    status: 2
                }));                
            });
    }

    get (place, feature, promise = null, tries = 0) {
        let path = this.queryPath(place, feature);
        promise = promise || Axios.get(path);

        if (tries == MAX_TRIES) {
            throw "Max tries exceeded";
        }
        
        return promise
            .catch(error => {
		if (error.message == "Network Error") {
		    this.get(place, feature, promise, ++tries);
		} else {
                    /* this.props.dispatch(Actions.Errors.add(error.message));*/
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
        } else if (children.length == 1) {
            return children;
        } else {
            return (
                <div>
                    {children}
                </div>
            );
        }
    }
}
