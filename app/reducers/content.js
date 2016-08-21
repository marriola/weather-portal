import createReducer from "reducers/reducer";


export default createReducer({
    name: "content",

    defaultValue: {
        status: 1,
        dashboardOpen: true
    },

    actions: {
        update: function (state, action) {
            return {
                ...state,
                ...action.props
            };
        }
    },

    globalActions: {
        activePlace$set: function (state, action) {
            return {
                ...state,
                place: action.place,
                weather: action.place.weather,
                refresh: true
            };
        },
        
        ui$dashboard: function (state, action) {
            return {
                ...state,
                dashboardOpen: action.state
            };
        }
    }
});