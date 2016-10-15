import autobind from "autobind-decorator";
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
@autobind
export default class WeatherProvider extends React.Component {
    serviceMethods = {
        getAlmanac,
        getConditions,
        getForecast,
        getSatellite
    };

    constructor(props) {
        super(props);
    }

    getConditions(place) {
        return this.get(place, "conditions")
            .then(response => {
                if (response.data.response.error) {
                    Actions.Errors.add(response.data.response.error.description);
                    return null;
                }  
                else if (response.data.response.results) {
                    // Got search results
                    
                    Actions.Places.update(place.key, {
                        status: PlaceStatus.choosing,
                        results: response.data.response.results
                    });
                }
                else {
		    Actions.Places.update(place.key, {
                        "status": PlaceStatus.loaded,
                        "conditions": response.data
                    });
                }

                return response.data;
            })
            .catch(error => {
                Actions.Places.fail(place.key);
            });
    }

    getSatellite (place) {
        Actions.Satellite.update({
            refresh: false,
            status: SatelliteStatus.loading
        });

        return this.get(place, "satellite")
                   .then(response => {
                       if (response.data.response.error) {
                           let notFound = response.data.response.error.type == "querynotfound";
                           let status = notFound ? SatelliteStatus.notfound : SatelliteStatus.failed;

                           Actions.Satellite.update({ status });
                       }
                       else {
                           Actions.Satellite.update({
                               status: SatelliteStatus.loaded,
                               pics: response.data.satellite
                           });
                       }
                   })
                   .catch(error => {
                       Actions.Satellite.fail();
                   });
    }

    getAlmanac (place) {
        return this.get(place, "almanac")
                   .then(response => {
                       if (response.data.response.error) {
                           let notFound = response.data.response.error.type == "querynotfound";
                           let status = notFound ? AlmanacStatus.notfound : AlmanacStatus.failed;
                           
                           Actions.Almanac.update({ status });
                       }
                       else {
                           Actions.Almanac.update({
                               status: AlmanacStatus.loaded,
                               almanac: response.data.almanac
                           });
                       }
                   });
    }

    getForecast (place) {
        Actions.Forecast.update({
            refresh: false,
            status: ForecastStatus.loading
        });

        return this.getAlmanac(place)
                   .then(() =>
                       this.get(place, "forecast")
                           .then(response => {
                               if (response.data.response.error) {
                                   let notFound = response.data.response.error.type == "querynotfound";
                                   let status = notFound ? ForecastStatus.notfound : ForecastStatus.failed;

                                   Actions.Forecast.update({ status });
                               }
                               else {
                                   Actions.Forecast.update({
                                       status: ForecastStatus.loaded,
                                       days: response.data.forecast.simpleforecast.forecastday
                                   });
                               }
                           }));
    }

    get (place, feature, promise = null, tries = 0) {
        let path = this.queryPath(place, feature);
        
        if (tries == this.props.maxTries) {
            throw `Max tries exceeded (${path})`;
        }

        promise = promise || Axios.get(path);

        return promise
            .catch(error => {
		if (error.message == "Network Error") {
		    this.get(place, feature, promise, tries + 1);
		} else {
                    /* Actions.Errors.add(error.message);*/
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
        }
        else {
	    path += place.zip;
        }

        return path + ".json";
    }
    
    render() {
        if (!this.props.children)
            return null;
        
        let children = React.Children.map(
            this.props.children,
            x => x.props.weather ?
                React.cloneElement(x, { weather: serviceMethods }) :
                x);
        
        if (children.length == 1) {
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
