/**
 * Create Javascript documentation
 */
module.exports = function (gulp, plugins, settings) {
    return function () {
      let config = require('./../package.json');
      let gulpDoxx = plugins.doxx;
      let path = `${(settings.reports.substr(0, 2) === './' ? settings.reports.substr(1) : settings.reports)}docs`;
      
      gulp.src([`${settings.src}/js/**/*.js`, 'gulpfile.js', 'gulpfile.babel.js', 'README.md', `${settings.reports}/TODO.md`, `${settings.tests}/**`])
      .pipe(gulpDoxx({
        title: `${config.name} docs`,
        urlPrefix: `file:///${__dirname}${path}`
      }))
      .pipe(gulp.dest(settings.reports));
    };
};
