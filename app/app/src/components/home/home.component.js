import template from './home.html'
import controller from './home.controller.js'

let homeComponent={
    restrict:'E',
    bindings:{
        // persons:'<',
        // vehicles:'<',
        // trailers:'<'
    },
    template,
    controller,
};

export default homeComponent;

