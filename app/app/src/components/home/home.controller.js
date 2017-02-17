class HomeController {
    constructor($rootScope, PersonService,VehicleService,TrailerService,CONST){
        "ngInject";

        this._$rootScope = $rootScope;
        this.CONST = CONST;
        this.PersonService = PersonService;
        this.VehicleService = VehicleService;
        this.TrailerService = TrailerService;
    }

    $onInit(){
        this.PersonService.loadPersons().then((data)=>{
            this.persons = data;
        });

        this.VehicleService.loadVehicles().then((data)=>{
            this.vehicles = data;
        });
        this.TrailerService.loadTrailers().then((data)=>{
            this.trailers = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_PERSONS, (event, data)=> {
            this.persons = data;
        });

        this._$rootScope.$on(this.CONST.REFRESH_VEHICLES, (event, data)=> {
            this.vehicles = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_TRAILERS, (event, data)=> {
            this.trailers = data;
        });
    }

}

export default HomeController;