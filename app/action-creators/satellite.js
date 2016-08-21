import satellite from "reducers/satellite";

export default {
    update: function (props) {
        return {
            type: satellite.action("update"),
            props
        };
    }
};