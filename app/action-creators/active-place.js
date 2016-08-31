import activePlace from "reducers/active-place";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
    set: function (place) {
        return {
            type: activePlace.action("set"),
            place
        };
    }
});
