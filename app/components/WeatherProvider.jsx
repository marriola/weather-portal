import React from "react";
import Axios from "axios";
import store from "initialize";
import { connect } from "decorators";
import Actions from "action-creators";
import { PlaceStatus } from "place";
import { SatelliteStatus } from "components/Satellite";
import { AlmanacStatus } from "almanac";
import { ForecastStatus } from "components/Forecast";

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
                       if (response.data.response.error) {
                           let status = SatelliteStatus.failed;
                           
                           if (response.data.response.error.type == "querynotfound") {
                               status = SatelliteStatus.notfound;
                           }

                           store.dispatch(Actions.Satellite.update({ status }));
                       }
                       else {
                           store.dispatch(Actions.Satellite.update({
                               status: SatelliteStatus.loaded,
                               pics: response.data.satellite
                           }));
                       }
                   })
                   .catch(error => {
                       store.dispatch(Actions.Satellite.fail());                
                   });
    }

    getAlmanac (place) {
        return this.get(place, "almanac")
                   .then(response => {
                       if (response.data.response.error) {
                           let status = AlmanacStatus.failed;
                           
                           if (response.data.response.error.type == "querynotfound") {
                               status = AlmanacStatus.notfound;
                           }
                           
                           store.dispatch(Actions.Almanac.update({ status }));
                       }
                       else {
                           store.dispatch(Actions.Almanac.update({
                               status: AlmanacStatus.loaded,
                               almanac: response.data.almanac
                           }));
                       }
                   });
    }

    getForecast (place) {
        store.dispatch(Actions.Forecast.update({
            refresh: false,
            status: ForecastStatus.loading
        }));

        return this.getAlmanac(place)
                   .then(() =>
                       this.get(place, "forecast")
                           .then(response => {
                               if (response.data.response.error) {
                                   let status = ForecastStatus.failed;
                                   
                                   if (response.data.response.error.type == "querynotfound") {
                                       status = ForecastStatus.notfound;
                                   }
                                   
                                   store.dispatch(Actions.Forecast.update({ status }));
                               }
                               else {
                                   store.dispatch(Actions.Forecast.update({
                                       status: ForecastStatus.loaded,
                                       days: response.data.forecast.simpleforecast.forecastday
                                   }));
                               }
                           }));
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
        let children = React.Children.map(this.props.children, x => !x.props.weather ? x :
            React.cloneElement(x, {
                weather: {
                    getAlmanac: this.getAlmanac.bind(this),
                    getConditions: this.getConditions.bind(this),
                    getForecast: this.getForecast.bind(this),
                    getSatellite: this.getSatellite.bind(this)
                }
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
