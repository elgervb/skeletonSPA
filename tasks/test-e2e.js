/**
 * Run End to End (e2e) tests with Protractor
 */
module.exports = function (gulp, plugins, settings) {
  return function () {
    let angularProtractor = plugins.angularProtractor;
    let gutil = plugins.gutil;
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