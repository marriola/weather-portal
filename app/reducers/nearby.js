import createReducer from 'reducers/reducer.js';
import { PanelStatus } from 'components/Panel';

export default createReducer({
    name: "nearby",

    defaultValue: {
//        status: PanelStatus.loading
    },

    actions: {
        update: function (state, action) {
            return {
                ...state,
                status: action.status
            };
        }
    },

    subscribeTo: {
        activePlace: {
            set: function (_state, action) {
                console.log(`reducers/nearby: set ${action.place.city}, ${action.place.state}`);
                let { city, state } = action.place;
                return { city, state };
            },

            clearPreset: function (state, action) {
                return {
                    city: null,
                    state: null
                };
            }
        }
    }
});
