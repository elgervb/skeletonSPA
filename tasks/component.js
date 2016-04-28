import gutil from 'gulp-util';
import path from 'path';

// use webpack.config.js to build modules
module.exports = function (gulp, settings) {
  return function (cb) {
    const cap = (val) => {
      return val.charAt(0).toUpperCase() + val.slice(1);
    };
    const name = settings.argv.name;
    if (!name) {
      gutil.log(gutil.colors.red('please supply a name for the component using the --name param, eg: '));
      gutil.log(gutil.colors.cyan('\tgulp --name=componentname'));
      return;
    }
    
    const parentPath = yargs.argv.parent || '';
    const destPath = path.join(resolveToComponents(), parentPath, name);
    
    return gulp.src(path.join(settings.src, 'generator', 'component/**/*.**'))
      .pipe(template({
        name: name,
        upCaseName: cap(name)
      }))
      .pipe(rename((path) => {
        path.basename = path.basename.replace('temp', name);
      }))
      .pipe(gulp.dest(destPath));
  };
};
