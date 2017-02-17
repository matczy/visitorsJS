import template from './itemDialog.content.html';
import controller from './itemDialog.controller'



let itemDialogComponent = {
  template,
  bindings:{
    resolve: '<',
    close: '&',
    dismiss: '&'

  },
  controller,
  restrict: 'E'
};

export default itemDialogComponent;
