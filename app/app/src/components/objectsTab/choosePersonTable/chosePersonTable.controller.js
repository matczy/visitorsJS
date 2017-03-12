class ChosePersonTableController {
    constructor(){
        "ngInject"

    }

    $onInit(){
        this.currentPersons = _.filter(this.persons, { 'type': 'INTERNAL_WORKER' });
    }


}

export default ChosePersonTableController;