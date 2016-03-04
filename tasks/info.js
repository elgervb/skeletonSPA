/**
 * log some info about this app
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let config = require('./../package.json');
    let gutil = plugins.util;
    
    gutil.log(gutil.colors.cyan(`Running gulp on project ${config.name} v${config.version}`));
    gutil.log(gutil.colors.cyan(`Author: ${config.author.name}`));
    gutil.log(gutil.colors.cyan(`Email : ${config.author.email}`));
    gutil.log(gutil.colors.cyan(`Site  : ${config.author.url}`));
    gutil.log('If you have an enhancement or encounter a bug, please report them on', gutil.colors.magenta(config.bugs.url));
  };
};
