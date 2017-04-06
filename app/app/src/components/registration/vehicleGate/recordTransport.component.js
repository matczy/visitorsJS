import template from './recordTransport.html';
import controller from './recordTransport.controller.js';
 // import './registration.styl';

let registrationComponent = {
  restrict: 'E',

  bindings: {
    persons:'<',
    vehicles:'<',
    trailers:'<',
    companies:'<',
    items:'<',
  },
  template,
  controller
};

export default registrationComponent;
