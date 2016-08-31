import satellite from "reducers/satellite";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
    update: function (props) {
        return {
            type: satellite.action("update"),
            props
        };
    },

    fail: function () {
        return {
            type: satellite.action("fail")
        }
    }
});
