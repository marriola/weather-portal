import React from "react";
import { connect } from "decorators";
import { Place, PlaceStatus } from "place";
import Actions from "action-creators";
import PlaceBox from "components/PlaceBox";


////////////////////////////////////////////////////////////////////////////////

@connect("places")
class AddPlace extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    newPlace: ""
	};
    }

    placeChange(e) {
	this.setState({
	    newPlace: e.target.value
	});
    }

    addNew() {
	this.props.dispatch(Actions.Places.add(this.state.newPlace));

	this.setState({ newPlace: "" });
    }

    keyUp(e) {
	if ((e.which || e.keyCode) == 13) {
	    this.addNew();
	}
    }

    render() {
	return (
	    <div>
		<input type="text" autoFocus={true}
		       value={ this.state.newPlace }
		       onChange={ this.placeChange.bind(this) }
		       onKeyUp={ this.keyUp.bind(this) }
		/>

		<button className="addButton" onClick={ this.addNew.bind(this) }>
		    Add
		</button>
	    </div>
	);
    }
}


////////////////////////////////////////////////////////////////////////////////

@connect("places")
class PlaceList extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	let placeBoxes = this.props.places.map(place => (
	    <PlaceBox key={ place.key }
		      place={ place }
		      remove={ this.props.remove }
		      dispatch={ this.props.dispatch }
	    />
	));

	return (
	    <div>
		{ placeBoxes }
	    </div>
	);
    }
}


////////////////////////////////////////////////////////////////////////////////

@connect("places")
class PlacesContainer extends React.Component {
    constructor(props) {
	super(props);
    }

    addPlace(place) {
	this.props.dispatch(Actions.Places.add(new Place(place.city, place.state)));
    }

    removePlace(place) {
	this.props.dispatch(Actions.Places.remove(place.key));
    }

    render() {
	return (
            <div>
	        <AddPlace places={ this.props.places } add={ this.addPlace.bind(this) } />

                <div className="placeBox">
	            <PlaceList remove={ this.removePlace.bind(this) } />
	        </div>
            </div>
        );
    }
}

export default PlacesContainer;
