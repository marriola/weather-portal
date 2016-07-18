import React from 'react';
import Satellite from 'components/Satellite';
import Conditions from 'components/Conditions';
import { connect } from 'decorators';
import { wuCountryCodeToName } from 'country-codes';

@connect("content")
export default class ContentPanel extends React.Component {
    render() {
        let content;

        if (this.props.content.place) {
            content = (
                <div>
                    <div className="panel top center">
                        <h2>{ this.props.content.place.displayName }</h2>
                        <h3>{ wuCountryCodeToName(this.props.content.place.country) }</h3>
                    </div>
                    
                    <Conditions place={ this.props.content.place } />
                    <Satellite weather={ this.props.content.weather } />
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
