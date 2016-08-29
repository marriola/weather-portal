import ActivePlace from "action-creators/active-place";
import Almanac from "action-creators/almanac";
import Content from "action-creators/content";
import Errors from "action-creators/errors";
import Forecast from "action-creators/forecast";
import Places from "action-creators/places";
import Satellite from "action-creators/satellite";
import UI from "action-creators/ui";

import store from "initialize";

export function createActionCreator(obj) {
    obj.actions = {};
    
    for (let key in obj) {
        let action = obj[key]
        obj[key] = function() { store.dispatch(action.apply(null, arguments)); };
    }

    return obj;
}

export default {
    ActivePlace,
    Almanac,
    Content,
    Errors,
    Forecast,
    Places,
    Satellite,
    UI
};
