import iconfont from 'gulp-iconfont';
import consolidate from 'gulp-consolidate';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
/**
 * Create an icon font from all images located in /src/font-icons
 * 
 * @param {function} gulp gulp
 * @param {object} settings application settings
 * 
 * @return {function} the gulp pipe
 */
module.exports = (gulp, settings) => {
    return () => {
      let fontName = settings.argv.name || 'myfont'; // set name of your symbol font
      let template = 'fontTemplate';
      return gulp.src(['./generator/font-icons/**/*.svg'])
      .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
      .pipe(iconfont({
        fontName,
        appendCodePoints: true,
        prependUnicode: true, 
        formats: ['ttf', 'eot', 'woff'],
        fontHeight: 512,
        normalize: true
      }))
      .on('glyphs', (glyphs) => {
        var options = {
          glyphs: glyphs.map((glyph) => {
            // this line is needed because gulp-iconfont has changed the api from 2.0
            // and replace all _ by -
            return { name: glyph.name.replace(/_/g,'-').toLowerCase(), codepoint: glyph.unicode[0].charCodeAt(0) }
          }),
          fontName,
          fontPath: './', // set path to font (from your CSS file if relative)
          className: 'icon' // set class name in your CSS
        };
        gulp.src(`${__dirname}/templates/fontTemplate.css`)
          .pipe(consolidate('lodash', options))
          .pipe(rename({basename: fontName}))
          .pipe(gulp.dest(`${settings.src}fonts/${fontName}`));

        // if you don't need sample.html, remove next 4 lines
        gulp.src(`${__dirname}/templates/fontTemplate.html`)
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: `sample-${fontName}-font` }))
          .pipe(gulp.dest(`${settings.src}fonts/${fontName}`)); // set path to export your sample HTML
      })
      .pipe(gulp.dest(`${settings.src}fonts/${fontName}`)); 
    };
};
