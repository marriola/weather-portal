import createReducer from "reducers/reducer.js";


export default createReducer({
    name: "activePlace",

    defaultValue: {},

    actions: {
        /* preset: function (state, action) {
         *     return {
         *         ...state,
         *         presetPlace: action.payload
         *     };
         * },*/
        
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
