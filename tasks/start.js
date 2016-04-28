// use webpack.config.js to build modules
import webpack from 'webpack';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpackHotMiddelware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import bs from 'browser-sync';
import colorsSupported from 'supports-color';

module.exports = function (gulp, settings) {
  return function (cb) {
    const config = require('../webpack.dev.config');
    config.entry.app = [
      // this modules required to make HRM working
      // it responsible for all this webpack magic
      'webpack-hot-middleware/client?reload=true',
      // application entry point
      settings.entry
    ];

    var compiler = webpack(config);

    bs({
      port: settings.argv.port || settings.serverport || 4000,
      open: false,
      server: {baseDir: settings.src},
      middleware: [
        historyApiFallback(),
        webpackDevMiddelware(compiler, {
          stats: {
            colors: colorsSupported,
            chunks: false,
            modules: false
          },
          publicPath: config.output.publicPath
        }),
        webpackHotMiddelware(compiler)
      ]
    });
  };
};
