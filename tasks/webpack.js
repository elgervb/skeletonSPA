import webpack from 'webpack';
import gutil from 'gulp-util';
import colorsSupported from 'supports-color';
/**
 * Gulp task for packaging app with webpack
 * 
 * @param {function} gulp gulp
 * @param {object} settings application settings
 * 
 * @return {function} the gulp pipe
 */
module.exports = function (gulp, settings) {
  return (cb) => {
    const config = require('../webpack.dist.config');
    config.entry.app = settings.entry;

    webpack(config, (err, stats) => {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }

      gutil.log('[webpack]', stats.toString({
        colors: colorsSupported,
        chunks: false,
        errorDetails: true
      }));

      cb();
    });
  };
};
