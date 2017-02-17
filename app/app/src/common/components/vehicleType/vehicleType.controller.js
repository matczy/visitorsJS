
class VehicleTypeController {
    constructor() {
        "ngInject";
        this.name="";
        this.class="";
    }


    $onInit(){
        if(this.type.indexOf('vehicles')!==-1){
            this.name='Pojazd';
            this.class="label-default";
        }else {
            this.name='Naczepa';
            this.class="label-info";
        }


    }
}

export default VehicleTypeController;
