describe('main page', function() {
  
  it('should contain 2 images', function() {
    browser.get('http://localhost:4000');

    var images = element.all(by.css('img'));
    expect(images.count()).toEqual(2);
  });
  
  it ('should contain a divider', function(){
    var divider = element.all(by.css('.ng-plus-gulp'));
    expect(divider.count()).toEqual(1);
    expect(divider.get(0).getText()).toEqual('+');
  });
});