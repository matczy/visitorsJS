import template from './itemType.html';
import controller from './itemType.controller.js';

let itemTypeComponent = {
  restrict: 'E',
  bindings: {
    type:'<',
  },
  template,
  controller
};

export default itemTypeComponent;
