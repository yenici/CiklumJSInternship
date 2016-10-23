import controller from './spinner.controller';
import template from './spinner.html';

const SpinnerComponent = {
  bindings: {
    active: '<',
  },
  controller,
  template,
};

export default SpinnerComponent;
