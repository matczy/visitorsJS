import template from './itemRow.html';
import controller from './itemRow.controller.js';

let itemRowComponent = {
  restrict: 'E',
  bindings: {
    item:'<',
    onAction:'&',
    onActionTitle:'@',
    index:'<',
    showCreatedDate:'<',
  },
  template,
  controller
};

export default itemRowComponent;
