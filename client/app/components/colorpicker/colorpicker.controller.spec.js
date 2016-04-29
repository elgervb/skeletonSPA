import ColorpickerModule from './colorpicker'
import ColorpickerController from './colorpicker.controller';

describe('Colorpicker', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ColorpickerModule.name));
  
  beforeEach(inject((_$rootScope_, _$filter_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      let ctrl = new ColorpickerController(_$filter_, $rootScope);
      ctrl.$onInit();
      return ctrl;
    };
  }));

  describe('Controller', () => {
    it('has a name property', () => {
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
    
    it('initiates color', () => {
      let controller = makeController();
      
      expect(controller).to.have.property('color');
      
      expect(controller.color).to.be.a('object');
      expect(controller.color).to.have.property('red');
      expect(controller.color).to.have.property('green');
      expect(controller.color).to.have.property('blue');
    });
  });
  
});
