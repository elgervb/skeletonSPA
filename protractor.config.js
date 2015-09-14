exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // capabilities: { // running agains a single browser
  //   browserName: 'phantomjs' // 'chrome', 'firefox'
  // }
  multiCapabilities: [{ // running agains multiple browsers
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }]
};
