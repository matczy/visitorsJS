
class Item{
    
    constructor(id=null , name = '', code = '',type='', isInternal=false) {

        this._id = id;
        this.name = name;
        this.code = code;
        this.type = type;
        this.isInternal = isInternal;
        this.createdDate = new Date();

    }
   

}
export default Item