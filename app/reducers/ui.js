import createReducer from "reducers/reducer";


export default createReducer({
    name: "ui",

    defaultValue: {
        dashboardOpen: true
    },

    actions: {
        dashboard: function (state, action) {
            return {
                ...state,
                dashboardOpen: action.state
            };
        }
    }
});
