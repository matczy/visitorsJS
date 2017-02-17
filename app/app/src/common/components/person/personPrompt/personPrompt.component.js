import template from './personPrompt.html';
import controller from './personPrompt.controller.js';

let personPromptComponent = {
  restrict: 'E',
  bindings: {
    person:'<',
    onAction:'&',
    type:"<"
  },
  template,
  controller
};

export default personPromptComponent;
