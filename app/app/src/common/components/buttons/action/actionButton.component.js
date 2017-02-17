import template from './actionButton.html';
import controller from './actionButton.controller.js';

let actionButtonComponent = {
  restrict: 'E',
  bindings: {
    onClick:"&",
    color:'@',
    title:'@',
    size:'@',
    icon:'@',
    formName:'<'
  },
  template,
  controller
};

export default actionButtonComponent;
