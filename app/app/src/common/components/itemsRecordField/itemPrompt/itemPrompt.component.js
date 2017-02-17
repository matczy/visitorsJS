import template from './itemPrompt.html';

let itemPromptComponent = {
  restrict: 'E',
  bindings: {
    item:'<',
    onAction:'&',
  },
  template,
};

export default itemPromptComponent;
