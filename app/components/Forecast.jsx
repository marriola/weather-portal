import React from "react";
import { connect } from "decorators";
import Panel from "components/Panel";

let ForecastStatus = {
    loading: 0,
    loaded: 1,
    error: 2
};

function zeroPad(digit) {
    if (digit.length == 1) {
        return "0" + digit;
    } else {
        return digit;
    }
}

let ForecastDay = ({ today, averages, fahrenheit }) => {
    let date = today.date.month + "/" + today.date.day + "/" + today.date.year;
    
    let high = fahrenheit ? +today.high.fahrenheit : +today.high.celsius;
    let low = fahrenheit ? +today.low.fahrenheit : +today.low.celsius;
    let deg = fahrenheit ? "F" : "C";

    let diff = ((high + low) / 2) - ((averages.high + averages.low) / 2);
    let color;

    if (diff == 0) {
        color = { red: 128, green: 128, blue: 128 };
    }
    else {
        color = {
            red: 128,
            green: 128,
            blue: 128
        };

        let d = Math.floor(Math.abs(diff) * 5);
        color.red += diff > 0 ? d : -d;
        color.green -= d;
        color.blue += diff < 0 ? d : -d;
    }

    for (let key in color) {
        if (color[key] < 0)
            color[key] = 0;

        if (color[key] > 255)
            color[key] = 255;
    }

    let hexColor = zeroPad(color.red.toString(16)) +
                   zeroPad(color.green.toString(16)) +
                   zeroPad(color.blue.toString(16))

    let style = { backgroundColor: "#" + hexColor };
    
    return (
        <div className="forecast-segment" style={style} data-diff={diff}>
            <b>{date}</b><br/>
            High: {high} &deg;{deg}<br/>
            Low: {low} &deg;{deg}
        </div>
    );
};

@connect("forecast", "almanac")
export default class Forecast extends React.Component {
    constructor(props) {
        super(props);
    }

    update() {
        if (this.props.forecast.refresh) {
            this.props.weather.getForecast(this.props.place);
        }
    }

    render(){
        let content = null;
        
        if (this.props.forecast.status == ForecastStatus.loading) {
	    content = <img className="loader" />;
        }
        else if (this.props.forecast.status == ForecastStatus.loaded && this.props.almanac.almanac) {
            let almanac = this.props.almanac.almanac;
            let days = this.props.forecast.days;
            let fahrenheit = true;
            let deg = fahrenheit ? "F" : "C";

            let averages = {
                high: fahrenheit ? +almanac.temp_high.normal.F : +almanac.temp_high.normal.C,
                low: fahrenheit ? +almanac.temp_low.normal.F : +almanac.temp_low.normal.C
            };

            let dayElements = days.map(day =>
                <ForecastDay key={day.date.epoch}
                             today={day}
                             averages={averages}
                             fahrenheit={true} />
            );

            content = (
                <div>
                    <nobr>
                        {dayElements}
                    </nobr>
                    
                    <div>
                        Avg High: {averages.high} &deg;{deg}<br/>
                        Avg Low: {averages.low} &deg;{deg}
                    </div>            
                </div>
            );
        }

        return (
            <Panel title="Forecast"
                   shade={true}>
                { content }
            </Panel>
        );
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }
}

export { ForecastStatus };
