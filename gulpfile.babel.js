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
gulp.task('clean', ['clear-cache'], task('clean'));
gulp.task('clear-cache', task('clear-cache'));
gulp.task('component', task('component'));
gulp.task('copy', ['copy-fonts', 'copy-template', 'copy-index']);
gulp.task('copy-fonts', task('copy-fonts'));
gulp.task('copy-template', task('copy-template'));
gulp.task('copy-index', task('copy-index'));
gulp.task('default', ['watch']);
gulp.task('docs-js', task('docs-js'));
gulp.task('icon-font', task('icon-font'));
gulp.task('images', task('images'));
gulp.task('info', task('info'));
gulp.task('lint-js', task('lint-js'));
gulp.task('start', ['browser-sync']);
gulp.task('test', task('test'));
gulp.task('test:e2e', task('test-e2e'));
gulp.task('test:watch', task('test-watch'));
gulp.task('todo', task('todo'));
gulp.task('watch', ['start']);





/** OLD stuff */
import webpack  from 'webpack';
import path     from 'path';
import sync     from 'run-sequence';
import rename   from 'gulp-rename';
import template from 'gulp-template';
import fs       from 'fs';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import del      from 'del';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';

let root = 'client';

// helper method for resolving paths
let resolveToApp = (glob = '') => {
  return path.join(root, 'app', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
  return path.join(root, 'app/components', glob); // app/components/{glob}
};

// map of all paths
let paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  scss: resolveToApp('**/*.scss'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: path.join(__dirname, root, 'app/app.js'),
  output: root,
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  dest: path.join(__dirname, 'dist')
};

gulp.task('serve', () => {
  const config = require('./webpack.dev.config');
  config.entry.app = [
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
    paths.entry
  ];

  var compiler = webpack(config);

  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddelware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpachHotMiddelware(compiler)
    ]
  });
});

gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const name = yargs.argv.name;
  if (!name) {
     gutil.log(gutil.colors.red('please supply a name for the component using the --name param, eg: '));
     gutil.log(gutil.colors.cyan('\tgulp --name=componentname'));
     return;
  }
  
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);
  
  return gulp.src(paths.blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('clean', (cb) => {
  del([paths.dest]).then(function (paths) {
    gutil.log("[clean]", paths);
    cb();
  })
});

