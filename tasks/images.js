/**
 * Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/img`
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let cache = plugins.cache;
    let imagemin = plugins.imagemin;
    let plumber = plugins.plumber;
    let size = plugins.size;
    
    return gulp.src(`${settings.src}img/**/*`)
    .pipe(plumber())
    .pipe(size({title: 'images before'}))
    .pipe(cache(imagemin({optimizationLevel: 5, progressivee: true, interlaced: true})))
    .pipe(size({title: 'images after '}))
    .pipe(gulp.dest(`${settings.dist}img`));
  };
};
