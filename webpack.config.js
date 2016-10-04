const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');
const merge = require('webpack-merge');
const parts = require('./libs/parts');

const TARGET = process.env.npm_lifecycle_event;
const pkg = require('./package.json');
process.env.BABEL_ENV = TARGET;


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app,
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: PATHS.build,
    filename: '[name].[hash].js',
    chunkFilename: '[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      title: 'Portfolio of Ryan Pittman',
      appMountId: 'root',
      inject: false
    })
  ],
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /(node_modules|bower_components)/,
        loaders: ["babel-loader"],
        include: PATHS.app
      },
      { test: /\.json$/, 
        loader: 'json' 
      }
    ]
  }
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
      parts.extractCSS(PATHS.app)
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

module.exports = validate(config, {
  quiet: true
});
