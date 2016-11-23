import ActivePlace from "action-creators/active-place";
import Almanac from "action-creators/almanac";
import Content from "action-creators/content";
import Errors from "action-creators/errors";
import Forecast from "action-creators/forecast";
import Nearby from "action-creators/nearby";
import Places from "action-creators/places";
import Satellite from "action-creators/satellite";
import UI from "action-creators/ui";

import store from "initialize";

export function ActionCreator(descriptor) {
    for (let key in descriptor) {
        let action = descriptor[key]
        this[key] = function() { store.dispatch(action.apply(null, arguments)); };
    }
}

export default {
    ActivePlace,
    Almanac,
    Content,
    Errors,
    Forecast,
    Nearby,
    Places,
    Satellite,
    UI
};
