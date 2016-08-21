import createReducer from "reducers/reducer";
import { v4 as uuid } from "node-uuid";


export default createReducer({
    name: "errors",
    
    defaultValue: [],

    actions: {
        add: function addError (state, action) {
            let err = {
                key: uuid(),
                message: action.message
            };
            
	    return [...state, err];
        },

        
        clear: function clearErrors (state, action) {
	    return [];
        }
    }
});
