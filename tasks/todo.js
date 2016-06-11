import plumber from 'gulp-plumber';
import todo from 'gulp-todo';
/**
 * Output TODO's & FIXME's in markdown and json file as well
 * 
 * @param {function} gulp gulp
 * @param {object} settings application settings
 * 
 * @return {function} the gulp pipe
 */
module.exports = function (gulp, settings) {
  return function () {
    gulp.src([`${settings.src}js/client/**/*.js`, `${settings.src}tasks/**`, `${settings.src}js/client/**/*.scss`])
    .pipe(plumber())
    .pipe(todo())
    .pipe(gulp.dest(settings.reports)) // output todo.md as markdown
    .pipe(todo.reporter('json', {fileName: 'todo.json'}))
    .pipe(gulp.dest(settings.reports)); // output todo.json as json
  };
};
