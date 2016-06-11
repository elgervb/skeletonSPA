import gutil from 'gulp-util';
import template from 'gulp-template';
import path from 'path';
import rename from 'gulp-rename';
import yargs from 'yargs';

/**
 * Create a new component. params: --name={componentname} --parent={parent component}
 * 
 * @param {function} gulp gulp
 * @param {object} settings application settings
 * 
 * @return {function} the gulp pipe
 */
module.exports = (gulp, settings) => {
  return (cb) => {
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
    const destPath = path.join(settings.src, 'app/components', parentPath, name);
    
    return gulp.src(path.join('generator', 'component/**/*.**'))
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
