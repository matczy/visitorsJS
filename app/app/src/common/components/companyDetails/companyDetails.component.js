import template from './companyDetails.html'
import controller from './companyDetails.controller'

let companyDetailsComponent={
    restrict:'E',
    bindings:{
        company:'<',
        workers:'<',
        onEditAction:'&'
    },
    template,
    controller,
};

export default companyDetailsComponent;

