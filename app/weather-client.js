import Axios from "axios";
import { store } from "initialize";
import { PlaceStatus } from "place";
import ErrorsAC from "action-creators/errors";
import PlacesAC from "action-creators/places";
import SatelliteAC from "action-creators/satellite";
import Satellite from "components/Satellite";


////////////////////////////////////////////////////////////////////////////////

const WEATHER_API_BASE = "http://api.wunderground.com/api";

const WEATHER_API_KEY = "7798a11635de8815";

const MAX_TRIES = 5;


////////////////////////////////////////////////////////////////////////////////

/*
 * Provides weather services to a React component
 */
export default class WeatherClient {
    init(place) {
        if (this.__INITIALIZED)
            return;

        this.__INITIALIZED = true;
	this.apiKey = WEATHER_API_KEY;

	this.placeKey = place.key;
        this.placeName = place.displayName;
	this.city = place.city;
	this.state = place.state;
	this.zip = place.zip;
    }

    getPlace(key) {
        let matching = store.getState().places.filter(x => x.key === key);

        return matching.length > 0 ? matching[0] : null;
    }

    getConditions(tries = 0) {
	if (tries == MAX_TRIES) {
	    store.dispatch(PlacesAC.fail(this.placeKey));
	    return;
	}
	
	let path = this.queryPath("conditions");

	return Axios
	    .get(path)
	    .then(response => {
                if (response.data.response.results) {
                    // Got search results
                    
                    store.dispatch(PlacesAC.update(this.placeKey, {
                        status: PlaceStatus.choosing,
                        results: response.data.response.results
                    }));
                }
                else {
		    store.dispatch(PlacesAC.update(this.placeKey, {
                        "status": PlaceStatus.loaded,
                        "conditions": response.data
                    }));
                }

                return response.data;
	    })
	    .catch(error => {
		if (error.message == "Network Error") {
		    this.getConditions(++tries);
		    /* } else {
                     *     /* store.dispatch(ErrorsAC.add(error.message));
                    *     console.log(error.message);*/
                }
	    });
    }

    getSatellite (tries = 0) {
        if (tries == MAX_TRIES) {
            store.dispatch(SatelliteAC.update({
                status: 2
            }));
        }
        
        let path = this.queryPath("satellite");

        store.dispatch(SatelliteAC.update({
            refresh: false,
            status: 0
        }));

        return Axios
            .get(path)
            .then(response => {
                store.dispatch(SatelliteAC.update({
                    status: 1,
                    pics: response.data.satellite
                }));
            })
            .catch(error => {
		if (error.message == "Network Error") {
		    this.getConditions(++tries);
		} else {
                    /* store.dispatch(ErrorsAC.add(error.message));*/
                    console.log(error.message);
                }
            })
    }
    
    queryPath(feature) {
        let place = this.getPlace(this.placeKey);
        let path = `${WEATHER_API_BASE}/${this.apiKey}/${feature}/q/`;

        if (place.zmw) {
            path += `zmw:${place.zmw}`;
        }
	else if (this.city) {
	    path += `${this.state}/${this.city}`;
	} else {
	    path += this.zip;
	}

	return path + ".json";
    }
}
