import template from './personEdit.html'
import controller from './personEdit.controller'

let personEditComponent={
    restrict:'E',
    bindings:{
        person:'<',
        exitEditMode:'&',
        onEditAction:'&',
        companies:'<'
    },
    template,
    controller,
};

export default personEditComponent;

