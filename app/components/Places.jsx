import autobind from "autobind-decorator";
import React from "react";
import { connect } from "decorators";
import { Place, PlaceStatus } from "place";
import Actions from "action-creators";
import PlaceBox from "components/PlaceBox";


////////////////////////////////////////////////////////////////////////////////

@autobind
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
	Actions.Places.add(this.state.newPlace);

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
		       onChange={ this.placeChange }
		       onKeyUp={ this.keyUp }
		/>

		<button className="addButton" onClick={ this.addNew }>
		    Add
		</button>
	    </div>
	);
    }
}


////////////////////////////////////////////////////////////////////////////////

let PlaceList = ({ places, ...props }) => (
    <div className="placeBox">
        <nobr>
        { places.map(place =>
              <PlaceBox key={ place.key }
		        place={ place }
		        remove={ props.remove }
                        weather={ props.weather }
              />
          ) }
        </nobr>
    </div>
);


////////////////////////////////////////////////////////////////////////////////

@connect("places")
@autobind
class PlacesContainer extends React.Component {
    constructor(props) {
	super(props);
    }

    addPlace(place) {
	Actions.Places.add(new Place(place.city, place.state));
    }

    removePlace(place) {
	Actions.Places.remove(place.key);
    }

    render() {
	return (
            <div>
	        <AddPlace places={ this.props.places }
                          add={ this.addPlace } />

	        <PlaceList places={ this.props.places }
                           remove={ this.removePlace }
                           weather={ this.props.weather } />
            </div>
        );
    }
}

export default PlacesContainer;
