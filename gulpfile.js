var gulp = require('gulp'),
    argv = require('yargs').argv,
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    del = require('del'),
    gulpif = require('gulp-if'),
    gutil = require('gulp-util')
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    q = require('q'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    size = require('gulp-size');

var config = require('./package.json');
var settings = config.settings;
    settings.liveReload=false;
    settings.plumberConfig=function(){
      return {'errorHandler': onError};
    };

/**
 * browser-sync task for starting a server. This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.
 * Depends on: watch
 */
gulp.task('browser-sync', ['watch'], function() {
  var browserSync = require('browser-sync'),
  port = argv.port||settings.serverport;

  // Watch any files in dist/*, reload on change
  gulp.watch([settings.dist + '**']).on('change', function(){browserSync.reload({});});

  return browserSync({
      browser: ["google chrome"],
      ghostMode: {
        clicks: true,
        location: true,
        forms: true,
        scroll: true
      },
      injectChanges: true, // inject CSS changes (false force a reload) 
      logLevel: "info",
      open: false, // "local", "external", "ui"
      port: port,
      scrollProportionally: true, // Sync viewports to TOP position
      scrollThrottle: 50,
      server: {
          baseDir: settings.dist
      },
      ui: {
        port: port+1,
        weinre: {
            port: port+2
        }
      }
    });
});


/**
 * Build and copy all styles, scripts, images and fonts.
 * Depends on: info, clean
 */
gulp.task('build', ['info', 'clean'], function() {
  gulp.start('styles', 'scripts', 'images', 'copy', 'todo');
});


/**
 * Cleans the `dist` folder and other generated files
 */
gulp.task('clean', ['clear-cache'],  function(cb) {
  del([settings.dist, 'todo.md', 'todo.json'], cb);
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


/**
 * Task for copying fonts only
 */
gulp.task('copy-fonts', function() {
  var deferred = q.defer();
   // copy all fonts
   setTimeout(function() {
    gulp.src( settings.src + 'fonts/**')
      .pipe(gulp.dest(settings.dist + 'fonts'));
       deferred.resolve();
  }, 1);

  return deferred.promise;
});

/**
 * Task for copying templates. This will lint the HTML and remove comments
 */
gulp.task('copy-template', function() {
  var htmlmin = require('gulp-htmlmin'),
      htmlhint = require("gulp-htmlhint");
  // copy all html && json
  return gulp.src( [settings.src + 'js/app/**/*.html', settings.src + 'js/app/**/*.json'])
    .pipe(htmlhint({
      htmlhintrc: '.htmlhintrc',
    }))
    .pipe(htmlhint.reporter())
    // html min MUST come after the html hinter
    .pipe(htmlmin({
      collapseWhitespace: false, 
      removeComments: true,
    }))
    .pipe(cache(gulp.dest('dist/js/app')));
});

/**
 * Task for copying index page only. Optionally add live reload script to it
 */
gulp.task('copy-index', function() {
  var htmlmin = require('gulp-htmlmin');
   // copy the index.html
   return gulp.src(settings.src + 'index.html')
    .pipe(htmlmin({
      collapseWhitespace: false, 
      removeComments: true,
    }))
    .pipe(gulpif(settings.liveReload, replace(/(\<\/body\>)/g, "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>$1")))
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
gulp.task('docs-js', ['todo'], function(){
  var gulpDoxx = require('gulp-doxx');

  gulp.src([settings.src + '/js/**/*.js', 'README.md', settings.reports + '/TODO.md', settings.tests + "/**" ])
    .pipe(gulpDoxx({
      title: config.name + " docs",
      urlPrefix: "file:///"+__dirname+settings.reports
    }))
    .pipe(gulp.dest(settings.reports));
});

/**
 * Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/img`
 */
gulp.task('images', function() {
  var imagemin = require('gulp-imagemin');
  var deferred = q.defer();

  setTimeout(function() {
    gulp.src(settings.src + 'img/**/*')
      .pipe(plumber(settings.plumberConfig()))
      .pipe(size({title:"images before"}))
      .pipe(cache(imagemin({ optimizationLevel: 5, progressivee: true, interlaced: true })))
      .pipe(size({title:"images after "}))
      .pipe(gulp.dest(settings.dist + 'img'));
    deferred.resolve();
  }, 1);

  return deferred.promise;
});

gulp.task('list', function() {
  var max = function(){
    var max = 0;
    for (var key in gulp.tasks) {
      if(max < key.length){max = key.length;}
    }
    return max;
  },
  print = function(key, max){
    while (key.length < max){
      key += " ";
    }
    return key;
  }

  for (var key in gulp.tasks) {
    var out = print(key, max()), task = gulp.tasks[key];
    if (task.hasOwnProperty('dep') && task.dep.length > 0){
      out += '  dep: ' + task.dep;
    }

    console.log(out);
  }
});

/**
 * log some info about this app
 */
gulp.task('info',function(){
  // log project details
  gutil.log( gutil.colors.cyan("Running gulp on project "+config.name+" v"+ config.version) );
  gutil.log( gutil.colors.cyan("Author: " + config.author.name) );
  gutil.log( gutil.colors.cyan("Email : " + config.author.email) );
  gutil.log( gutil.colors.cyan("Site  : " + config.author.url) );
  // log info
  gutil.log("If you have an enhancement or encounter a bug, please report them on", gutil.colors.magenta(config.bugs.url));
});


/**
 * Start the live reload server. Live reload will be triggered when a file in the `dist` folder changes. This will add a live-reload script to the index.html page, which makes it all happen.
 * Depends on: watch
 */
gulp.task('live-reload', ['watch'], function() {
  var livereload = require('gulp-livereload');

  settings.liveReload = true;
  // first, delete the index.html from the dist folder as we will copy it later
  del([settings.dist + 'index.html']);

  // add livereload script to the index.html
  gulp.src([settings.src + 'index.html'])
   .pipe(replace(/(\<\/body\>)/g, "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>$1"))
   .pipe(gulp.dest(settings.dist));
   
  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/*, reload on change
  gulp.watch([settings.dist + '**']).on('change', livereload.changed);
});


/**
 * Packaging all compiled resources. Due to the async nature of other tasks, this task cannot depend on build... do a build first and then package it.
 */
gulp.task('package', function(cb) {
  var zip = require('gulp-zip'),
  fileName = config.name + '-' + config.version + '.zip'

  del(settings.dist+fileName);

  return gulp.src([settings.dist+'**'], { base: './dist' })
  .pipe(zip(fileName))
  .pipe(gulp.dest('dist'));
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
 * This will also generete sourcemaps for the minified version. Depends on: docs-js
 */
gulp.task('scripts-app', ['docs-js'], function() {
  var jshint = require('gulp-jshint'),
      jscs = require('gulp-jscs'),
      map = require('map-stream'),
      ngannotate = require('gulp-ng-annotate'),
      stripDebug = require('gulp-strip-debug'),
      stylish = require('jshint-stylish'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify');

  return gulp.src(settings.src + 'js/app/**/*.js')
    .pipe(plumber())
    .pipe(jscs({
      preset: "node-style-guide", 
      verbose: true,
      // disable or change rules
      "requireTrailingComma": null,
      "validateLineBreaks": null,
      "disallowTrailingWhitespace": null,
      "maximumLineLength": 120,
      "disallowMultipleVarDecl": null
    }))

    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))

    .pipe(ngannotate({gulpWarnings: false}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(settings.dist + 'js'))
    
    // make minified 
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(!argv.dev, stripDebug()))
    .pipe(sourcemaps.init())
    .pipe(gulpif(!argv.dev, uglify()))
    .pipe(sourcemaps.write())
    .pipe(size({"showFiles":true}))
    .pipe(gulp.dest(settings.dist + 'js'));
});


/**
 * Task to handle all vendor specific javasript. All vendor javascript will be copied to the dist directory. Also a concatinated version will be made, available in \dist\js\vendor\vendor.js
 */
gulp.task('scripts-vendor', ['scripts-vendor-maps'], function() {
  var flatten = require('gulp-flatten');
  // mocks should be a separate file
  gulp.src(settings.src + 'js/vendor/*/**/angular-mocks.js')
    .pipe(flatten())
    .pipe(gulp.dest(settings.dist + 'js/vendor'));

  // script must be included in the right order. First include angular, then angular-route
  return gulp.src([settings.src + 'js/vendor/*/**/angular.min.js',settings.src + 'js/vendor/*/**/angular-route.min.js', "!"+settings.src + 'js/vendor/*/**/angular-mocks.js', settings.src + 'js/vendor/**/*.js'])
    .pipe(gulp.dest(settings.dist + 'js/vendor'))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(settings.dist + 'js/vendor'));
});


/**
 * Copy all vendor .js.map files to the vendor location
 */
gulp.task('scripts-vendor-maps', function(){
  var flatten = require('gulp-flatten');

  return gulp.src(settings.src + 'js/vendor/**/*.js.map')
  .pipe(flatten())
  .pipe(gulp.dest(settings.dist + 'js/vendor'));
});


/**
 * TTask to start a server, use --port={{port}} to set the port, otherwist the port from the settings will be used (4000)
 */
gulp.task('server', function(){
  var express = require('express'),
  app = express(), 
  port = argv.port||settings.serverport;
  app.use(express.static(__dirname + "/" + settings.dist));

  app.listen(port); 
  gutil.log('Server started. Port', port,"baseDir",__dirname+"/"+settings.dist);
});


/**
 * Task to start a server on port 4000 and used the live reload functionality.
 * Depends on: server, live-reload
 */
gulp.task('start', ['live-reload', 'server'], function(){});


/**
 * Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder.
 * This will also auto prefix vendor specific rules.
 *
 * @see https://github.com/sass/node-sass for configuration
 */
gulp.task('styles', function() {
  var autoprefixer = require('gulp-autoprefixer'),
      cmq = require('gulp-combine-media-queries'),
      minifycss = require('gulp-minify-css'),
      sass = require('gulp-sass');

  return gulp.src([settings.src + 'styles/**/*.scss'])
    .pipe(plumber(settings.plumberConfig()))
    .pipe(sass({ 
      style: 'nested',
      precision: 5,
      sourceComments: argv.dev ? true : false
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(cmq({log: true}))
    .pipe(gulp.dest(settings.dist + 'css'))

    .pipe(size({"showFiles":true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(cmq())
    .pipe(size({"showFiles":true}))
    .pipe(gulp.dest(settings.dist + 'css'));
});


/**
 * Run rests and keep watching changes for files
 */
gulp.task('test', function(done) {
  var karma = require('karma').server;
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});



/**
 * Output TODO's & FIXME's in markdown and json file as well
 */
gulp.task('todo', function() {
  var todo = require('gulp-todo');
  gulp.src([settings.src + 'js/app/**/*.js',settings.src + 'styles/app/**/*.scss'])
    .pipe( plumber( settings.plumberConfig() ) )
    .pipe( todo() )
    .pipe( gulp.dest( settings.reports ) ) // output todo.md as markdown
    .pipe( todo.reporter('json', {fileName: 'todo.json'} ) )
    .pipe( gulp.dest( settings.reports ) ) // output todo.json as json
});

/**
 * Watches changes to template, Sass, javascript and image files. On change this will run the appropriate task, either: copy styles, templates, scripts or images. 
 */
gulp.task('watch', function() {

  // watch index.html
  gulp.watch(settings.src + 'index.html', ['copy-index']);

  // watch html files
  gulp.watch(settings.src + '**/*.html', ['copy-template']);

  // watch fonts 
  gulp.watch(settings.src + 'fonts/**', ['copy-fonts']);

  // Watch .scss files
  gulp.watch(settings.src + 'styles/**/*.scss', ['styles']);

  // Watch app .js files
  gulp.watch(settings.src + 'js/app/**/*.js', ['scripts-app']);

  // Watch vendor .js files
  gulp.watch(settings.src + 'js/vendor/**/*.js', ['scripts-vendor']);

  // Watch image files
  gulp.watch(settings.src + 'img/**/*', ['images']);
});

/**
 * Run rests and keep watching changes for files
 */
gulp.task('watch:test', function(done) {
  var karma = require('karma').server;
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});


function onError(error){
  // TODO log error with gutil
  notify.onError(function (error) {
    gutil.log(error);
    return error.message;
  });
  this.emit('end');
}
