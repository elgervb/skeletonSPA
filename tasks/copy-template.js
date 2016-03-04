/**
 * Task for copying templates. This will lint the HTML and remove comments
 */
module.exports = function (gulp, plugins, settings) {
    return function () {
      let htmlmin = plugins.htmlmin;
      let htmlhint = plugins.htmlhint;
      let plumber = plugins.plumber;
      let tplCache = plugins.angularTemplatecache;
      
      // copy all html && json
      return gulp.src([`${settings.src}js/app/**/*.html`, `${settings.src}js/app/**/*.json`])
      .pipe(plumber())
      .pipe(htmlhint({
        htmlhintrc: '.htmlhintrc'
      }))
      .pipe(htmlhint.reporter())
      // html min MUST come after the html hinter
      .pipe(htmlmin({
        collapseWhitespace: false,
        removeComments: true
      }))
      .pipe(tplCache({standalone: true}))
      .pipe(gulp.dest('dist/js'));
    };
};
