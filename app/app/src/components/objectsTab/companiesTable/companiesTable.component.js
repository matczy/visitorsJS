import template from './companiesTable.html'
import controller from './companiesTable.controller'

let companiesTableComponent={
    restrict:'E',
    bindings:{
        companies:'<',
        showDetails:'&'
    },
    template,
    controller,
};

export default companiesTableComponent;

