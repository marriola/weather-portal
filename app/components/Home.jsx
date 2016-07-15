import React from 'react';
import Dashboard from 'components/Dashboard';
import ContentPanel from 'components/ContentPanel';

export default class Home extends React.Component {
    render () {
	return (
	    <div id="content">
                <Dashboard />
                <ContentPanel />
	    </div>
	);
    }
}
