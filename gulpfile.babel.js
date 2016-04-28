'use strict';

/* global __dirname */
import gulp from 'gulp';
import config from './package.json'; // Read specific setting from the package file
import yargs from 'yargs';

config.settings.argv = yargs.argv;
let task = (name) => {
  return require(`./tasks/${name}`)(gulp, config.settings);
};

gulp.task('build', (cb) => {
  let runSequence = require('run-sequence');
  runSequence('clean', ['info', 'styles', 'scripts', 'images', 'copy'], 'todo', cb);
});
gulp.task('clean', task('clean'));
gulp.task('component', task('component'));
gulp.task('default', ['watch']);
gulp.task('iconfont', task('icon-font'));
gulp.task('images', task('images'));
gulp.task('info', task('info'));
gulp.task('lint-js', task('lint-js'));
gulp.task('start', task('start'));
gulp.task('test', task('test'));
gulp.task('test:e2e', task('test-e2e'));
gulp.task('test:watch', task('test-watch'));
gulp.task('todo', task('todo'));
gulp.task('watch', ['start']);
gulp.task('webpack', task('webpack'));
