import template from './itemEdit.html'
import controller from './itemEdit.controller'

let itemEditComponent={
    restrict:'E',
    bindings:{
        item:'<',
        exitEditMode:'&',
        onEditAction:'&'
    },
    template,
    controller,
};

export default itemEditComponent;

