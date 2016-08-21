import { store } from "initialize";
import Errors from "action-creators/errors";
import places from "reducers/places";

export default {
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
