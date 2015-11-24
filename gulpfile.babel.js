/* global Promise, __dirname */
import gulp from 'gulp';
import yargs from 'yargs';
import cache from 'gulp-cache';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import url from 'url';
import size from 'gulp-size';
import config from'./package.json'; // Read specific setting from the package file

let reload; // browser sync reload functionality for css injection
let argv = yargs.argv;
let settings = config.settings;

/**
 * browser-sync task for starting a server. This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.
 * Depends on: watch
 */
gulp.task('browser-sync', ['watch'], () => {
  let browserSync = require('browser-sync');
  let proxy = require('proxy-middleware');
  let port = argv.port || settings.serverport;
    
  reload = browserSync.reload;

  // Watch any files in dist/*, reload on change
  gulp.watch([`${settings.dist}**/*`, `!${settings.dist}**/*.css`]).on('change', reload);
  
  // proxy settings for /redirect
  let proxyOptions = url.parse('http://localhost:8080/redirect');
  proxyOptions.route = '/redirect';

  return browserSync({
    browser: ['google chrome'],
    ghostMode: {
      clicks: true,
      location: true,
      forms: true,
      scroll: true
    },
    injectChanges: true, // inject CSS changes (false force a reload)
    logLevel: 'info',
    open: false, // 'local', 'external', 'ui'
    port,
    reloadOnRestart: true,
    scrollProportionally: true, // Sync viewports to TOP position
    scrollThrottle: 50,
    server: {
      baseDir: settings.dist,
      middleware: [proxy(proxyOptions)]
    },
    ui: {
      port: port + 1,
      weinre: {
        port: port + 2
      }
    }
  });
});


/**
 * Build and copy all styles, scripts, images and fonts.
 * Depends on: info, clean
 */
gulp.task('build', (cb) => {
  let runSequence = require('run-sequence');

  runSequence('clean', ['info', 'styles', 'scripts', 'images', 'copy'], 'todo', cb);
});


/**
 * Cleans the `dist` folder and other generated files
 */
gulp.task('clean', ['clear-cache'], () => {
  let del = require('del');
  let vinylPaths = require('vinyl-paths');
  
  return gulp.src([settings.dist, settings.reports])
  .pipe(vinylPaths(del));
});

/**
 * Clears the cache used by gulp-cache
 */
gulp.task('clear-cache', () => {
  // Or, just call this for everything
  cache.clearAll();
});


/**
 * Copies all to dist/
 */
gulp.task('copy', ['copy-fonts', 'copy-template', 'copy-index']);


/**
 * Task for copying fonts only
 */
gulp.task('copy-fonts', () => {
  return gulp.src(`${settings.src}fonts/**`)
  .pipe(gulp.dest(`${settings.dist}fonts`));
});

/**
 * Task for copying templates. This will lint the HTML and remove comments
 */
gulp.task('copy-template', () => {
  let htmlmin = require('gulp-htmlmin');
  let htmlhint = require('gulp-htmlhint');
  let tplCache = require('gulp-angular-templatecache');
  
  // copy all html && json
  return gulp.src([`${settings.src}js/app/**/*.html`, `${settings.src}js/app/**/*.json`])
  .pipe(plumber())
  .pipe(htmlhint({
    htmlhintrc: '.htmlhintrc'
  }))
  .pipe(htmlhint.reporter())
  // html min MUST come after the html hinter
  .pipe(htmlmin({
    collapseWhitespace: false,
    removeComments: true
  }))
  .pipe(tplCache({standalone: true}))
  .pipe(cache(gulp.dest('dist/js')));
});

/**
 * Task for copying index page only. Optionally add live reload script to it
 */
gulp.task('copy-index', () => {
  let htmlmin = require('gulp-htmlmin');
  // copy the index.html
  return gulp.src(`${settings.src}index.html`)
  .pipe(htmlmin({
    collapseWhitespace: false,
    removeComments: true
  }))
  .pipe(cache(gulp.dest(settings.dist)));
});


/**
 * Default task.
 * Depends on: build
 */
gulp.task('default', ['build']);

/**
 * Create Javascript documentation
 */
