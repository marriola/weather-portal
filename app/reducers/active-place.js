import createReducer from "reducers/reducer.js";


export default createReducer({
    name: "activePlace",

    defaultValue: {},

    actions: {
        set: function (state, action) {
            return {
                place: action.place
            };
        }
    }
});
