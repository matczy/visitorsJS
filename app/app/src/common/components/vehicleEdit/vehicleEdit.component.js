import template from './vehicleEdit.html'
import controller from './vehicleEdit.controller'

let vehicleEditComponent={
    restrict:'E',
    bindings:{
        vehicle:'<',
        exitEditMode:'&',
        onEditAction:'&'
    },
    template,
    controller,
};

export default vehicleEditComponent;

