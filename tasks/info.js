import gutil from 'gulp-util';
import config from '../package.json';
/**
 * log some info about this app
 * 
 * @param {function} gulp gulp
 * @param {object} settings application settings
 * 
 * @return {function} the gulp pipe
 */
module.exports = function (gulp, settings) {
  return function () {
    gutil.log(gutil.colors.cyan(`Running gulp on project ${config.name} v${config.version}`));
    gutil.log(gutil.colors.cyan(`Author: ${config.author.name}`));
    gutil.log(gutil.colors.cyan(`Email : ${config.author.email}`));
    gutil.log(gutil.colors.cyan(`Site  : ${config.author.url}`));
    gutil.log('If you have an enhancement or encounter a bug, please report them on', gutil.colors.magenta(config.bugs.url));
  };
};
