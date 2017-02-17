import template from './dialog.content.html';
import controller from './dialog.controller'



let dialogComponent = {
  template,
  bindings:{
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller,

  restrict: 'E'
};

export default dialogComponent;
