'use strict';

const React = require('react');

const Map = React.createClass({
    propTypes: {
        address: React.PropTypes.string.isRequired
    },

    render() {
        let address = encodeURIComponent(this.props.address);
        return <img src={`http://maps.googleapis.com/maps/api/staticmap?autoscale=false&size=400x400&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${address}`} />;
    }
});

module.exports = Map;
