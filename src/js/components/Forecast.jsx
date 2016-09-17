const React = require('react');

const moment = require('moment');
const LineChart = require("react-chartjs").Line;

const Forecast = React.createClass({
    // TODO specify shape of forecastObj
    propTypes: {
        forecastObj: React.PropTypes.object.isRequired,
        location: React.PropTypes.string
    },

    renderForecasts() {
        return (
            <div>
                <h1>{this.props.location}</h1>
                <h2>Forecast for today: {this.dailyForecast()}</h2>
                <p>Temperature (in degrees) for the next hour</p>
                {this.minutelyForecast()}
            </div>
        )
    },

    dailyForecast() {
        return this.props.forecastObj.daily.data[0].summary;
    },

    intervalLabels() {
        return this.props.forecastObj.minutely.data.map((data, i) => {
            // using every six minutes will give us an even 10 labels
            if (i === 0 || i % 6 === 0) {
                return moment.unix(data.time).format('h:mm');
            }
            // and then filter out the rest of the array
        }).filter((label) => !!label);
    },

    minutelyForecast() {
        // bail if we don't have data
        if (!(this.props.forecastObj.minutely && this.props.forecastObj.daily)) {
            return (
                <h2 className="error--no-data">
                    Minute-by-minute forecast data is not available for this location
                </h2>
            );
        }

        // We aren't guaranteed of having all data for minutely
        // or hourly forecasts, so let's start with daily and overwrite
        // what we do have for hourly/minutely.
        let bestData = this.props.forecastObj.daily.data[0];

        if (this.props.forecastObj.hourly) {
            Object.assign(bestData, this.props.forecastObj.hourly.data[0]);
        }

        const tempLine = this.props.forecastObj.minutely.data.map((data, i) => {
            const minuteData = Object.assign({}, bestData, data);
            // we'll use whatever we can get. Seems like forecast.io is lacking for minutely data
            const temp = (minuteData.apparentTemperature || minuteData.temperatureMin || minuteData.temperatureMax || null);
            if (temp) {
                return temp;
            }
        });

        // TODO implement precipitation as a second line graph
        const rainLine = this.props.forecastObj.minutely.data.map((data, i) => {
            const minuteData = Object.assign({}, bestData, data);
            const precip = (minuteData.precipIntensity || null);
            if (precip) {
                return Math.round(precip);
            }
        });

        const temperatureData = {
            labels: this.intervalLabels(),
            datasets: [
                {
                    label: "temperature",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: tempLine,
                    spanGaps: false
                }
            ]
        };

        return <LineChart data={temperatureData} width="600" height="250"/>;
    },

    render() {
        return (
            <section className="container">
                {this.props.forecastObj.daily ?
                    this.renderForecasts() :
                    <h2 className="error--no-data">No forecast data available for this location</h2>
                }
            </section>
        );
    }
});

module.exports = Forecast;
