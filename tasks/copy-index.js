/**
 * Task for copying index page only. Optionally add live reload script to it
 */
module.exports = function (gulp, plugins, settings) {
    return function () {
      let cache = plugins.cache;
      let htmlmin = plugins.htmlmin;
      
      return gulp.src(`${settings.src}index.html`)
      .pipe(htmlmin({
        collapseWhitespace: false,
        removeComments: true
      }))
      .pipe(cache(gulp.dest(settings.dist)));
    };
};
