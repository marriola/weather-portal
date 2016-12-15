import createReducer from "reducers/reducer";
import { TemperatureScale } from "components/Conditions";


export default createReducer({
    name: "ui",

    defaultValue: {
        dashboardOpen: true,
        scale: TemperatureScale.F
    },

    actions: {
        dashboard: function (state, action) {
            return {
                ...state,
                dashboardOpen: action.state
            };
        },

        setScale: function (state, action) {
            return {
                ...state,
                scale: action.scale
            };
        }
    }
});
