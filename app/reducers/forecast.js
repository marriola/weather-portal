import createReducer from "reducers/reducer";
import { ForecastStatus } from "components/Forecast";


export default createReducer({
    name: "forecast",

    defaultValue: {
        status: ForecastStatus.loading
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
                status: ForecastStatus.failed
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
