import template from './chosePersonTable.html'
import controller from './chosePersonTable.controller'

let chosePersonTableComponent={
    restrict:'E',
    bindings:{
        persons:'<',
        chose:'&'
    },
    template,
    controller,
};

export default chosePersonTableComponent;

