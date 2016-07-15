import React from "react";
import { connect } from "decorators";

@connect("errors")
class ErrorList extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	let errorList = this.props.errors.map(x => (
	    <li key={ x.key } className="error">
		{ x.message }
	    </li>
	));
	
	return (
	    <ul>
		{ errorList }
	    </ul>
	);
    }
}

export default ErrorList;
