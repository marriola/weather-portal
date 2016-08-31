import autobind from "autobind-decorator";
import React from 'react';
import { connect } from 'decorators';
import Actions from "action-creators";
import PlacesContainer from 'components/Places';
import ErrorList from 'components/ErrorList';

@connect("ui")
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
        let containerClass = open ? "container" : "container closed";
        
        return (
            <div className="dashboard">
                <div className={containerClass}>
                    <PlacesContainer weather={ this.props.weather } />
                    <ErrorList />
                </div>
                
                <div className={expanderClass}
                     onClick={ this.toggle }
                ></div>
            </div>
        );
    }
}
