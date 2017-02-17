import DialogController from'../dialog.controller'

class VehicleDialogController extends DialogController{
    constructor(VehicleService,TrailerService) {
        "ngInject";
        super();
        this.VehicleService = VehicleService;
        this.TrailerService = TrailerService;
    }

    $onInit() {
        this.title = this.resolve.title;
        this.errorMessage = ""
    }

    ok(data) {
        if(data.type==="VEHICLE"){
            this.VehicleService.findByRegistration(data.registration).then(()=>{
                this.errorMessage = "Pojazd o podanej rejestracji znajduje się już w bazie danych"
            }).catch(error=>{
                if(error.message==="NOT_FOUND_VEHICLE"){
                    this.close({$value: data});
                }else{
                    this.errorMessage = "Wystąpił nieznany błąd";
                }
            })
        }else{
            this.TrailerService.findByRegistration(data.registration).then(()=>{
                this.errorMessage = "Pojazd o podanej rejestracji znajduje się już w bazie danych"
            }).catch(error=>{
                if(error.message==="NOT_FOUND_VEHICLE"){
                    this.close({$value: data});
                }else{
                    this.errorMessage = "Wystąpił nieznany błąd";
                }
            })
        }


    };


    cancel() {
        this.dismiss({$value: 'cancel'});
    };

}

export default VehicleDialogController;
