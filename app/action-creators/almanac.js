import almanac from "reducers/almanac";

export default {
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
};
