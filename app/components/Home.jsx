import React from 'react';
import Dashboard from 'components/Dashboard';
import ContentPanel from 'components/ContentPanel';
import WeatherProvider from 'components/WeatherProvider';

const WEATHER_API_KEY = "7798a11635de8815";

const MAX_TRIES = 5;

let Home = props => (
    <div id="content">
        <WeatherProvider apiKey={ WEATHER_API_KEY } maxTries={ MAX_TRIES }>
            <Dashboard weather={true} />
            <ContentPanel weather={true} />
        </WeatherProvider>
    </div>
);

export default Home;
