import template from './internalEquipmentEdit.html'
import controller from './internalEquipmentEdit.controller'

let internalEquipmentEditComponent={
    restrict:'E',
    bindings:{
        item:'<',
        exitEditMode:'&',
        onEditAction:'&'
    },
    template,
    controller,
};

export default internalEquipmentEditComponent;

