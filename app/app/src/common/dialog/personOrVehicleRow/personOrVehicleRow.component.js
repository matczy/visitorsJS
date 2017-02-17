import template from './personOrVehicleRow.html';
import controller from './personOrVehicleRow.controller.js';

let personOrVehicleRowComponent = {
  restrict: 'E',
  bindings: {
    object:'<',
  },
  template,
  controller
};

export default personOrVehicleRowComponent;
