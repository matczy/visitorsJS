import template from './vehicleRow.html';
import controller from './vehicleRow.controller.js';

let vehicleRowComponent = {
  restrict: 'E',
  bindings: {
    vehicle:'<',
    onAction:'&',
    onActionTitle:'@',
    index:'<',
    showCreatedDate:'<',
    showLastEntry:'<'

  },
  template,
  controller
};

export default vehicleRowComponent;
