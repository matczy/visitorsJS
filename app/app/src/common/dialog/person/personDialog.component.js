import template from './personDialog.content.html';
import controller from './personDialog.controller'



let personDialogComponent = {
  template,
  bindings:{
    resolve: '<',
    close: '&',
    dismiss: '&'

  },
  controller,

  restrict: 'E'
};

export default personDialogComponent;
