import ColorpickerModule from './colorpicker'
import ColorpickerController from './colorpicker.controller';

describe('Colorpicker', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ColorpickerModule.name));
  
  beforeEach(inject((_$rootScope_, _$filter_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      let ctrl = new ColorpickerController(_$filter_, $rootScope);
      return ctrl;
    };
  }));

  describe('Controller', () => {
    
    it('has a name property', () => {
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
    
  });
  
});
