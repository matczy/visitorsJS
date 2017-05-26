class PersonsTableController {
    constructor(DialogService,PersonService,$rootScope,CONST){
        "ngInject"
        this.DialogService= DialogService;
        this.PersonService=PersonService;
        this._$rootScope = $rootScope;
        this.CONST = CONST;
        this.selectedType = 'all';
        this.searchText= '';
        this.currentPersons = [];
    }


    $onInit(){
            if (this.searchText) {
                let data = angular.copy(this.persons);

                let searchWords = this.searchText.split(" ");
                this.currentPersons = _.filter(data, (elem) => {

                    for (let word of searchWords) {
                        let result = this.filter(elem,word);
                        if (result === false) {
                            return false;
                        }
                    }
                    return true;
                })
                this.currentPersons = this.currentPersons.slice(0,100);

            }
            else{
                this.currentPersons = [];
            }
    }

    $onChanges(){
        if (this.searchText) {
            let data = angular.copy(this.persons);
            let searchWords = this.searchText.split(" ");
            this.currentPersons = _.filter(data, (elem) => {

                for (let word of searchWords) {
                    let result = this.filter(elem,word);
                    if (result === false) {
                        return false;
                    }
                }
                return true;
            })
            this.currentPersons = this.currentPersons.slice(0,100);
        }else{
            this.currentPersons = [];
        }
        this.selectedType = 'all';

    }


    filterData(){
        let data =[]
        if(this.selectedType === 'all'){
            data = angular.copy(this.persons)
        }else if(this.selectedType === 'guests'){
            data = _.filter(this.persons, { 'type': 'GUEST' })
        }else if(this.selectedType ==='blackList'){
            data = _.filter(this.persons, { 'isOnBlackList': true })
        }
        else{
            let insideWorker =  _.filter(this.persons, { 'type': 'INTERNAL_WORKER' });
            let outsideWorker = _.filter(this.persons, { 'type': 'EXTERNAL_WORKER' });
            data = _.concat(insideWorker,outsideWorker)
        }


            if (this.searchText) {
                let searchWords = this.searchText.split(" ");
                this.currentPersons = _.filter(data, (elem) => {

                    for (let word of searchWords) {
                        let result = this.filter(elem,word);
                        if (result === false) {
                            return false;
                        }
                    }
                    return true;
                });
                this.currentPersons = this.currentPersons.slice(0,100);

            }else{
                this.currentPersons = [];
            }
            console.log(this.currentPersons.length)
    }



    filter(elem, word) {
        let result = false;
        if(elem){
            for (let [key,value] of Object.entries(elem)) {
                if(elem.hasOwnProperty(key) && key !=='usedBy'){
                    if( typeof value ==='object'){
                        result = this.filter(value, word);
                        if(result===true){
                            break;
                        }
                    }else{
                        if(!!value && typeof value === 'string' && value.toLowerCase().includes(word.toLowerCase())){
                            result = true;
                            break;
                        }
                    }
                }

            }
        }


        return result;
    }


    openCreatePersonDialog(){
        this.DialogService.createUpdatePerson().then((data)=>{
             this.PersonService.getOrCreate(data);
             this._$rootScope.$emit(this.CONST.REFRESH_PERSONS);
        });
    }
}

export default PersonsTableController;