import template from './internalEquipmentDetails.html'
import controller from './internalEquipmentDetails.controller'

let internalEquipmentDetailsComponent={
    restrict:'E',
    bindings:{
        item:'<',
        onEditAction:'&',
        persons:'<'
    },
    template,
    controller,
};

export default internalEquipmentDetailsComponent;

