import template from './itemDetails.html'
import controller from './itemDetails.controller'

let itemDetailsComponent={
    restrict:'E',
    bindings:{
        item:'<',
        onEditAction:'&'
    },
    template,
    controller,
};

export default itemDetailsComponent;