gulp.task('docs-js', ['todo'], () => {
  let gulpDoxx = require('gulp-doxx');
  let path = `${(settings.reports.substr(0, 2) === './' ? settings.reports.substr(1) : settings.reports)}docs`;
  
  gulp.src([`${settings.src}/js/**/*.js`, 'gulpfile.js', 'gulpfile.babel.js', 'README.md', `${settings.reports}/TODO.md`, `${settings.tests}/**`])
  .pipe(gulpDoxx({
    title: `${config.name} docs`,
    urlPrefix: `file:///${__dirname}${path}`
  }))
  .pipe(gulp.dest(settings.reports));
});

/**
 * Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/img`
 */
gulp.task('images', () => {
  let imagemin = require('gulp-imagemin');

  return gulp.src(`${settings.src}img/**/*`)
  .pipe(plumber())
  .pipe(size({title: 'images before'}))
  .pipe(cache(imagemin({optimizationLevel: 5, progressivee: true, interlaced: true})))
  .pipe(size({title: 'images after '}))
  .pipe(gulp.dest(`${settings.dist}img`));
});

/**
 * log some info about this app
 */
gulp.task('info', () => {
  // log project details
  gutil.log(gutil.colors.cyan(`Running gulp on project ${config.name} v${config.version}`));
  gutil.log(gutil.colors.cyan(`Author: ${config.author.name}`));
  gutil.log(gutil.colors.cyan(`Email : ${config.author.email}`));
  gutil.log(gutil.colors.cyan(`Site  : ${config.author.url}`));
  // log info
  gutil.log('If you have an enhancement or encounter a bug, please report them on', gutil.colors.magenta(config.bugs.url));
});

/**
 * Packaging all compiled resources. Due to the async nature of other tasks, this task cannot depend on build... do a build first and then package it.
 */
gulp.task('package', () => {
  let zip = require('gulp-zip');
  let fileName = `${config.name}-${config.version}.zip`;

  return gulp.src([`${settings.dist}**`], {base: './dist'})
    .pipe(zip(fileName))
    .pipe(gulp.dest('dist'));
});


/**
 * Task to handle and deploy all javascript, application & vendor
 *
 * Depends on: scripts-app, scripts-vendor
 */
gulp.task('scripts', ['scripts-app', 'scripts-vendor', 'scripts-internal', 'scripts-tests']);

/**
 * Lint all application javascript
 */
