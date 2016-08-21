import createReducer from "reducers/reducer";
import { uniqueIdentifier } from "utils";


export default createReducer({
    name: "errors",
    
    defaultValue: [],

    actions: {
        add: function addError (state, action) {
            let err = {
                key: uniqueIdentifier(),
                message: action.message
            };
            
	    return [...state, err];
        },

        
        clear: function clearErrors (state, action) {
	    return [];
        }
    }
});
