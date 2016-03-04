/**
 * Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder.
 * This will also auto prefix vendor specific rules.
 *
 * @see https://github.com/sass/node-sass for configuration
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let autoprefixer = plugins.autoprefixer;
    let cmq = plugins.groupCssMediaQueries;
    let cssnano = plugins.cssnano;
    let gulpif = plugins.if;
    let plumber = plugins.plumber;
    let sass = plugins.sass;
    let size = plugins.size;
    let sourcemaps = plugins.sourcemaps;
    
    return gulp.src([`${settings.src}styles/**/*.scss`])
    .pipe(plumber())
    .pipe(gulpif(settings.argv.dev, sourcemaps.init()))
    .pipe(sass({
      style: 'nested',
      precision: 5,
      sourceComments: settings.argv.dev ? true : false
    }))
    .on('error', sass.logError)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulpif(settings.argv.dev, sourcemaps.write('./', {sourceRoot: '/css/sass'})))
    .pipe(gulpif(!settings.argv.dev, cmq())) // only combine media queries when not generating source maps, as this breaks them
    .pipe(gulpif(!settings.argv.dev, cssnano()))
    .pipe(size({showFiles: true}))  
    .pipe(gulp.dest(`${settings.dist}css`));
  };
};
