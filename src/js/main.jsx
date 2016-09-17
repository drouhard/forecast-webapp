const React = require('react');
const ReactDOM = require('react-dom');
const request = require('superagent');

const Forecast = require('./components/Forecast');
const Map = require('./components/Map');


const App = React.createClass({
    getInitialState() {
        return {
            address: null,
            forecastObj: null
        }
    },

    setSearchInputElementReference: function(inputReference) {
        this.searchInputElement = inputReference;
    },

    handleFormSubmit(submitEvent) {
        submitEvent.preventDefault();

        const address = this.searchInputElement.value;

        // store 'this' to be able to access it inside http request callback
        let self = this;

        request.get(`/api/forecast/${address}`).end(function(err, res) {
            if (err) {
                // TODO: flesh out error handling
                error.log('error');
            } else {
                const data = JSON.parse(res.text);
                if (data.status != "OK") {
                    error.log(`error: ${data.status}`);
                } else {
                    self.replaceState({
                        address: data.formattedAddress,
                        forecastObj: data.forecast
                    });
                }
            }
        });
    },

    render: function() {
        return (
            <main>
                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="address">Get forecast for</label>
                    <input type="text" id="address" placeholder="Your city" ref={this.setSearchInputElementReference} required/>
                    <button type="submit">Go</button>
                </form>

                {this.state.address ? <Map address={this.state.address}/> : null }
                {this.state.forecastObj ? <Forecast forecastObj={this.state.forecastObj} location={this.state.address}/> : null }
            </main>
        );
    }
});

ReactDOM.render(< App />, document.getElementById('mount'));
