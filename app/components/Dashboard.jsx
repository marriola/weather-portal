import React from 'react';
import PlacesContainer from 'components/Places';
import ErrorList from 'components/ErrorList';
import { connect } from 'decorators';
import { UI } from 'action-creators';

@connect("ui")
export default class Dashboard extends React.Component {
    constructor (props) {
        super(props);
    }

    toggle(state) {
        this.props.dispatch(UI.toggleDashboard(state));
    }
    
    render() {
        let open = this.props.ui.dashboardOpen;
        let containerClass = open ? "container" : "container closed";
        
        return (
            <div className="dashboard">
                <div className={ containerClass }>
                    <PlacesContainer />
                    <ErrorList />
                </div>
                
                <div className={ open ? "expander open" : "expander closed" }
                     onClick={ this.toggle.bind(this, !open) }
                ></div>
            </div>
        );
    }
}
