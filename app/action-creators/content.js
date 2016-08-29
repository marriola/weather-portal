import content from "reducers/content";
import { createActionCreator } from "action-creators";

export default createActionCreator({
    update: function (props) {
        return {
            type: content.action("update"),
            props
        };
    }
});
