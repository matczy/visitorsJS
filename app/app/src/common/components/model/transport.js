import Person from '../../../common/components/model/person'
import Vehicle from '../../../common/components/model/vehicle'

class Transport {

    constructor(id = null, driver=new Person(), vehicle=new Vehicle(), trailer=new Vehicle(), passengers = [], items=[]) {
        this._id = id;
        this.driver = driver;
        this.vehicle = vehicle;
        this.trailer = trailer;
        this.passengers = passengers;
        this.items = items;
        this.createdDate = new Date();
    }


}
export default Transport