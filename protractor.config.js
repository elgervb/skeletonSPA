exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  /**
   * Direct connect with a real browser, not supported for PhantomJS
   */
  // directConnect: true,
  
  /**
   * Run in PhantomJS
   */
  capabilities: {
    'browserName': 'phantomjs',
    /* 
    * Can be used to specify the phantomjs binary path.
    * This can generally be ommitted if you installed phantomjs globally.
    */
    'phantomjs.binary.path': require('phantomjs').path,
  
    /*
    * Command line args to pass to ghostdriver, phantomjs's browser driver.
    * See https://github.com/detro/ghostdriver#faq
    */
    //'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  },
  
  /**
   * Run in real browser: chrome, firefox
   */
  // capabilities: { // running agains a single browser
  //   browserName: 'chrome', // 'chrome', 'firefox', 'internet explorer'
  // },
  
  /**
    * Run in multiple browsers
    */
  // multiCapabilities: [{ // running agains multiple browsers
  //   browserName: 'firefox'
  // }, {
  //   browserName: 'chrome'
  // }]
  framework: 'jasmine',
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
