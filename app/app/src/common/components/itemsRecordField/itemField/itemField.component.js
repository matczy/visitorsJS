import template from './itemField.html';

let component = {
  restrict: 'E',
  bindings: {
    item:'=',
    types:'<',
    findPrompt:'&',
    formName:'<',
    disabled:'<'
  },
  template,
};

export default component;
