import template from './registrationVehicleField.html';
import controller from './registrationVehicleField.controller.js';

let registrationVehicleFieldComponent = {
  restrict: 'E',
  bindings: {
    vehicleRegistration:'=',
    vehicles:'<',
    disabled:'<',
    formName:'<'
  },
  template,
  controller
};

export default registrationVehicleFieldComponent;
