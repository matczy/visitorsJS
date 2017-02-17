import template from './onObjectRow.html';
import controller from './onObjectRow.controller.js';
let onObjectRowComponent = {
  restrict: 'E',
  bindings: {
    object:'<',
    index:'<',

  },
  template,
  controller
};

export default onObjectRowComponent;
