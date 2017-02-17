import template from './gateType.html';
import controller from './gateType.controller.js';

let gateTypeComponent = {
  restrict: 'E',
  bindings: {
    type:'<',
  },
  template,
  controller
};

export default gateTypeComponent;
