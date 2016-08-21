import { v4 as uuid } from "node-uuid";
import bigInt from "big-integer";
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

function uuidToBase62(id) {
    let bgid = bigInt(id.replace(/-/g, ""), 16);
    let answer = "";

    while (bgid.greater(0)) {
        let qr = bgid.divmod(62);
        let r = qr.remainder.valueOf();
        let char = "";

        if (r < 10) {
            char = String(r);
        }
        else if (r < 36) {
            char = String.fromCharCode(65 + r - 10);
        }
        else {
            char = String.fromCharCode(97 + r - 36);
        }

        answer += char;
        bgid = qr.quotient;
    }

    return answer;
}

////////////////////////////////////////////////////////////////////////////////

class Place {
    constructor(location) {
	this.key = uuidToBase62(uuid());
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
            this.city = location;
            this.state = "";
        }
    }
}


////////////////////////////////////////////////////////////////////////////////

export {
    Place,
    PlaceStatus
};
