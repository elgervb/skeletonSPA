/**
 * Create an icon font from all images located in /src/font-icons
 */
module.exports = function (gulp, plugins, settings) {
    return function () {
      let iconfont = require('gulp-iconfont');
      let consolidate = require('gulp-consolidate');
      let rename = require('gulp-rename');
      let imagemin = require('gulp-imagemin');
      let fontName = settings.argv.fontname || 'myfont'; // set name of your symbol font
      let template = 'fontTemplate';
      
      return gulp.src([`${settings.src}font-icons/**/*.svg`])
      .pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true}))
      .pipe(iconfont({
        fontName,
        appendCodePoints: true,
        prependUnicode: true, 
        formats: ['ttf', 'eot', 'woff'],
        fontHeight: 500,
        normalize: true
      }))
      .on('glyphs', function(glyphs) {
        var options = {
          glyphs: glyphs.map(function(glyph) {
            // this line is needed because gulp-iconfont has changed the api from 2.0
            // and replace all _ by -
            return { name: glyph.name.replace(/_/g,'-').toLowerCase(), codepoint: glyph.unicode[0].charCodeAt(0) }
          }),
          fontName: fontName,
          fontPath: './', // set path to font (from your CSS file if relative)
          className: 'icon' // set class name in your CSS
        };
        gulp.src('tasks/templates/fontTemplate.css')
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename:fontName }))
          .pipe(gulp.dest(`${settings.src}fonts/${fontName}`)); // export to src and copy later

        // if you don't need sample.html, remove next 4 lines
        gulp.src('tasks/templates/fontTemplate.html')
          .pipe(consolidate('lodash', options))
          .pipe(rename({ basename: `sample-${fontName}-font` }))
          .pipe(gulp.dest(`${settings.src}fonts/${fontName}`)); // set path to export your sample HTML
      })
      .pipe(gulp.dest(`${settings.src}fonts/${fontName}`)); // export to src and copy later
    };
};
