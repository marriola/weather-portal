import { v4 as uuid } from "node-uuid";
import { titleCase } from "utils";
import WeatherClient from "weather-client";


////////////////////////////////////////////////////////////////////////////////

const RE_ZIP_CODE = /^[0-9]{5}(-[0-9]{4})?$/;

let PlaceStatus = {
    loading: 0,
    loaded: 1,
    choosing: 2,
    failed: 3
};


////////////////////////////////////////////////////////////////////////////////

class Place {
    constructor(location) {
	this.key = uuid();
	this.status = PlaceStatus.loading;
	this.weather = new WeatherClient();

	if (location.includes(",")) {
	    let [city, state] = location.split(",").map(x => x.trim());
	    
	    this.city = titleCase(city);
	    this.state = state.toUpperCase();
	}
	else if (location.match(RE_ZIP_CODE)) {
	    this.zip = location;
	}
        else {
            /* 	    throw new Error("Expected City, State or ZIP code");*/
            this.city = location;
            this.state = "";
        }
    }

    displayName () {
        return [this.city, this.state, this.country].filter(x => !!x).join(", ") || this.zip;
    }
}


////////////////////////////////////////////////////////////////////////////////

export {
    Place,
    PlaceStatus
};