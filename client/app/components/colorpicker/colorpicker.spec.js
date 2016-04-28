import ColorpickerModule from './colorpicker'
import ColorpickerController from './colorpicker.controller';
import ColorpickerComponent from './colorpicker.component';
import ColorpickerTemplate from './colorpicker.html';

describe('Colorpicker', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ColorpickerModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ColorpickerController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
    //   let controller = makeController();
    //   expect(controller).to.have.property('name');
    // });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    // it('has name in template [REMOVE]', () => {
    //   expect(ColorpickerTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    // });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ColorpickerComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ColorpickerTemplate);
      });

      // it('uses `controllerAs` syntax', () => {
      //   expect(component).to.have.property('controllerAs');
      // });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ColorpickerController);
      });
  });
});
