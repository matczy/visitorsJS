import template from './transportsTable.html'
import controller from './transportsTable.controller'

let transportsTableComponent={
    restrict:'E',
    bindings:{
       transports:'<',
        showDetails:'&'
    },
    template,
    controller,
};

export default transportsTableComponent;

