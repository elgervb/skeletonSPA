/**
 * Task to handle all vendor specific javascript. All vendor javascript will be copied to the dist directory. 
 * Also a concatinated version will be made, available in \dist\js\vendor\vendor.js
 */
module.exports = function (gulp, plugins, settings) {
    return function () {
      let concat = plugins.concat;
      let flatten = plugins.flatten;
      
      // mocks should be a separate file
      gulp.src(`${settings.src}js/vendor/**/angular-mocks.js`)
      .pipe(flatten())
      .pipe(gulp.dest(`${settings.dist}js/vendor`));

      // script must be included in the right order. First include angular, then angular-route, then the rest
      return gulp.src([`${settings.src}js/vendor/**/angular.min.js`, 
      `${settings.src}js/vendor/**/angular-route.min.js`, 
      `!${settings.src}js/vendor/**/angular-mocks.js`, 
      `${settings.src}js/vendor/**/*.min.js`])
      .pipe(gulp.dest(`${settings.dist}js/vendor`))
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest(`${settings.dist}js`));
    };
};
