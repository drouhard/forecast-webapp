import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
const renderer = TestUtils.createRenderer();
const Forecast = require('../src/js/components/Forecast.jsx');


const fullDataObj = require('../__mocks__/fixtures.js');

const Fixtures = {
    emptyProps: {},

    partialData: {
        daily: {
            data: [{
                apparentTemperature: 123
            }]
        }
    },

    fullData: fullDataObj
};


describe("Forecast", () => {

    it('renders correctly with full forecast data', () => {

        const shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render(React.createElement(Forecast, { forecastObj: Fixtures.fullData }));
        const component = shallowRenderer.getRenderOutput();
        expect(component.type).toBe('section');


        expect(result.props.children).toEqual([
            // TODO flesh out what the component should render
        ]);


    });

    it('renders correctly with no props', () => {
        const forecast = TestUtils.renderIntoDocument(
           <Forecast forecastObj={Fixtures.emptyProps} />
         );

        const forecastNode = ReactDOM.findDOMNode(forecast);
        expect(forecastNode.querySelectorAll('.error--no-data').length).toBe(1);
    });

    it('renders correctly with partial forecast data', () => {
        const forecast = TestUtils.renderIntoDocument(
           <Forecast forecastObj={Fixtures.partialData} />
         );

        const forecastNode = ReactDOM.findDOMNode(forecast);
    });

    it('creates interval labels for the line graph', () => {});
});
