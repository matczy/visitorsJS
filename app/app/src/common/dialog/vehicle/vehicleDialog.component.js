import template from './vehicleDialog.content.html';
import controller from './vehicleDialog.controller'



let vehicleDialogComponent = {
  template,
  bindings:{
    resolve: '<',
    close: '&',
    dismiss: '&'

  },
  controller,
  restrict: 'E'
};

export default vehicleDialogComponent;
