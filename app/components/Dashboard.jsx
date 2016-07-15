import React from 'react';
import PlacesContainer from 'components/Places';
import ErrorList from 'components/ErrorList';

export default class Dashboard extends React.Component {
    constructor (props) {
        super(props);
        
        this.state = {
            open: true
        };
    }

    toggle() {
        this.setState({
            open: !this.state.open
        });
    }
    
    render() {
        let containerClass = this.state.open ? "container" : "container closed";
        
        return (
            <div className="dashboard">
                <div className={ containerClass }>
                    <PlacesContainer />
                    <ErrorList />
                </div>
                
                <div className={ this.state.open ? "expander open" : "expander closed" }
                     onClick={ this.toggle.bind(this) }
                ></div>
            </div>
        );
    }
}
