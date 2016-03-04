/**
 * Output TODO's & FIXME's in markdown and json file as well
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let plumber = plugins.plumber;
    let todo = plugins.todo;
         
    gulp.src([`${settings.src}js/app/**/*.js`, `${settings.src}styles/app/**/*.scss`])
    .pipe(plumber())
    .pipe(todo())
    .pipe(gulp.dest(settings.reports)) // output todo.md as markdown
    .pipe(todo.reporter('json', {fileName: 'todo.json'}))
    .pipe(gulp.dest(settings.reports)); // output todo.json as json
  };
};
