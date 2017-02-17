
class VehicleToPerson{
    
    constructor(id = null, vehicleId = '', personId='', count = 0) {
        this._id = id ;
        this._vehicleId = vehicleId;
        this._personId = personId;
        this._count = count;

    }
    get id(){
        return this._id;
    }

    set id(id){
        this._id = id;
    }

    get vehicleId(){
        return this._vehicleId;
    }

    set vehicleId(vehicleId){
        this._vehicleId = vehicleId;
    }
    
    get personId(){
        return this._personId;
    }

    set personId(personId){
        this._personId = personId;
    }


    get count(){
        return this._count;
    }

    set count(count){
        this._count = count;
    }
}
export default VehicleToPerson