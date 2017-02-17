import template from './onObjectTable.html'
import controller from './onObjectTable.controller'

let onObjectTableTableComponent={
    restrict:'E',
    bindings:{
        persons:'<',
        vehicles:'<',
        trailers:'<',
    },
    template,
    controller,
};

export default onObjectTableTableComponent;

