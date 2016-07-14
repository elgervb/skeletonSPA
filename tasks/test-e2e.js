import angularProtractor from 'gulp-angular-protractor';
import gutil from 'gulp-util';
/**
 * Run End to End (e2e) tests with Protractor
 * 
 * @param {function} gulp gulp
 * @param {object} settings application settings
 * 
 * @return {function} the gulp pipe
 */
module.exports = function (gulp, settings) {
  return function () {
    let port = settings.argv.port || settings.serverport;
 
    gulp.src(['./tests/e2e/*.js'])
    .pipe(angularProtractor({
      configFile: 'protractor.config.js',
      args: ['--baseUrl', `http://localhost:${port}`],
      autoStartStopServer: true,
      debug: false
    }))
    .on('error', (e) => {
      gulp.src(['./tests/e2e/*.js'])
      .pipe(
        gutil.log('E2E tests failed!') 
      );
      throw new Error('E2E tests failed', e);
    });
  };
};