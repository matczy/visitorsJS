import Company from './company'
class Person{
    
    constructor(id=null , surnameAndName = '', company = new Company(), documentIdentifier='',phone='', type='GUEST') {

        this._id = id;
        this.surnameAndName = surnameAndName;
        this.company = company;
        this.documentIdentifier = documentIdentifier;
        this.phone = phone;

        this.type = type;
        this.createdDate = new Date();

    }
   

}
export default Person