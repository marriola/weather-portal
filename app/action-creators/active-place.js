import activePlace from "reducers/active-place";

let ActivePlace = {
    set: function (place) {
        return {
            type: activePlace.action("set"),
            place
        };
    }
};

export default ActivePlace;
