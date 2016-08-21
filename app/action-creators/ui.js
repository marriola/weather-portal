import ui from "reducers/ui";

export default {
    toggleDashboard: function (state) {
        return {
            type: ui.action("dashboard"),
            state
        }
    }
};
