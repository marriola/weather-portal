import store from "initialize";
import errors from "reducers/errors";
import { createActionCreator } from "action-creators";

export default createActionCreator({
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
