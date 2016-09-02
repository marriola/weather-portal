import createReducer from "reducers/reducer";
import { SatelliteStatus } from "components/Satellite";


export default createReducer({
    name: "satellite",

    defaultValue: {
        status: SatelliteStatus.loading
    },

    actions: {
        update: function (state, action) {
            return {
                ...state,
                ...action.props
            };
        },

        fail: function (state, action) {
            return {
                ...state,
                status: SatelliteStatus.failed
            };
        }
    },

    subscribeTo: {
        activePlace: {
            set: function (state, action) {
                return {
                    ...state,
                    place: action.place,
                    weather: action.place.weather,
                    refresh: true
                };
            }
        }
    }
});
