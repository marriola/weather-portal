import React from 'react';
import Dashboard from 'components/Dashboard';
import ContentPanel from 'components/ContentPanel';
import WeatherProvider from 'components/WeatherProvider';

const WEATHER_API_KEY = "7798a11635de8815";

export default class Home extends React.Component {
    render () {
	return (
	    <div id="content">
                <WeatherProvider apiKey={ WEATHER_API_KEY }>
                    <Dashboard receiveWeather={true} />
                    <ContentPanel receiveWeather={true} />
                </WeatherProvider>
	    </div>
	);
    }
}
