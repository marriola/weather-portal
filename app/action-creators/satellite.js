import satellite from "reducers/satellite";
import { createActionCreator } from "action-creators";

export default createActionCreator({
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
