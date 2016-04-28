import karma from 'karma';
/**
 * Run rests and keep watching changes for files
 */
module.exports = function (gulp, settings) {
  return function (done) {
    new karma.Server({
      configFile: `${__dirname}/../karma.conf.js`,
      singleRun: false,
      autoWatch: true
    }, done).start();
  };
};
