import { connect as reduxConnect } from "react-redux";

function mapStateToProps (storeNames) {
    return function (state) {
        let props = {};
        for (let name of storeNames) {
            props[name] = state[name];
        }
        
	return props;
    };
}

export function connect (...storeNames) {
    let mapper = mapStateToProps(storeNames);

    return function (target) {
        return reduxConnect(mapper)(target);
    };
}
