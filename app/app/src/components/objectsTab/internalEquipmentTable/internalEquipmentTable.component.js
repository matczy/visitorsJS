import template from './internalEquipmentTable.html'
import controller from './internalEquipmentTable.controller'

let internalEquipmentTableComponent={
    restrict:'E',
    bindings:{
        equipments:'<',
        showDetails:'&'
    },
    template,
    controller,
};

export default internalEquipmentTableComponent;

