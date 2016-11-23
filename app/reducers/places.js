import { cloneExtend } from "utils";
import createReducer from "reducers/reducer";
import { Place, PlaceStatus } from "place";


export default createReducer({
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


        addPreselect: function addPlace (state, action) {
            let displayNames = state.map(x => x.displayName);
            let place = new Place(action.payload);
            place.displayName = this.displayName(place);

            if (!displayNames.includes(place.displayName)) {
	        return [
	            place,
	            ...state
	        ];
            }
            else {
                return state;
            }
        },

        
        remove: function removePlace (state, action) {
	    return state.slice().filter(x => x.key !== action.key);
        },

        
        load: function loadPlace (state, action) {
            if (!action.response.current_observation)
                return state;
            
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
