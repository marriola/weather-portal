import forecast from "reducers/forecast";
import { createActionCreator } from "action-creators";

export default createActionCreator({
    update: function (props) {
        return {
            type: forecast.action("update"),
            props
        };
    },

    fail: function () {
        return {
            type: forecast.action("fail")
        };
    }
});
