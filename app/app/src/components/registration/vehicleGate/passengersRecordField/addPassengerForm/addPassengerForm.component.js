import template from './addPassengerForm.html';
import controller from'./addPassengerForm.controller'
let addPassengerFormComponent = {
  restrict: 'E',
  bindings: {
    person:'<',
    onAdd:'&',
    onCancel:'&',
    findPrompt:'&'
  },
  template,
  controller
};

export default addPassengerFormComponent;
