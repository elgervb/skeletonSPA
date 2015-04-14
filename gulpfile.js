var gulp = require('gulp'),
    argv = require('yargs').argv,
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    del = require('del'),
    express = require('express'),
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    minifycss = require('gulp-minify-css'),
    ngannotate = require('gulp-ng-annotate'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    q = require('q'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    stripDebug = require('gulp-strip-debug'),
    stylish = require('jshint-stylish'),
    sourcemaps = require('gulp-sourcemaps'),
    todo = require('gulp-todo'),
    uglify = require('gulp-uglify');

var options = {
   liveReload: false,
   /**
     * Returns the config for plumber
     */
    plumberConfig: function(){
      return {'errorHandler': onError};
    }
}; 

/**
 * browser-sync task for starting a server. This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.
 * Depends on: watch
 */
gulp.task('browser-sync', ['watch'], function() {

  // Watch any files in dist/*, reload on change
  gulp.watch(['dist/**']).on('change', function(){browserSync.reload({});notify({ message: 'Reload browser' });});

  return browserSync({
      server: {
          baseDir: "./dist"
      },
      ghostMode: {
        clicks: true,
        location: true,
        forms: true,
        scroll: true
      },
      open: "external",
      injectChanges: true, // inject CSS changes (false force a reload) 
      browser: ["google chrome"],
      scrollProportionally: true, // Sync viewports to TOP position
      scrollThrottle: 50,
    });
});


/**
 * Build and copy all styles, scripts, images and fonts.
 * Depends on: clean
 */
gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'copy', 'todo');
});


/**
 * Cleans the `dist` folder and other generated files
 */
gulp.task('clean', ['clear-cache'],  function(cb) {
    del(['dist', 'todo.md', 'todo.json'], cb);
});

/**
 * Clears the cache used by gulp-cache
 */
gulp.task('clear-cache', function() {
  // Or, just call this for everything
  cache.clearAll();
});


/**
 * Copies all to dist/
 */
gulp.task('copy', ['copy-fonts', 'copy-template', 'copy-index'], function() {});


gulp.task('copy-fonts', function() {
  var deferred = q.defer();
   // copy all fonts
   setTimeout(function() {
    gulp.src( 'src/fonts/**')
      .pipe(gulp.dest('dist/fonts'));
       deferred.resolve();
  }, 1);

  return deferred.promise;
});


gulp.task('copy-template', function() {
  // copy all html && json
  return gulp.src( ['src/js/app/**/*.html', 'src/js/app/**/*.json'])
    .pipe(cache(gulp.dest('dist/js/app')));
});


gulp.task('copy-index', function() {
   // copy the index.html
   return gulp.src('src/index.html')
    .pipe(gulpif(options.liveReload, replace(/(\<\/body\>)/g, "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>$1")))
    .pipe(cache(gulp.dest('dist/')));
});


/**
 * Default task.
 * Depends on: build
 */
gulp.task('default', ['build']);


/**
 * Task to start a Express server on port 4000.
 */
gulp.task('express', function(){
  var app = express(), port = 4000;
  app.use(express.static(__dirname + "/dist"));
  app.listen(port); 
  console.log('started webserver on port ' + port);
});


/**
 * Task to start a server on port 4000 and used the live reload functionality.
 * Depends on: express, live-reload
 */
gulp.task('start', ['express', 'live-reload'], function(){});

/**
 * Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/img`
 */
gulp.task('images', function() {
  var deferred = q.defer();

  setTimeout(function() {
    gulp.src('src/img/**/*')
      .pipe(plumber(options.plumberConfig()))
      .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
      .pipe(gulp.dest('dist/img'));
    deferred.resolve();
  }, 1);

  return deferred.promise;
});


/**
 * Start the live reload server. Live reload will be triggered when a file in the `dist` folder changes. This will add a live-reload script to the index.html page, which makes it all happen.
 * Depends on: watch
 */
gulp.task('live-reload', ['watch'], function() {

  options.liveReload = true;
  // first, delete the index.html from the dist folder as we will copy it later
  del(['dist/index.html']);

  // add livereload script to the index.html
  gulp.src(['src/index.html'])
   .pipe(replace(/(\<\/body\>)/g, "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>$1"))
   .pipe(gulp.dest('dist'));
   
  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/*, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});


/**
 * Task to handle and deploy all javascript, application & vendor
 *
 * Depends on: scripts-app, scripts-vendor
 */
gulp.task('scripts', ['scripts-app','scripts-vendor']);


/**
 * Removes the node_modules
 */
gulp.task('remove',['clean'], function(cb){
  del('node_modules', cb);
});


/**
 * Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `app.js`.  Minified and non-minified versions are copied to the dist folder.
 * This will also generete sourcemaps for the minified version.
 *
 * Depends on: docs
 */
gulp.task('scripts-app', function() {
  return gulp.src('src/js/app/**/*.js')
    .pipe(plumber(options.plumberConfig()))
    .pipe(ngannotate({gulpWarnings: false}))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    // make minified 
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(!argv.dev, stripDebug()))
    .pipe(sourcemaps.init())
    .pipe(gulpif(!argv.dev, uglify()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});


/**
 * Task to handle all vendor specific javasript. All vendor javascript will be copied to the dist directory. Also a concatinated version will be made, available in \dist\js\vendor\vendor.js
 */
gulp.task('scripts-vendor', function() {
    // script must be included in the right order. First include angular, then angular-route
  return gulp.src(['src/js/vendor/*/**/angular.min.js','src/js/vendor/*/**/angular-route.min.js'])
    .pipe(gulp.dest('dist/js/vendor'))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/js/vendor'));
});


/**
 * Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder.
 * This will also auto prefix vendor specific rules.
 */
gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(plumber(options.plumberConfig()))
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'));
});


/**
 * Output TODO's & FIXME's in markdown and json file as well
 */
gulp.task('todo', function() {
    gulp.src(['src/js/app/**/*.js','src/styles/app/**/*.scss'])
      .pipe(plumber(options.plumberConfig()))
      .pipe(todo())
      .pipe(gulp.dest('./')) //output todo.md as markdown
      .pipe(todo.reporter('json', {fileName: 'todo.json'}))
      .pipe(gulp.dest('./')) //output todo.json as json
});


/**
 * Watches changes to template, Sass, javascript and image files. On change this will run the appropriate task, either: copy styles, scripts or images. 
 */
gulp.task('watch', function() {

  // watch index.html
  gulp.watch('src/index.html', ['copy-index']);

  // watch html files
  gulp.watch('src/**/*.html', ['copy-template']);

  // watch fonts 
  gulp.watch('src/fonts/**', ['copy-fonts']);

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch app .js files
  gulp.watch('src/js/app/**/*.js', ['scripts-app']);

  // Watch vendor .js files
  gulp.watch('src/js/vendor/**/*.js', ['scripts-vendor']);

  // Watch image files
  gulp.watch('src/img/**/*', ['images']);
});

function onError(error){
  // TODO log error with gutil
  notify.onError(function (error) {
    return error.message;
  });
  this.emit('end');
}