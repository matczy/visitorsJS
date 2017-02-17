class VehiclesTableController {
    constructor(DialogService,VehicleService,TrailerService, $rootScope,CONST){
        "ngInject"
        this.DialogService = DialogService;
        this.VehicleService = VehicleService;
        this.TrailerService = TrailerService;
        this._$rootScope = $rootScope;
        this.CONST = CONST;
        this.selectedType = 'all';
    }


    $onInit(){
        if(this.vehicles &&this.trailers){
            this.currentVehicles =_.concat(angular.copy(this.vehicles),angular.copy(this.trailers));
        }

    }

    $onChanges(){
        if(this.vehicles &&this.trailers){
            this.currentVehicles =_.concat(angular.copy(this.vehicles),angular.copy(this.trailers));
            this.selectedType = 'all';
        }
    }


    filterData(){
        if(this.selectedType === 'all'){
            this.currentVehicles =_.concat(angular.copy(this.vehicles),angular.copy(this.trailers));
        }else if(this.selectedType === 'vehicles'){
            this.currentVehicles  = angular.copy(this.vehicles)
        }else{
            this.currentVehicles  = angular.copy(this.trailers)

        }
    }

    isVehicle(elem){
        if(elem){
            return elem._id.indexOf('vehicles')!==-1
        }
    }
    isTrailer(elem){
        if(elem){
            return elem._id.indexOf('trailers')!==-1
        }
    }

    openCreateVehicleDialog(){
        this.DialogService.createUpdateVehicle().then((data)=>{
            if(data.type==='VEHICLE'){
                this.VehicleService.create(data);
            }else{
                this.TrailerService.create(data);

            }
            this._$rootScope.$emit(this.CONST.REFRESH_VEHICLES);
        });
    }

}

export default VehiclesTableController;