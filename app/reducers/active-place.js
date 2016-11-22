import createReducer from "reducers/reducer.js";


export default createReducer({
    name: "activePlace",

    defaultValue: {},

    actions: {
        set: function (state, action) {
            return {
                ...state,
                place: action.place
            };
        }
    },

    subscribeTo: {
        places: {
            addPreselect: function (state, action) {
                return {
                    ...state,
                    presetPlace: action.payload
                };
            }
        }
    }
});
