import template from './internalEquipmentDialog.content.html';
import controller from './internalEquipmentDialog.controller'



let internalEquipmentDialogComponent = {
  template,
  bindings:{
    resolve: '<',
    close: '&',
    dismiss: '&'

  },
  controller,
  restrict: 'E'
};

export default internalEquipmentDialogComponent;
