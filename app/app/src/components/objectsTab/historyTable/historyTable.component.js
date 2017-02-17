import template from './historyTable.html'
import controller from './historyTable.controller'

let historiesTableComponent={
    restrict:'E',
    bindings:{
        history:'<',
        showDetails:'&'
    },
    template,
    controller,
};

export default historiesTableComponent;

