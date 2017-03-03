import template from './historyDetails.html'
import controller from './historyDetails.controller'

let historyDetailsComponent={
    restrict:'E',
    bindings:{
        history:'<',
        title:'@',
        printVisitCard:'&'
    },
    template,
    controller,
};

export default historyDetailsComponent;

