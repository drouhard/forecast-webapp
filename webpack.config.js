var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/js/main.jsx',
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, './srv'),
    filename: '[name].js'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ]
  }
};
