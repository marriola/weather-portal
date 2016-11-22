import store from "initialize";
import Errors from "action-creators/errors";
import places from "reducers/places";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
    add: function (place) {
	Errors.clear();

	return {
	    type: places.action("add"),
	    payload: place
	};
    },

    addPreselect: function (place) {
        Errors.clear();

        return {
            type: places.action("addPreselect"),
            payload: place
        };
    },

    remove: function (key) {
	return {
	    type: places.action("remove"),
	    key
	};
    },

    update: function (key, obj, response) {
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
	    Errors.add(response.response.error.description);
	    return this.remove(key);
	}
	
	return {
	    type: places.action("load"),
	    key,
	    response
	};
    }
});
