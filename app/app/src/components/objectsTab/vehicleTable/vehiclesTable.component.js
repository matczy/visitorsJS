import template from './vehiclesTable.html'
import controller from './vehiclesTable.controller'

let vehiclesTableComponent={
    restrict:'E',
    bindings:{
        vehicles:'<',
        trailers:'<',
        showDetails:'&'
    },
    template,
    controller,
};

export default vehiclesTableComponent;

