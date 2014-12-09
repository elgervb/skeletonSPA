var gulp = require('gulp'),
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
    gulpif = require('gulp-if');

/**
 * Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder.
 * This will also auto prefix vendor specific rules.
 */
gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .on('error', handleError)
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

/**
 * Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `app.js`.  Minified and non-minified versions are copied to the dist folder.
 * This will also generete sourcemaps for the minified version.
 */
gulp.task('scripts', ['scripts-app','scripts-vendor']);

gulp.task('scripts-app', function() {
  return gulp.src('src/js/app/**/*.js')
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
    .pipe(uglify())
    .on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts app task complete' }));
});
gulp.task('scripts-vendor', function() {
  return gulp.src('src/js/vendor/**/*.js')
    .pipe(gulp.dest('dist/assets/js/vendor'))
    .pipe(notify({ message: 'Scripts vendor task complete' }));
});

/**
 * Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/assets/img`
 */
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

/**
 * Cleans the `dist` folder
 */
gulp.task('clean', function(cb) {
    del('dist', cb);
});

/**
 * Build and copy all styles, scripts, images and fonts.
 * Depends on: clean
 */
gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'copy-fonts');
});

gulp.task('remove',['clean'], function(cb){
  del('node_modules', cb);
});

/**
 * Default task.
 * Depends on: build
 */
gulp.task('default', ['build']);

/**
 * Copies all fonts found in folder `src/fonts/**` to target folder `dist/assets/fonts`
 */
gulp.task('copy-fonts', function() {
    return gulp.src(['src/fonts/**'])
        .pipe(gulp.dest('dist/assets/fonts'));
});

/**
 * Watches changes to Sass, javascript and images. On change this will run the appropriate task, either: styles, scripts or images. 
 */
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/img/**/*', ['images']);

});

/**
 * Start the live reload server. Live reload will be triggered when a file in the `dist` folder or the index.html changes.
 * Depends on: watch
 */
gulp.task('live-reload', ['watch'], function() {

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/* & index.html, reload on change
  gulp.watch(['dist/**', 'index.html']).on('change', livereload.changed);

  console.log('To enable live reload, you can place following script in your page or use the browser plugin')
  console.log("<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>");
});

/**
 * browser-sync task for starting a server. This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.
 * Depends on: watch
 */
gulp.task('browser-sync', ['watch'], function() {

  // Watch any files in dist/* & index.html, reload on change
  gulp.watch(['dist/**', 'index.html']).on('change', function(){browserSync.reload({});notify({ message: 'Reload browser' });});

  return browserSync({
      server: {
          baseDir: "./"
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
 * Task to start a Express server on port 4000.
 */
gulp.task('express', function(){
  var app = express(), port = 4000;
  app.use(express.static(__dirname));
  app.listen(port); 
  console.log('started webserver on port ' + port);
});

/**
 * Task to start a Express server on port 4000 and used the live reload functionality.
 * Depends on: express, live-reload
 */
gulp.task('express-lr', ['express', 'live-reload'], function(){});

function handleError (error) {

    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}