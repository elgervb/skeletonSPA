describe('main page', function() {
  
  it('should contain 2 images', function() {
    browser.get('http://localhost:4000');

    var images = element.all(by.css('img'));
    expect(images.count()).toEqual(3);
  });
});