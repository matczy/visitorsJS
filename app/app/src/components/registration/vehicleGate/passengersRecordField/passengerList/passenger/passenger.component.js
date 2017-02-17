import template from './passenger.html';
import controller from './passenger.controller.js';

let passengerComponent = {
  restrict: 'E',
  bindings: {
    person:'<',
    remove:'&',
    disabled:'<'
  },
  template,
  controller
};

export default passengerComponent;
