import React from "react";
import { connect } from "decorators";

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
        if (this.props.weather && this.props.satellite.refresh) {
            this.props.weather.getSatellite();
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
            <div className="float box">
                <h4>Satellite</h4>
                { content }
            </div>
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
