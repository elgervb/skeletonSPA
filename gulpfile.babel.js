/* global __dirname */
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import config from './package.json'; // Read specific setting from the package file
import yargs from 'yargs';

config.settings.argv = yargs.argv;
let plugins = loadPlugins({lazy: false, pattern: ['**']}); 
let task = (name) => {
  return require(`./tasks/${name}`)(gulp, plugins, config.settings);
};

gulp.task('browser-sync', ['watch'], task('browser-sync'));
gulp.task('build', (cb) => {
  let runSequence = require('run-sequence');
  runSequence('clean', ['info', 'styles', 'scripts', 'images', 'copy'], 'todo', cb);
});
gulp.task('clean', ['clear-cache'], task('clean'));
gulp.task('clear-cache', task('clear-cache'));
gulp.task('copy', ['copy-fonts', 'copy-template', 'copy-index']);
gulp.task('copy-fonts', task('copy-fonts'));
gulp.task('copy-template', task('copy-template'));
gulp.task('copy-index', task('copy-index'));
gulp.task('default', ['build']);
gulp.task('docs-js', task('docs-js'));
gulp.task('images', task('images'));
gulp.task('info', task('info'));
gulp.task('package', ['build'], task('package'));
gulp.task('lint-js', task('lint-js'));
gulp.task('scripts', ['scripts-app', 'scripts-vendor', 'scripts-internal', 'scripts-tests']);
gulp.task('scripts-app', ['docs-js', 'lint-js'], task('scripts-app'));
gulp.task('scripts-vendor', ['scripts-vendor-maps'], task('scripts-vendor'));
gulp.task('scripts-internal', task('scripts-internal'));
gulp.task('scripts-tests', task('scripts-tests'));
gulp.task('scripts-vendor-maps', task('scripts-vendor-maps'));
gulp.task('start', ['browser-sync']);
gulp.task('styles', ['styles-vendor', 'styles-copy-sass'], task('styles'));
gulp.task('styles-copy-sass', task('styles-copy-sass'));
gulp.task('styles-vendor', task('styles-vendor'));
gulp.task('test', task('test'));
gulp.task('test:e2e', task('test-e2e'));
gulp.task('test:watch', task('test-watch'));
gulp.task('todo', task('todo'));

gulp.task('watch', () => {
  let settings = config.settings;
  // watch index.html
  gulp.watch(`${settings.src}index.html`, ['copy-index']);
  // watch html files
  gulp.watch(`${settings.src}**/*.html`, ['copy-template']);
  // watch fonts
  gulp.watch(`${settings.src}fonts/**`, ['copy-fonts']);
  // Watch .scss files
  gulp.watch(`${settings.src}styles/**/*.scss`, ['styles']);
  // Watch app .js files
  gulp.watch(`${settings.src}js/app/**/*.js`, ['scripts-app']);
  // Watch vendor .js files
  gulp.watch(`${settings.src}js/vendor/**/*.js`, ['scripts-vendor']);
  // Watch image files
  gulp.watch(`${settings.src}img/**/*`, ['images']);
  // Watch internal files
  gulp.watch(['gulpfile.js', 'gulpfile.babel.js'], ['scripts-internal']);
  // Watch test files
  gulp.watch(`${settings.tests}**/*.js`, ['scripts-tests']);
  // Update docs
  gulp.watch('README.md', ['docs-js']);
});
