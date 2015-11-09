/* global browser, expect, by, it, describe, element*/
describe('main page', () => {
  
  it('should contain 2 images', () => {
    let images;
    
    browser.get('http://localhost:4000');

    images = element.all(by.css('img'));
    expect(images.count()).toEqual(2);
  });
  
  it('should contain a divider', () => {
    let divider = element.all(by.css('.ng-plus-gulp'));
    
    /* 
     * Pause the browser here. 
     * Type c in Protractors terminal to goto the next command.
     * Type repl in Protractors terminal to enter interactive mode and send commands manually
     */
    // browser.pause();
    
    /*
     * Debug the test script here.
     * All client side scripts are available through window.clientSideScripts in the browser.
     * 
     * typing:
     * window.clientSideScripts.findInputs('username'); 
     * in the console, will find the username input
     */
    // browser.debugger();
    
    expect(divider.count()).toEqual(1);
    expect(divider.get(0).getText()).toEqual('+');
  });
});