gulp.task('lint-js', () => {
  let eslint = require('gulp-eslint');
  
  return gulp.src(`${settings.src}js/app/**/*.js`)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

/**
 * Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `app.js`.  Minified and non-minified versions are copied to the dist folder.
 * This will also generete sourcemaps for the minified version. Depends on: docs-js, lint-js
 */
gulp.task('scripts-app', ['docs-js', 'lint-js'], () => {
  let babel = require('gulp-babel');
  let ngannotate = require('gulp-ng-annotate');
  let sourcemaps = require('gulp-sourcemaps');
  let stripDebug = require('gulp-strip-debug');
  let uglify = require('gulp-uglify');

  return gulp.src(`${settings.src}js/app/**/*.js`)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(ngannotate({gulpWarnings: false}))
  .pipe(concat('app.js'))
  .pipe(gulp.dest(`${settings.dist}js`))

  // make minified
  .pipe(rename({suffix: '.min'}))
  .pipe(gulpif(!argv.dev, stripDebug()))
  .pipe(gulpif(!argv.dev, uglify()))
  .pipe(sourcemaps.write('./'))
  .pipe(size({showFiles: true}))
  .pipe(gulp.dest(`${settings.dist}js`));
});

/**
 * Task to handle all vendor specific javascript. All vendor javascript will be copied to the dist directory. 
 * Also a concatinated version will be made, available in \dist\js\vendor\vendor.js
 */
gulp.task('scripts-vendor', ['scripts-vendor-maps'], () => {
  let flatten = require('gulp-flatten');
  // mocks should be a separate file
  gulp.src(`${settings.src}js/vendor/**/angular-mocks.js`)
  .pipe(flatten())
  .pipe(gulp.dest(`${settings.dist}js/vendor`));

  // script must be included in the right order. First include angular, then angular-route
  return gulp.src([`${settings.src}js/vendor/**/angular.min.js`, 
  `${settings.src}js/vendor/**/angular-route.min.js`, 
  `!${settings.src}js/vendor/**/angular-mocks.js`, 
  `${settings.src}js/vendor/**/*.min.js`])
  .pipe(gulp.dest(`${settings.dist}js/vendor`))
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest(`${settings.dist}js`));
});

/**
 * Checks all internal scripts on code style and quality
 */
gulp.task('scripts-internal', () => {
  let eslint = require('gulp-eslint');
        
  return gulp.src(['gulpfile.js', 'gulpfile.babel.js'])
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(size({title: 'Size of gulpfiles', showFiles: false}));
});

/**
 * Checks all test scripts on code style and quality
 */
gulp.task('scripts-tests', () => {
  let eslint = require('gulp-eslint');

  return gulp.src(`${settings.tests}**/*.js`)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(size({title: 'Size of tests', showFiles: false}));
});


/**
 * Copy all vendor .js.map files to the vendor location
 */
gulp.task('scripts-vendor-maps', () => {
  let flatten = require('gulp-flatten');

  return gulp.src(`${settings.src}js/vendor/**/*.js.map`)
  .pipe(flatten())
  .pipe(gulp.dest(`${settings.dist}js/vendor`));
});


/**
 * Task to start a server on port 4000 and used the live reload functionality.
 * Depends on: server
 */
gulp.task('start', ['browser-sync']);


/**
 * Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder.
 * This will also auto prefix vendor specific rules.
 *
 * @see https://github.com/sass/node-sass for configuration
 */
gulp.task('styles', ['styles-vendor'], () => {
  let autoprefixer = require('gulp-autoprefixer');
  let cmq = require('gulp-group-css-media-queries');
  let minifycss = require('gulp-minify-css');
  let sass = require('gulp-sass');
  
  let result = gulp.src([`${settings.src}styles/**/*.scss`])
  .pipe(plumber())
  .pipe(sass({
    style: 'nested',
    precision: 5,
    sourceComments: argv.dev ? true : false
  }))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(cmq())
  .pipe(gulp.dest(`${settings.dist}css`))

  .pipe(size({showFiles: true}))
  .pipe(rename({suffix: '.min'}))
  .pipe(cmq())
  .pipe(minifycss())
  .pipe(size({showFiles: true}))
  .pipe(gulp.dest(`${settings.dist}css`));
  
  // break the flow as gulp-if results in an error
  // .pipe(gulpif(typeof reload === 'function', function() { return reload({stream: true})})) // when started with browser sync, then inject css
  if (typeof reload === 'function') {
    result.pipe(reload({stream: true}));// when started with browser sync, then inject css
  }
  
  return result;
  
});


/**
 * Task to handle all vendor specific styles. All vendor styles will be copied to the dist/css directory. 
 * Also a concatinated version will be made, available in /dis/\css/vendor/vendor.js
 */
gulp.task('styles-vendor', () => {
  return gulp.src([`${settings.src}js/vendor/**/*.css`])
  .pipe(gulp.dest(`${settings.dist}css/vendor`))
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest(`${settings.dist}css/vendor`));
});


/**
 * Run tests and keep watching changes for files
 */
gulp.task('test', (done) => {
  let Server = require('karma').Server;
  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, done).start();
});

/**
 * Run End to End (e2e) tests with Protractor
 */
gulp.task('test:e2e', () => {
  let angularProtractor = require('gulp-angular-protractor');
 
  gulp.src(['./tests/e2e/*.js'])
  .pipe(angularProtractor({
    configFile: './protractor.config.js',
    args: ['--baseUrl', `http://localhost:${settings.serverport}`],
    autoStartStopServer: true,
    debug: false
  }))
  .on('error', (e) => {
    gulp.src(['./tests/e2e/*.js'])
    .pipe(
      notify('E2E tests failed!') 
    );
    throw new Error('E2E tests failed', e);
  });
});

/**
 * Run rests and keep watching changes for files
 */
gulp.task('test:watch', (done) => {
  let Server = require('karma').Server;
  new Server({
    configFile: `${__dirname}/karma.conf.js`
  }, done).start();
});

/**
 * Output TODO's & FIXME's in markdown and json file as well
 */
gulp.task('todo', () => {
  let todo = require('gulp-todo');
  gulp.src([`${settings.src}js/app/**/*.js`, `${settings.src}styles/app/**/*.scss`])
  .pipe(plumber())
  .pipe(todo())
  .pipe(gulp.dest(settings.reports)) // output todo.md as markdown
  .pipe(todo.reporter('json', {fileName: 'todo.json'}))
  .pipe(gulp.dest(settings.reports)); // output todo.json as json
});

/**
 * Watches changes to template, Sass, javascript and image files. On change this will run the appropriate task, either: copy styles, templates, scripts or images.
 */
gulp.task('watch', () => {

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
