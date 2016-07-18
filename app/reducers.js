import { cloneExtend } from "utils";
import { Place, PlaceStatus } from "place";
import { Errors } from "action-creators";
import { required } from "utils";
import { v4 as uuid } from "node-uuid";


////////////////////////////////////////////////////////////////////////////////

let crRequired = required.bind(null, "createReducer");


function createReducer({
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


////////////////////////////////////////////////////////////////////////////////

let places = createReducer({
    name: "places",
    
    defaultValue: [],

    preAction: function (state, action) {
        if (action.key)
	    this.index = state.findIndex(x => x.key === action.key);
    },

    methods: {
        countryName: function (name) {
            return wuCountryCodeToName(name) || name;
        },
        
        displayName: function (location) {
	    let { city, state: stateName, zip } = location;
            return [city, stateName].filter(x => !!x).join(", ") || zip;
        }
    },
    
    actions: {
        add: function addPlace (state, action) {
            let place = new Place(action.payload);
            place.displayName = this.displayName(place);
            
	    return [
	        place,
	        ...state
	    ];
        },

        
        remove: function removePlace (state, action) {
	    return state.slice().filter(x => x.key !== action.key);
        },

        
        load: function loadPlace (state, action) {
	    let property = action.property;
	    let { city, state: stateName, country, zip } = action.response.current_observation.display_location;

	    return cloneExtend(state, this.index, {
	        city,
	        state: stateName,
                country,
	        zip,
                displayName: this.displayName(action.response.current_observation.display_location)
	    });
        },

        
        update: function updatePlace (state, action) {
            let place = state[this.index];
            let displayName = !!place ? this.displayName(place) : "";
            
	    return cloneExtend(state, this.index, action.obj, { displayName });
        },

        
        fail: function failPlace (state, action) {
	    return cloneExtend(state, this.index, {
	        status: PlaceStatus.failed
	    });
        }
    }
});


////////////////////////////////////////////////////////////////////////////////

let errors = createReducer({
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


////////////////////////////////////////////////////////////////////////////////

let activePlace = createReducer({
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


////////////////////////////////////////////////////////////////////////////////

let satellite = createReducer({
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


////////////////////////////////////////////////////////////////////////////////

let content = createReducer({
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


////////////////////////////////////////////////////////////////////////////////

let ui = createReducer({
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


export { places, errors, activePlace, satellite, content, ui };
