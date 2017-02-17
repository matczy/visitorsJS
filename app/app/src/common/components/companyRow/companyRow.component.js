import template from './companyRow.html';
import controller from './companyRow.controller.js';

let companyRowComponent = {
  restrict: 'E',
  bindings: {
    company:'<',
    onAction:'&',
    onActionTitle:'@',
    index:'<',
    showCreatedDate:'<',
  },
  template,
  controller
};

export default companyRowComponent;
