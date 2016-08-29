import React from "react";
import { connect } from "decorators";
import { Place, PlaceStatus } from "place";
import Actions from "action-creators";
import PlaceBox from "components/PlaceBox";


////////////////////////////////////////////////////////////////////////////////

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

let PlaceList = ({ places, ...props }) => (
    <div>
        { places.map(place =>
              <PlaceBox key={ place.key }
		        place={ place }
		        remove={ props.remove }
                        weather={ props.weather }
              />
          ) }
    </div>
);


////////////////////////////////////////////////////////////////////////////////

@connect("places")
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
                          add={ this.addPlace.bind(this) } />

                <div className="placeBox">
	            <PlaceList places={ this.props.places }
                               remove={ this.removePlace.bind(this) }
                               weather={ this.props.weather } />
	        </div>
            </div>
        );
    }
}

export default PlacesContainer;
