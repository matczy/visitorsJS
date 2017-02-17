class TransportsTableController {
    constructor(){
        this.selectedType = 'all';
    }


    $onInit(){
        this.currentObjects = angular.copy(this.transports);

    }

    $onChanges(){
        this.currentObjects = angular.copy(this.transports);
    }


    // filterData(){
    //     if(this.selectedType === 'all'){
    //         this.currentObjects = angular.copy(this.persons)
    //     }else if(this.selectedType === 'guests'){
    //         this.currentObjects = _.filter(this.persons, { 'type': 'GUEST' })
    //     }else{
    //         let insideWorker =  _.filter(this.persons, { 'type': 'INSIDE_WORKER' })
    //         let outsideWorker = _.filter(this.persons, { 'type': 'OUTSIDE_WORKER' })
    //         this.currentObjects = _.concat(insideWorker,outsideWorker)
    //     }
    // }
}

export default TransportsTableController;