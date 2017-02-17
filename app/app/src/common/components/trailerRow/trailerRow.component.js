import template from './trailerRow.html';
import controller from './trailerRow.controller.js';

let trailerRowComponent = {
  restrict: 'E',
  bindings: {
    trailer:'<',
    onAction:'&',
    onActionTitle:'@',
    index:'<',
    showCreatedDate:'<',
    showLastEntry:'<'

  },
  template,
  controller
};

export default trailerRowComponent;
