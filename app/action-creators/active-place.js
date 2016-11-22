import activePlace from "reducers/active-place";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
    preset: function (name) {
        return {
            type: activePlace.action("preset"),
            name
        };
    },

    clearPreset: function () {
        return {
            type: activePlace.action("clearPreset")
        };
    },
    
    set: function (place) {
        return {
            type: activePlace.action("set"),
            place
        };
    }
});
