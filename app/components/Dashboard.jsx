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
        Actions.UI.toggleDashboard(state);
    }
    
    render() {
        let open = this.props.ui.dashboardOpen;
        let expanderClass = open ? "expander open" : "expander closed";
        let containerClass = open ? "container" : "container closed";
        
        return (
            <div className="dashboard">
                <div className={containerClass}>
                    <PlacesContainer weather={ this.props.weather } />
                    <ErrorList />
                </div>
                
                <div className={expanderClass}
                     onClick={ this.toggle.bind(this, !open) }
                ></div>
            </div>
        );
    }
}
