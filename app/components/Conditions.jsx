import React from 'react';
import { niceTime, nullify } from 'utils';

export default class Conditions extends React.Component {
    render() {
        let small = { fontSize: "12px" };
        
        let conditions = this.props.place.conditions.current_observation;

        let style = {}; //{ position: "absolute" };
        
        return (
            <div className="panel" style={ style }>
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
                            <td>{ conditions.temp_f } &deg;F</td>
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
                            <td>{ conditions.dewpoint_f } &deg;F</td>
                        </tr>

                        { nullify(conditions.windchill_f, "NA") ?
                          null :
                          <tr>
                              <td>Windchill</td>
                              <td>{ conditions.windchill_f } &deg;F</td>
                          </tr> }
                          
                          { nullify(conditions.heat_index_f, "NA") ?
                            null :
                            <tr>
                                <td>Heat Index</td>
                                <td>{ conditions.heat_index_f } &deg;F</td>
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

                <div style={ small }>
                    Last updated on { niceTime(conditions.observation_epoch * 1000) }<br/>
                    { conditions.observation_time.replace("Last Updated on ", "") } local time
                </div>
            </div>
        );
    }

    /* componentDidUpdate() {
     *     this.props.place.weather.getConditions();
     * }*/
}
