const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const parts = require('./libs/parts');



const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app,
    vendor: ['react']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Portfolio of Ryan Pittman'
    })
  ],
};

var config; 

switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common, 

      {
        devtool: 'source-map'
      }, 
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.minify(),
      parts.setupCSS(PATHS.app)
    );
    break;
  default:
    config = merge(
      common, 

      { 
        devtool: 'eval-source-map'
      },
      parts.setupCSS(PATHS.app), 
      parts.devServer({
        host: process.env.HOST,
        port: 8000
      })
    );
}

module.exports = validate(config);
