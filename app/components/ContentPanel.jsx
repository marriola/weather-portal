import autobind from "autobind-decorator";
import React from 'react';
import { connect } from 'decorators';
import { wuCountryCodeToName } from 'country-codes';
import Satellite from 'components/Satellite';
import Conditions from 'components/Conditions';
import Forecast from 'components/Forecast';
import Nearby from 'components/Nearby';
import Actions from 'action-creators';

@connect("content", "ui")
@autobind
export default class ContentPanel extends React.Component {
    refresh() {
        this.props.weather.getConditions(this.props.content.place)
            .then(() => this.props.weather.getSatellite(this.props.content.place))
            .then(() => {
                console.log("reload");
                Actions.ActivePlace.set(this.props.content.place)
            });
    }

    render() {
        let content;

        if (this.props.content.place) {
            content = (
                <div>
                    <div className="panel top center">
                        <h2>
                            { this.props.content.place.displayName }
                            <button className="small margin-left-10"
                                    onClick={ this.refresh }>
                                Refresh
                            </button>
                        </h2>
                        
                        <h3>{ wuCountryCodeToName(this.props.content.place.country) }</h3>
                    </div>

                    <div style={{ overflow: "auto" }}>
                        <Conditions place={ this.props.content.place } scale={ this.props.ui.scale } />
                        <Satellite weather={ this.props.weather } />
                        <Forecast place={ this.props.content.place }
                                  weather={ this.props.weather }
                                  scale={ this.props.ui.scale }/>
                        <Nearby place={ this.props.content.place }
                                geonames={ this.props.geonames } />
                    </div>
                </div>
            );
        }
        else {
            content = <span>Nothing yet</span>;
        }

        return (
            <div className="contentPanel">
                { content }
            </div>
        );
    }
}
