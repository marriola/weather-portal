import almanac from "reducers/almanac";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
    update: function (props) {
        return {
            type: almanac.action("update"),
            props
        };
    },

    fail: function () {
        return {
            type: almanac.action("fail")
        };
    }
});
