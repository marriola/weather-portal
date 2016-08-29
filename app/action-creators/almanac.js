import almanac from "reducers/almanac";
import { createActionCreator } from "action-creators";

export default createActionCreator({
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
