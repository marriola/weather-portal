import forecast from "reducers/forecast";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
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
