import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import size from 'gulp-size';
/**
 * Task to optimize and deploy all images found in folder `src/img/**`.
 */
module.exports = function (gulp, settings) {
  return function () {
    return gulp.src(`${settings.src}img/**`)
    .pipe(plumber())
    .pipe(size({title: 'images before'}))
    .pipe(imagemin({optimizationLevel: 5, progressivee: true, interlaced: true}))
    .pipe(size({title: 'images after '}))
    .pipe(gulp.dest(`${settings.src}img`));
  };
};
