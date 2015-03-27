/**
 * Some nice examples:
 * http://thewebistheplatform.com/magic-gulpfiles-part-1/
 */
var underscore = require('underscore'),
    fs = require('fs'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish')
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    express = require('express'),
    del = require('del'),
    stripDebug = require('gulp-strip-debug'),
    browserSync = require('browser-sync'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    todo = require('gulp-todo'),
    jsdoc = require("gulp-jsdoc"),
    plumber = require('gulp-plumber'),
    install = require("gulp-install"),
    ngannotate = require('gulp-ng-annotate'),
    replace = require('gulp-replace');

var options = {liveReload: false};

/**
 * browser-sync task for starting a server. This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.
 * Depends on: watch
 */
gulp.task('browser-sync', ['watch'], function() {

  // Watch any files in dist/* & index.html, reload on change
  gulp.watch(['dist/**', 'index.html']).on('change', function(){browserSync.reload({});notify({ message: 'Reload browser' });});

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
 * Depends on: clean, deps
 */
gulp.task('build', ['deps', 'clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'copy', 'todo');
});


/**
 * Cleans the `dist` folder and other generated files
 */
gulp.task('clean', function(cb) {
    del(['dist', 'docs','todo.md', 'todo.json'], cb);
});

/**
 * Installs all dependend bower components.
 */
gulp.task('deps', function() {
  gulp.src(['./bower.json'])
    .pipe(install());
});

/**
 * Copies all to dist/
 */
gulp.task('copy', function() {

  // copy all jpg's as they are not handled by the images task
  gulp.src( 'src/img/**/*.jpg')
    .pipe(gulp.dest('dist/assets/img'));

  // copy all fonts
    gulp.src( 'src/fonts/**')
      .pipe(gulp.dest('dist/assets/fonts'));

  // copy all html && json
  gulp.src( ['src/js/app/**/*.html', 'src/js/app/**/*.json'])
      .pipe(gulp.dest('dist/assets/js/app'));

  // copy the index.html
    return gulp.src('src/index.html')
//    .pipe(gulpif(options.liveReload, replace(/(\<\/body\>)/g, "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>$1")))
        .pipe(gulp.dest('dist/'));
});


/**
 * Default task.
 * Depends on: build
 */
gulp.task('default', ['build']);


/**
 * Generate docs from all application javascript
 */
gulp.task('docs', function() {
  return gulp.src("./src/js/app/**/*.js")
    .pipe(jsdoc('./docs'))
});


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
 * Task to start a Express server on port 4000 and used the live reload functionality.
 * Depends on: express, live-reload
 */
gulp.task('express-lr', ['express', 'live-reload'], function(){});

/**
 * Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/assets/img`
 */
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(plumber())
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'));
});


/**
 * Start the live reload server. Live reload will be triggered when a file in the `dist` folder or the index.html changes.
 * Depends on: watch
 */
gulp.task('live-reload', ['watch'], function() {

  options.liveReload = true;
  // first, delete the index.html from the dist folder as we will copy it later
  del(['dist/index.html']);

  // add livereload script to the index.html
  gulp.src(['src/index.html'])
   .pipe(gulp.dest('dist'));
   
  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/* & index.html, reload on change
  gulp.watch(['dist/**', 'index.html']).on('change', livereload.changed);

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
gulp.task('scripts-app', ['docs'], function() {
  return gulp.src('src/js/app/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .on('error', notify.onError(function (error) {
      return error.message;
     }))
    .pipe(jshint.reporter(stylish))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(!argv.dev, stripDebug()))
    .pipe(ngannotate())
    .pipe(gulpif(!argv.dev, uglify()))
    .on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'));
});


/**
 * Task to handle all vendor specific javasript. All vendor javascript will be copied to the dist directory.
 * Also a concatinated version will be made, available in \dist\assets\js\vendor\vendor.js
 *
 * Before running this task the bower dependencies need to be downloaded.
 */
gulp.task('scripts-vendor', function() {
  var bowerFile = require('./bower.json');
  var bowerDir = './client/lib';
  var bowerPackages = [];

  // assume that all bower deps have to be included in the order they are listed in bower.json
  underscore.each(bowerFile.dependencies, function(version, name){
    var dir = bowerDir + '/' + name + '/';
    var bowerDepFile = require(dir + 'bower.json');
    var file = dir + bowerDepFile.main;
    var minfile = file.substring(0, file.length - 3) + '.min.js';

    if (fs.existsSync(minfile)) {
      // use min version
      bowerPackages.push(minfile);
    } else {
      // unminified
      bowerPackages.push(file);
    }
  });

  return gulp.src(bowerPackages)
    .pipe(gulp.dest('dist/assets/js/vendor'))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/assets/js/vendor'));
});


/**
 * Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder.
 * This will also auto prefix vendor specific rules.
 */
gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(plumber())
    .pipe(sass({ style: 'expanded' }))
    .on('error', handleError)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .on('error', handleError)
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'));
});


/**
 * Output TODO's & FIXME's in markdown and json file as well
 */
gulp.task('todo', function() {
    gulp.src('src/js/app/**/*.js')
      .pipe(plumber())
      .pipe(todo())
      .pipe(gulp.dest('./')) //output todo.md as markdown
      .pipe(todo.reporter('json', {fileName: 'todo.json'}))
      .pipe(gulp.dest('./')) //output todo.json as json
});


/**
 * Watches changes to template, Sass, javascript and image files. On change this will run the appropriate task, either: copy styles, scripts or images. 
 */
gulp.task('watch', function() {

  // watch html files
  gulp.watch('src/**/*.html', ['copy']);

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch app .js files
  gulp.watch('src/js/app/**/*', ['scripts-app']);

  // Watch vendor .js files
  gulp.watch('src/js/vendor/**/*', ['scripts-vendor']);

  // Watch image files
  gulp.watch('src/img/**/*', ['images']);
});


function handleError (error) {

    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}
