import Person from '../../../common/components/model/person'

class GateAction {

    constructor(id = null, contactPerson=new Person(), visitCard = {startDate: new Date(),endDate: new Date().setHours(23,59,59,999)}, comment='', action, type) {
        this._id = id;
        this.action = {
            type: action,
            date: new Date().toISOString()
        };
        this.contactPerson = contactPerson && contactPerson._id?contactPerson:null;
        this.visitCard = visitCard && visitCard._id?visitCard:null;
        this.comment = comment;
        this.type=type;

    }


}
export default GateAction