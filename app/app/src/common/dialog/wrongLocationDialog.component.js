import template from './wrongLocationDialog.content.html';
import controller from './dialog.controller'

let wrongLocationDialogComponent = {
  template,
  bindings:{
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller,

  restrict: 'E'
};

export default wrongLocationDialogComponent;
