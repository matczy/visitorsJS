import template from './registrationHistory.html';
import controller from './registrationHistory.controller.js';

let registrationHistoryComponent = {
  restrict: 'E',
  bindings: {
    gateAction:'<'
  },
  template,
  controller
};

export default registrationHistoryComponent;
