import karma from 'karma';
/**
 * Run tests and keep watching changes for files
 * 
 * @return {function}
 */
module.exports = (gulp, settings) => {
  return function (done) {
    new karma.Server({
      configFile: `${__dirname}/../karma.conf.js`,
      singleRun: true
    }, () => {done();}).start();
  };
};
