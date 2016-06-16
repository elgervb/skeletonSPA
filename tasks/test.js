import karma from 'karma';
/**
 * Run tests and keep watching changes for files
 * 
 * @param {function} gulp gulp
 * @param {object} settings application settings
 * 
 * @return {function} the gulp pipe
 */
module.exports = () => {
  return function (done) {
    new karma.Server({
      configFile: `${__dirname}/../karma.conf.js`,
      singleRun: true
    }, () => {
      done();
    }).start();
  };
};
