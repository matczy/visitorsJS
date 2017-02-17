import template from './vehicleDetails.html'
import controller from './vehicleDetails.controller'

let vehicleDetailsComponent={
    restrict:'E',
    bindings:{
        vehicle:'<',
        onEditAction:'&'
    },
    template,
    controller,
};

export default vehicleDetailsComponent;

