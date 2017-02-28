import template from './personRow.html';
import controller from './personRow.controller.js';

let personRowComponent = {
    restrict: 'E',
    bindings: {
        person: '<',
        onAction: '&',
        immediatelyExitAction: '&',
        showImmediatelyExitAction: '@',
        onActionTitle: '@',
        index: '<',
        showCreatedDate: '<',
        showLastEntry: '<'
    },
    template,
    controller
};

export default personRowComponent;