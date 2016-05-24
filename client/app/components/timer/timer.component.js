import controller from './timer.controller';
import './timer.scss';

let timerComponent = {
  restrict: 'E',
  bindings: {},
  // template: `<`,
  controller,
  controllerAs: '$ctrl'
};

export default timerComponent;
