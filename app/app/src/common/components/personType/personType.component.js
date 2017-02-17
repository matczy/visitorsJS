import template from './personType.html';
import controller from './personType.controller.js';

let personTypeComponent = {
  restrict: 'E',
  bindings: {
    type:'<',
  },
  template,
  controller
};

export default personTypeComponent;
