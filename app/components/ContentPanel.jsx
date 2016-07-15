import React from 'react';
import Satellite from 'components/Satellite';
import { connect } from 'decorators';
import { wuCountryCodeToName } from 'country-codes';

@connect("content")
export default class ContentPanel extends React.Component {
    render() {
        let content;

        if (this.props.content.place) {
            content = (
                <div>
                    <h2>{ this.props.content.place.displayName }</h2>
                    <h3>{ wuCountryCodeToName(this.props.content.place.country) }</h3>
                    <Satellite weather={ this.props.content.weather } />
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
