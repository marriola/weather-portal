import { connect as reduxConnect } from "react-redux";

function mapStateToProps (storeName) {
    return function (state) {
	return {
            [storeName]: state[storeName]
        };
    };
}

export function connect (storeName) {
    let mapper = mapStateToProps(storeName);

    return function (target) {
        return reduxConnect(mapper)(target);
    }
}
