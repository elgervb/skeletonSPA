/**
 * Run tests and keep watching changes for files
 */
module.exports = (gulp, plugins, settings) => {
  return function (done) {
    let Server = plugins.karma.Server;
    new Server({
      configFile: `${__dirname}/../karma.conf.js`,
      singleRun: true
    }, () => {done();}).start();
  };
};
