// use webpack.config.js to build modules
import webpack from 'webpack';
import gutil from 'gulp-util';
import colorsSupported from 'supports-color';

module.exports = function (gulp, settings) {
  return function (cb) {
    const config = require(`../webpack.dist.config`);
    config.entry.app = settings.entry;

    webpack(config, (err, stats) => {
      if(err)  {
        throw new gutil.PluginError("webpack", err);
      }

      gutil.log("[webpack]", stats.toString({
        colors: colorsSupported,
        chunks: false,
        errorDetails: true
      }));

      cb();
    });
  };
};
