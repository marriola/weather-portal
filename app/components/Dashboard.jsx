import autobind from "autobind-decorator";
import React from 'react';
import { connect } from 'decorators';
import Actions from "action-creators";
import PlacesContainer from 'components/Places';
import ErrorList from 'components/ErrorList';

@connect("ui", "places")
@autobind
export default class Dashboard extends React.Component {
    constructor (props) {
        super(props);
    }

    toggle() {
        Actions.UI.toggleDashboard(!this.props.ui.dashboardOpen);
    }
    
    render() {
        let open = this.props.ui.dashboardOpen;
        let expanderClass = open ? "expander open" : "expander closed";

        let empty = this.props.places.length == 0;
        let classes = [
            open ? null : "closed",
            empty ? "empty" : null
        ].filter(x => !!x).join(" ");
        
        return (
            <div className={"dashboard " + classes}>
                <div className={"container " + classes}>
                    <PlacesContainer weather={ this.props.weather } scale={ this.props.ui.scale } />
                    <ErrorList />
                </div>
                
                <a className={expanderClass} onClick={ this.toggle }></a>
            </div>
        );
    }
}
