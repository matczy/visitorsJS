import template from './contactPersonField.html';
import controller from './contactPersonField.controller.js';

let contactPersonFieldComponent = {
  restrict: 'E',
  bindings: {
    contactPerson:'=',
    persons:'<',
    disabled:'<',
      formName:'<'
  },
  template,
  controller,
};

export default contactPersonFieldComponent;
