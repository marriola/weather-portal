import ui from "reducers/ui";
import { ActionCreator } from "action-creators";

export default new ActionCreator({
    toggleDashboard: function (state) {
        return {
            type: ui.action("dashboard"),
            state
        };
    },

    setScale: function (scale) {
        return {
            type: ui.action("setScale"),
            scale
        };
    }
});
