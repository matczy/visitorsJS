class OnObjectTableController {
    constructor($rootScope, CONST, PersonService, VehicleService, TrailerService, $q) {
        "ngInject"
        this.selectedType = 'all';
        this.$rootScope = $rootScope;
        this.CONST = CONST;
        this.PersonService = PersonService;
        this.VehicleService = VehicleService;
        this.TrailerService = TrailerService;
        this.$q = $q;

    }

    $onInit(){
        let personsOnObject = _.filter(this.persons, {'isOnObject': true});
        let vehiclesOnObject = _.filter(this.vehicles, {'isOnObject': true});
        let trailersOnObject = _.filter(this.trailers, {'isOnObject': true});

        this.objects = _.concat(personsOnObject, vehiclesOnObject, trailersOnObject);
        this.currentObjects = angular.copy(this.objects);
    }

    $onChanges(changes) {

        let personsOnObject = _.filter(this.persons, {'isOnObject': true});
        let vehiclesOnObject = _.filter(this.vehicles, {'isOnObject': true});
        let trailersOnObject = _.filter(this.trailers, {'isOnObject': true});
        this.objects = _.concat(personsOnObject, vehiclesOnObject, trailersOnObject);
        this.currentObjects = angular.copy(this.objects);
    }


    filterData() {
        if (this.selectedType === 'all') {
            this.currentObjects = this.objects
        } else if (this.selectedType === 'persons') {
            this.currentObjects = _.filter(this.persons, {'isOnObject': true})
        } else {
            let vehiclesOnObject = _.filter(this.vehicles, {'isOnObject': true});
            let trailersOnObject = _.filter(this.trailers, {'isOnObject': true});
            this.currentObjects = _.concat(vehiclesOnObject, trailersOnObject);
        }
    }
}

export default OnObjectTableController;