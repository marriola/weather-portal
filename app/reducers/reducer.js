import { cloneExtend, required } from "utils";

let crRequired = required.bind(null, "createReducer");


////////////////////////////////////////////////////////////////////////////////

export default function createReducer({
    defaultValue = crRequired("defaultValue"),
    name = crRequired("name"),
    preAction,
    postAction,
    methods = {},
    actions = crRequired("actions"),
    globalActions = {}
}) {
    let actionTable = Object.assign({}, globalActions);
    let me;

    let reducer = function (state = defaultValue, action) {
        if (preAction) {
            state = preAction.call(me, state, action) || state;
        }

        let defaultAction = () => state;
	let actionFn = actionTable[action.type] || defaultAction;
	let newState = actionFn.call(me, state, action);

        if (postAction) {
            newState = postAction.call(me, state, actions, newState) || newState;
        }

        return newState;
    }

    me = reducer;

    reducer.action = function (action) {
        return name + "$" + action;
    }

    Object.getOwnPropertyNames(actions).forEach(key => {
        actionTable[reducer.action(key)] = actions[key];
    });

    Object.getOwnPropertyNames(methods).forEach(key => {
        reducer[key] = methods[key];
    });
    
    return reducer;
}
