import ColorpickerModule from './colorpicker'
import ColorpickerController from './colorpicker.controller';
import ColorpickerComponent from './colorpicker.component';
import ColorpickerTemplate from './colorpicker.html';

describe('Colorpicker', () => {
  let $rootScope;

  beforeEach(window.module(ColorpickerModule.name));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
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
