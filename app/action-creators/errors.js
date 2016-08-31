import store from "initialize";
import errors from "reducers/errors";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
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
});
