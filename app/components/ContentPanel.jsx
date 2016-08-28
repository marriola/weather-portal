import React from 'react';
import Satellite from 'components/Satellite';
import Conditions from 'components/Conditions';
import Forecast from 'components/Forecast';
import { connect } from 'decorators';
import { wuCountryCodeToName } from 'country-codes';

@connect("content")
export default class ContentPanel extends React.Component {
    refresh() {
        this.props.weather.getConditions(this.props.content.place);
        this.props.weather.getSatellite(this.props.content.place);
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
                                    onClick={ this.refresh.bind(this) }>
                                Refresh
                            </button>
                        </h2>
                        
                        <h3>{ wuCountryCodeToName(this.props.content.place.country) }</h3>
                    </div>
                    
                    <Conditions place={ this.props.content.place } />
                    <Satellite weather={ this.props.weather } />
                    <Forecast place={ this.props.content.place }
                              weather={ this.props.weather } />
                </div>
            );
        }
        else {
            content = <span>Nothing yet</span>;
        }

        let className = this.props.content.dashboardOpen ? "contentPanel" : "contentPanel up";
        
        return (
            <div className={ className }>
                { content }
            </div>
        );
    }
}
