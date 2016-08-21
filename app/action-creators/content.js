import content from "reducers/content";

export default {
    update: function (props) {
        return {
            type: content.action("update"),
            props
        };
    }
};
