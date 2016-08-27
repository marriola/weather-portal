import store from "initialize";
import errors from "reducers/errors";

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

export default Errors;
