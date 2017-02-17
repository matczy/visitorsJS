import template from './detailsDialog.content.html';
import controller from './detailsDialog.controller'



let detailsDialogComponent = {
  template,
  bindings:{
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller,

  restrict: 'E'
};

export default detailsDialogComponent;
