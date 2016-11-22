import React from 'react';
import Dashboard from 'components/Dashboard';
import ContentPanel from 'components/ContentPanel';
import WeatherProvider from 'components/WeatherProvider';
import GeonamesProvider from 'components/GeonamesProvider';

const WEATHER_API_KEY = "7798a11635de8815";

const MAX_TRIES = 5;

let Home = props => (
    <div id="content">
        <GeonamesProvider>
            <WeatherProvider apiKey={ WEATHER_API_KEY } maxTries={ MAX_TRIES } geonames={true}>
                <Dashboard weather={true} />
                <ContentPanel weather={true} passthrough={["geonames"]}/>
            </WeatherProvider>
        </GeonamesProvider>
    </div>
);

export default Home;
