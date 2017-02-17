import template from './toManyResultsDialog.content.html';
import controller from './toManyResultsDialog.controller.js'

let toManyResultsDialogComponent = {
  template,
  bindings:{
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller,

  restrict: 'E'
};

export default toManyResultsDialogComponent;
