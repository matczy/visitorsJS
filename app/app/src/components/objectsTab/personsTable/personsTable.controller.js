class PersonsTableController {
    constructor(DialogService,PersonService,$rootScope,CONST){
        "ngInject"
        this.DialogService= DialogService;
        this.PersonService=PersonService;
        this._$rootScope = $rootScope;
        this.CONST = CONST;
        this.selectedType = 'all';
    }


    $onInit(){
        this.currentPersons = angular.copy(this.persons);

    }

    $onChanges(){
        this.currentPersons = angular.copy(this.persons);
        this.selectedType = 'all';
    }


    filterData(){
        if(this.selectedType === 'all'){
            this.currentPersons = angular.copy(this.persons)
        }else if(this.selectedType === 'guests'){
            this.currentPersons = _.filter(this.persons, { 'type': 'GUEST' })
        }else if(this.selectedType ==='blackList'){
            this.currentPersons = _.filter(this.persons, { 'isOnBlackList': true })
        }
        else{
            let insideWorker =  _.filter(this.persons, { 'type': 'INTERNAL_WORKER' });
            let outsideWorker = _.filter(this.persons, { 'type': 'EXTERNAL_WORKER' });
            this.currentPersons = _.concat(insideWorker,outsideWorker)
        }
    }

    openCreatePersonDialog(){
        this.DialogService.createUpdatePerson().then((data)=>{
             this.PersonService.getOrCreate(data);
             this._$rootScope.$emit(this.CONST.REFRESH_PERSONS);
        });
    }
}

export default PersonsTableController;