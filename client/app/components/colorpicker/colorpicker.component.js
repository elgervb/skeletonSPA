import template from './colorpicker.html';
import controller from './colorpicker.controller';
import './colorpicker.scss';

let colorpickerComponent = {
  bindings: {
    init: '<?',
    onUpdate: '=?'
  },
  template,
  controller
};

export default colorpickerComponent;
