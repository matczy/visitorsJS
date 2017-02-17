
class Item{
    
    constructor(id=null , name = '', code = '',type='') {

        this._id = id;
        this.name = name;
        this.code = code;
        this.type = type;
        this.createdDate = new Date();

    }
   

}
export default Item