import template from './vehicleType.html';
import controller from './vehicleType.controller.js';

let vehicleTypeComponent = {
  restrict: 'E',
  bindings: {
    type:'<',
  },
  template,
  controller
};

export default vehicleTypeComponent;
