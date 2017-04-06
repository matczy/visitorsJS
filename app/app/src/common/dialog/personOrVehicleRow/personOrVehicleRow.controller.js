
class PersonOrVehicleController {
    constructor() {
        "ngInject";

    }

    isPerson(){
       return this.object._id.indexOf('persons')!==-1
    }
    isVehicle(){
        return this.object._id.indexOf('vehicles')!==-1
    }
    isTrailer(){
        return this.object._id.indexOf('trailers')!==-1
    }
}

export default PersonOrVehicleController;
