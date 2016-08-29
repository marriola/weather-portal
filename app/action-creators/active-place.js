import activePlace from "reducers/active-place";
import { createActionCreator } from "action-creators";

export default createActionCreator({
    set: function (place) {
        return {
            type: activePlace.action("set"),
            place
        };
    }
});
