import template from './passengerList.html';
import controller from './passengerList.controller.js';

let passengerListComponent = {
  restrict: 'E',
  bindings: {
    passengers:'<',
    disabled:'<'
  },
  template,
  controller
};

export default passengerListComponent;
