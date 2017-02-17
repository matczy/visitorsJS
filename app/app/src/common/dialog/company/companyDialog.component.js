import template from './companyDialog.content.html';
import controller from './companyDialog.controller'



let companyDialogComponent = {
  template,
  bindings:{
    resolve: '<',
    close: '&',
    dismiss: '&'

  },
  controller,
  restrict: 'E'
};

export default companyDialogComponent;
