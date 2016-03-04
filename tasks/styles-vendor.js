/**
 * Task to handle all vendor specific styles. All vendor styles will be copied to the dist/css directory. 
 * Also a concatinated version will be made, available in /dis/\css/vendor/vendor.js
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let concat = plugins.concat;
    
    return gulp.src([`${settings.src}js/vendor/**/*.css`])
    .pipe(gulp.dest(`${settings.dist}css/vendor`))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(`${settings.dist}css/vendor`));
  };
};
