/**
 * Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `app.js`.  Minified and non-minified versions are copied to the dist folder.
 * This will also generete sourcemaps for the minified version. Depends on: docs-js, lint-js
 */
module.exports = function (gulp, plugins, settings) {
    return function () {
      let babel = plugins.babel;
      let concat = plugins.concat;
      let gulpif = plugins.if;
      let ngannotate = plugins.ngAnnotate;
      let plumber = plugins.plumber;
      let size = plugins.size;
      let sourcemaps = plugins.sourcemaps;
      let stripDebug = plugins.stripDebug;
      let uglify = plugins.uglify;

      return gulp.src(settings.jsSources)
      .pipe(plumber())
      .pipe(gulpif(settings.argv.dev, sourcemaps.init()))
      .pipe(babel())
      .pipe(ngannotate({gulpWarnings: false}))
      .pipe(concat('app.js'))
      .pipe(gulpif(!settings.argv.dev, stripDebug()))
      .pipe(gulpif(!settings.argv.dev, uglify()))
      .pipe(gulpif(settings.argv.dev, sourcemaps.write('./')))
      .pipe(size({showFiles: true}))
      .pipe(gulp.dest(`${settings.dist}js`));
    };
};
