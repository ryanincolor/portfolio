const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const parts = require('./libs/parts');



const PATHS = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, 'app' , 'styles.css'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    style: PATHS.style,
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].[hash].js',
    chunkFilename: '[hash].js'
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
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: ['react']
      }),
      parts.minify(),
      parts.extractCSS(PATHS.style)
    );
    break;
  default:
    config = merge(
      common, 

      { 
        devtool: 'eval-source-map'
      },
      parts.setupCSS(PATHS.style), 
      parts.devServer({
        host: process.env.HOST,
        port: 8000
      })
    );
}

module.exports = validate(config, {
  quiet: true
});
