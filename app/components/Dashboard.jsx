import React from 'react';
import { connect } from 'decorators';
import Actions from "action-creators";
import PlacesContainer from 'components/Places';
import ErrorList from 'components/ErrorList';

@connect("ui")
export default class Dashboard extends React.Component {
    constructor (props) {
        super(props);
    }

    toggle(state) {
        this.props.dispatch(Actions.UI.toggleDashboard(state));
    }
    
    render() {
        let open = this.props.ui.dashboardOpen;
        let containerClass = open ? "container" : "container closed";
        
        return (
            <div className="dashboard">
                <div className={ containerClass }>
                    <PlacesContainer getConditions={ this.props.getConditions } />
                    <ErrorList />
                </div>
                
                <div className={ open ? "expander open" : "expander closed" }
                     onClick={ this.toggle.bind(this, !open) }
                ></div>
            </div>
        );
    }
}
