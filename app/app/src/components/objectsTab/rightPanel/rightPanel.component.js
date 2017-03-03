import template from './rightPanel.html'
import controller from './rightPanel.controller'

let rightPanelComponent={
    restrict:'E',
    bindings:{
        object:'<',
        isEditedMode:'=',
        persons:'<',
        companies:'<',
    },
    template,
    controller,
};

export default rightPanelComponent;

