import template from './historyRow.html';
import controller from './historyRow.controller.js';

let historyRowComponent = {
  restrict: 'E',
  bindings: {
    history:'<',
    onAction:'&',
    onActionTitle:'@',
    index:'<',
    showCreatedDate:'<',
    showLastEntry:'<'
  },
  template,
  controller
};

export default historyRowComponent;
