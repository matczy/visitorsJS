import template from './companyEdit.html'
import controller from './companyEdit.controller'

let companyEditComponent={
    restrict:'E',
    bindings:{
        company:'<',
        exitEditMode:'&',
        onEditAction:'&',
        companies:'<'

    },
    template,
    controller,
};

export default companyEditComponent;

