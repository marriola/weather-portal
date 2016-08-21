import createReducer from "reducers/reducer";


export default createReducer({
    name: "satellite",

    defaultValue: {
        status: 1
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
        }
    }
});
