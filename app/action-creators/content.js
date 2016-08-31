import content from "reducers/content";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
    update: function (props) {
        return {
            type: content.action("update"),
            props
        };
    }
});
