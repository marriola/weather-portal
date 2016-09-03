import autobind from "autobind-decorator";
import React from "react";
import { connect } from "decorators";
import Panel from "components/Panel";

let ForecastStatus = {
    loading: 0,
    loaded: 1,
    error: 2,
    notfound: 3
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
    let color = { red: 128, green: 128, blue: 128 };
    let diff;
    let style;
    let className = "forecast-segment";

    if (!isNaN(averages.high)) {
        let d = ((high - averages.high) + (low - averages.low)) / 2;
        let sign = (d > 0 ? "+" : "");
        diff = <span className="small">({sign}{d})</span>;
        let dcolor = Math.floor(d * 5);

        color.red += dcolor;
        color.green -= Math.abs(dcolor);
        color.blue -= dcolor;
        
        for (let key in color) {
            if (color[key] < 0)
                color[key] = 0;

            if (color[key] > 255)
                color[key] = 255;
        }

        let hexColor = zeroPad(color.red.toString(16)) +
                       zeroPad(color.green.toString(16)) +
                       zeroPad(color.blue.toString(16))

        style = { backgroundColor: "#" + hexColor };
        className += " black";
    }
    
    return (
        <div className={className} style={style}>
            <b>{date}</b><br/>
            {diff}<br/>
            <b>{today.conditions}</b><br/>
            High: {high} &deg;{deg}<br/>
            Low: {low} &deg;{deg}<br/>
            Avg Humidity: {today.avehumidity}%
        </div>
    );
};

@connect("forecast", "almanac")
@autobind
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
        
        switch (this.props.forecast.status) {
            case ForecastStatus.failed:
                content = <span className="error">Failed</span>;
                break;
        
            case ForecastStatus.notfound:
                content = <span>Feature not available</span>;
                break;

            case ForecastStatus.loading:
	        content = <img className="loader" />;
                break;

            case ForecastStatus.loaded:
                if (this.props.almanac.almanac) {
                    let almanac = this.props.almanac.almanac;
                    let days = this.props.forecast.days;
                    let fahrenheit = true;
                    let deg = fahrenheit ? "F" : "C";

                    let averages = {
                        high: parseInt(fahrenheit ? almanac.temp_high.normal.F : almanac.temp_high.normal.C),
                        low: parseInt(fahrenheit ? almanac.temp_low.normal.F : almanac.temp_low.normal.C)
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
                            
                            { isNaN(averages.high) ? null :
                              <div>
                                  Avg High: {averages.high} &deg;{deg}<br/>
                                  Avg Low: {averages.low} &deg;{deg}
                              </div> }
                        </div>
                    );
                }
        }

        return (
            <Panel title="Forecast"
                   shade={true}
                   noFloat={true}>
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
