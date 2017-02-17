import template from './transportDetails.html'
import controller from './transportDetails.controller'

let transportDetailsComponent={
    restrict:'E',
    bindings:{
        transport:'<',
        onEditAction:'&'
    },
    template,
    controller,
};

export default transportDetailsComponent;

