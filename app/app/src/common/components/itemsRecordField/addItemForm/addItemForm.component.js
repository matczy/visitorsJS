import template from './addItemForm.html';
let addItemFormComponent = {
  restrict: 'E',
  bindings: {
    item:'<',
    types:'<',
    onAdd:'&',
    onCancel:'&',
    findPrompt:'&',
  },
  template,
};

export default addItemFormComponent;
