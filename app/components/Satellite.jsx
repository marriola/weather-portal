import React from "react";
import { connect } from "decorators";
import Panel from "components/Panel";

@connect("satellite")
class Satellite extends React.Component {
    constructor (props) {
        super(props);

        this.Status = {
            loading: 0,
            loaded: 1,
            failed: 2
        };
    }

    update () {
        if (this.props.satellite.place && this.props.satellite.refresh) {
            this.props.getSatellite(this.props.satellite.place);
        }
    }
    
    render () {
        let content;

        switch (this.props.satellite.status) {
            case this.Status.loading:
                content = (<img src="ajax-loader.gif" />);
                break;

            case this.Status.loaded:
                content = (
                    <div>
                        { this.props.satellite.pics ? <img src={ this.props.satellite.pics.image_url } /> : null }
                    </div>
                );
                break;

            case this.Status.failed:
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

export default Satellite;
