import template from './itemsTable.html'
import controller from './itemsTable.controller'

let itemsTableComponent={
    restrict:'E',
    bindings:{
        items:'<',
        showDetails:'&'
    },
    template,
    controller,
};

export default itemsTableComponent;

