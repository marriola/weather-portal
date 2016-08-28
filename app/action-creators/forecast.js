import forecast from "reducers/forecast";

export default {
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
};
