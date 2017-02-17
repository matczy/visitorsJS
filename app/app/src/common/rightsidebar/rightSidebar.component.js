import template from'./rightsidebar.html'
import controller from './rightSidebar.controller'

let rightSidebarComponent={
    restrict:'E',
    bindings:{
        persons:'<',
        vehicles:'<',
        items:'<',
        lastGateActionHistory:'<'
    },
    template,
    controller
};

export default rightSidebarComponent;