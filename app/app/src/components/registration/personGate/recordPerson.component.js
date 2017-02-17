import template from './recordPerson.html';
import controller from './recordPerson.controller.js';

let recordPersonComponent = {
  restrict: 'E',

  bindings: {
    persons:'<',
    companies:'<',
    items:'<',
  },
  template,
  controller
};

export default recordPersonComponent;
