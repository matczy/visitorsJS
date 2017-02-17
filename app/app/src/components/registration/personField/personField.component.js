import template from './personField.html';
import controller from './personField.controller.js';

let component = {
  restrict: 'E',
  bindings: {
    person:'=',
    surnameAndNameChange:'&',
    disabled:'<',
    companies:'<',
    formName:'<'
  },
  template,
  controller
};

export default component;
