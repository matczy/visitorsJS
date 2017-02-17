
class Vehicle{
    
    constructor(id = null, registration = '') {
        this._id = id;

        this.registration = registration;
        this.createdDate = new Date();
    }

}
export default Vehicle