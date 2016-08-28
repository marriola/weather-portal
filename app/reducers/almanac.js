import createReducer from "reducers/reducer";


export default createReducer({
    name: "almanac",

    defaultValue: {
        status: 1
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
                status: 2
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
