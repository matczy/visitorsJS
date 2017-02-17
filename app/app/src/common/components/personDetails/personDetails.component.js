import template from './personDetails.html'
import controller from './personDetails.controller'

let personDetailsComponent={
    restrict:'E',
    bindings:{
        person:'<',
        onEditAction:'&'
    },
    template,
    controller,
};

export default personDetailsComponent;

