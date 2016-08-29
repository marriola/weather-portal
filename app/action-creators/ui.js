import ui from "reducers/ui";
import { createActionCreator } from "action-creators";

export default createActionCreator({
    toggleDashboard: function (state) {
        return {
            type: ui.action("dashboard"),
            state
        }
    }
});
