import Person from '../../../../common/components/model/person'
class PassengersRecordFieldController {
    constructor($rootScope,$scope, CONST) {
        "ngInject";
        this.CONST = CONST;
        this._$rootScope = $rootScope;
        this.$scope = $scope;
    };


    $onInit() {
        this.newPerson = new Person();
        this.currentPassengers = angular.copy(this.passengers);
        this.addPassenger = {};

        this._$rootScope.$on(this.CONST.CHOOSE_PASSENGER_PROMPT, (event, data)=> {
            this.newPerson = angular.copy(data.person);
        });

        this.$scope.$on('recognizationPassengerBySurnameAndName',(event,data)=> {
            this.newPerson=data;
            this.sendSurnameAndNameChangeEvent(data.surnameAndName)
        });
        this.$scope.$on('recognizationPassenger',(event,data)=> {
            this.newPerson=data;
        });
    }

    $onChanges(){
        if(!this.passengers.length){
            this.currentPassengers = angular.copy(this.passengers);
        }
    }

    editPassengersList() {
        this.isActive = true;
    }

    addPersonToList(data) {
        console.log(data)
        this.currentPassengers.push(data.person);
        this.newPerson = new Person();
        data.form.$setDirty();
        data.form.$setPristine();
        data.form.$setUntouched();
    }

    cancelAddPersonToList() {
        this.isActive = false;
        this.newPerson = new Person();
        this.onClose({passengers: this.currentPassengers});
        this._$rootScope.$emit(this.CONST.HISTORY_TAB);

    }




    sendSurnameAndNameChangeEvent(surnameAndName) {
        if(surnameAndName){
            this._$rootScope.$emit(this.CONST.FIND_PASSENGER_PROMPT, surnameAndName.toLowerCase())
        }
    }
}

export default PassengersRecordFieldController;
