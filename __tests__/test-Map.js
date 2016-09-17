const React = require('react');
const renderer = require('react-test-renderer');

const Map = require('../src/js/components/Map.jsx');

describe("Map", () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <Map address="Portland, OR" />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
});
