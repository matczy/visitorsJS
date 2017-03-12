import template from './chosePersonRow.html';
import controller from './chosePersonRow.controller.js';

let chosePersonRowComponent = {
    restrict: 'E',
    bindings: {
        person: '<',
        onAction: '&',
        immediatelyExitAction: '&',
        showImmediatelyExitAction: '@',
        onActionTitle: '@',
        index: '<',

    },
    template,
    controller
};

export default chosePersonRowComponent;
