import React from "react";
import { connect } from "decorators";
import Panel from "components/Panel";

let SatelliteStatus = {
    loading: 0,
    loaded: 1,
    failed: 2
};

@connect("satellite")
class Satellite extends React.Component {
    constructor (props) {
        super(props);
    }

    update () {
        if (this.props.satellite.place && this.props.satellite.refresh) {
            this.props.weather.getSatellite(this.props.satellite.place);
        }
    }
    
    render () {
        let content;

        switch (this.props.satellite.status) {
            case SatelliteStatus.loading:
                content = (<img src="ajax-loader.gif" />);
                break;

            case SatelliteStatus.loaded:
                content = (
                    <div>
                        { this.props.satellite.pics ? <img src={ this.props.satellite.pics.image_url } /> : null }
                    </div>
                );
                break;

            case SatelliteStatus.failed:
                content = (<span className="error">Failed</span>);
                break;
        }
        
        return (
            <Panel title="Satellite" shade={ true }>
                { content }
            </Panel>
        );
    }

    componentDidMount () {
        this.update();
    }

    componentDidUpdate () {
        this.update();
    }
}

export { SatelliteStatus };

export default Satellite;
