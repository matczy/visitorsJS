import template from './chooseInstruction.html';
import controller from './chooseInstruction.controller.js';

let chooseInstructionComponent = {
  restrict: 'E',
  bindings: {
    onClick:"&",
    color:'@',
    title:'@'
  },
  template,
  controller
};

export default chooseInstructionComponent;
