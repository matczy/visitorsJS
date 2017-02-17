import template from './personsTable.html'
import controller from './personsTable.controller'

let personsTableComponent={
    restrict:'E',
    bindings:{
        persons:'<',
        showDetails:'&'
    },
    template,
    controller,
};

export default personsTableComponent;

