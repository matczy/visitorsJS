import template from './transportRow.html';
import controller from './transportRow.controller.js';

let transportRowComponent = {
  restrict: 'E',
  bindings: {
    transport:'<',
    onAction:'&',
    onActionTitle:'@',
    index:'<',
    showCreatedDate:'<',
    showLastEntry:'<'
  },
  template,
  controller
};

export default transportRowComponent;
