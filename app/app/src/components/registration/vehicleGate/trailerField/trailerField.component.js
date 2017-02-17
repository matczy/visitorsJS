import template from './trailerField.html';
import controller from './trailerField.controller.js';

let trailerFieldComponent = {
  restrict: 'E',
  bindings: {
    trailerRegistration:'=',
    trailers:'<',
    disabled:'<',
      formName:'<'

  },
  template,
  controller
};

export default trailerFieldComponent;
