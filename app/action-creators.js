import { store } from "initialize";
import { errors, places, activePlace, satellite, ui } from "reducers";

let Places = {
    add: function (place) {
	store.dispatch(Errors.clear());

	return {
	    type: places.action("add"),
	    payload: place
	};
    },

    remove: function (key) {
	return {
	    type: places.action("remove"),
	    key
	};
    },

    update: function (key, obj) {
        return {
            type: places.action("update"),
            key,
            obj
        };
    },

    fail: function (key) {
	return {
	    type: places.action("fail"),
	    key
	};
    },
    
    load: function (key, response) {
	if (response.response.error) {
	    store.dispatch(Errors.add(response.response.error.description));
	    return this.remove(key);
	}
	
	return {
	    type: places.action("load"),
	    key,
	    response
	};
    }
};

let Errors = {
    add: function (message) {
	return {
	    type: errors.action("add"),
	    message
	};
    },

    clear: function () {
	return {
	    type: errors.action("clear")
	};
    }
};

let ActivePlace = {
    set: function (place) {
        return {
            type: activePlace.action("set"),
            place
        };
    }
};

let Satellite = {
    update: function (props) {
        return {
            type: satellite.action("update"),
            props
        };
    }
};

let Content = {
    update: function (props) {
        return {
            type: content.action("update"),
            props
        };
    }
};

let UI = {
    toggleDashboard: function (state) {
        return {
            type: ui.action("dashboard"),
            state
        }
    }
};

export { Places, Errors, ActivePlace, Satellite, Content, UI };
