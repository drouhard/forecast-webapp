'use strict';
// get environment variables from ./.env
require('dotenv').config();

const express = require('express');
const app = express();
const https = require('https');
const request = require('request');
const router = express.Router();

const googleAPIKey = process.env.GOOGLE_MAPS_API_KEY;
const forecastAPIKey = process.env.FORECAST_API_KEY;
const port = process.env.PORT || 5000;

// set up Google Maps Client for geocoding
const googleMapsClient = require('@google/maps').createClient({
    key: googleAPIKey
});

// serve e.g. index.html from /dist
app.use(express.static('srv'));

// standardize errors sent to the client
const errorObj = (err) => {
    return {
        status: 'error',
        errMsg: err
    }
};

const forecastURLString = (latitude, longitude) => {
    // exclude the data we don't need to save on latency
    const exclusions = 'currently,alerts,flags';
    return `https://api.forecast.io/forecast/${forecastAPIKey}/${latitude},${longitude}?exclude=${exclusions}`;
};

// ROUTE: /api/forecast
// Expects a string to be geocoded. Returns forecast information.
app.get('/api/forecast/:addressString', function(req, res) {
    const getForecast = function(latitude, longitude, address) {
        request(forecastURLString(latitude, longitude), function(err, response, body) {
            if (err) {
                res.send(errorObj(err));
            }
            if (!err && response.statusCode == 200) {
                let responseObj = {
                    status: "OK",
                    formattedAddress: address,
                    forecast: JSON.parse(body)
                };

                responseObj.formattedAddress = address;

                res.json(responseObj);
            } else {
                res.send(errorObj(`response status: ${response.statusCode}`));
            }
        })
    };

    googleMapsClient.geocode({
        address: req.params.addressString
    }, function(err, response) {
        if (err) {
            res.send(errorObj(err));
        }
        if (response.json.status === "OK") {
            getForecast(
                response.json.results[0].geometry.location.lat,
                response.json.results[0].geometry.location.lng,
                response.json.results[0].formatted_address
            );
        } else {
            res.send(errorObj(response.json.status));
        }
    });
});

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
