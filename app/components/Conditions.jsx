import React from 'react';
import { chooseScale, niceTime, nullify } from 'utils';
import Panel from 'components/Panel';

const TemperatureScale = {
    C: 'C',
    F: 'F'
};

export { TemperatureScale };

export default function Conditions({ place, scale = TemperatureScale.F }) {
    let conditions = place.conditions.current_observation;

    return (
        <Panel title="Conditions" shade={true}>
            <table>
                <tbody>
                    <tr>
                        <td>Observation Location</td>
                        <td>{ conditions.observation_location.full }</td>
                    </tr>

                    <tr>
                        <td>Weather</td>
                        <td>{ conditions.weather }</td>
                    </tr>

                    <tr>
                        <td>Temperature</td>
                        <td>{ chooseScale(scale, conditions, "temp") }</td>
                    </tr>
                    
                    <tr>
                        <td>Relative Humidity</td>
                        <td>{ conditions.relative_humidity }</td>
                    </tr>
                    
                    <tr>
                        <td>Wind</td>
                        <td>{ conditions.wind_string }</td>
                    </tr>
                    
                    <tr>
                        <td>Pressure</td>
                        <td>
                            { conditions.pressure_mb } mb,
                            { conditions.pressure_trend == "+" ? "rising" : "falling" }
                        </td>
                    </tr>

                    <tr>
                        <td>Dewpoint</td>
                        <td>{ chooseScale(scale, conditions, "dewpoint") }</td>
                    </tr>

                    { nullify(conditions.windchill_f, "NA") ?
                      null :
                      <tr>
                          <td>Windchill</td>
                          <td>{ chooseScale(scale, conditions, "windchill") }</td>
                      </tr> }
                      
                      { nullify(conditions.heat_index_f, "NA") ?
                        null :
                        <tr>
                            <td>Heat Index</td>
                            <td>{ chooseScale(scale, conditions, "heat_index") }</td>
                        </tr> }
                        
                        <tr>
                            <td>UV</td>
                            <td>{ conditions.UV }</td>
                        </tr>

                        <tr>
                            <td>Visibility</td>
                            <td>{ conditions.visibility_mi } miles</td>
                        </tr>
                </tbody>
            </table>

            <div className="small">
                Last updated on { niceTime(conditions.observation_epoch * 1000) }<br/>
                { conditions.observation_time.replace("Last Updated on ", "") } local time
            </div>
        </Panel>
    );
};
