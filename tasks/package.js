/**
 * Packaging all compiled resources. Due to the async nature of other tasks, this task cannot depend on build... do a build first and then package it.
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let config = require('./../package.json');
    let fileName = `${config.name}-${config.version}.zip`;
    let zip = plugins.zip;

    return gulp.src([`${settings.dist}**`], {base: './dist'})
      .pipe(zip(fileName))
      .pipe(gulp.dest('dist'));
  };
};
