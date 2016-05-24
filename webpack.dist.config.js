const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const settings = require('./package.json').settings;

config.output = {
  filename: '[name].bundle.js',
  publicPath: '',
  path: path.resolve(__dirname, settings.dist)
};

config.plugins = config.plugins.concat([

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular', 'moment'],
      compress: {
        warnings: false
      }
    }
  })
]);

module.exports = config;
