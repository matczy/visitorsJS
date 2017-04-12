import GateAction from '../../../common/components/model/gateAction'


class RecordPersonService {
    constructor(GateActionService, PersonService, PouchdbService, CompanyService, RecordPersonValidator, $q, ItemService) {
        "ngInject";
        this.$q = $q;
        this.PersonService = PersonService;
        this.CompanyService = CompanyService;
        this.RecordPersonValidator = RecordPersonValidator;
        this.PouchdbService = PouchdbService;
        this.GateActionService = GateActionService;
        this.ItemService = ItemService;
    }


    recordEntry(person, contactPerson, visitCard, items, comment) {
        return this._tryRecord(person, contactPerson, visitCard, items, comment, 'Entry');
    }

    recordExit(person, contactPerson, visitCard, items, comment) {
        return this._tryRecord(person, contactPerson, visitCard, items, comment, 'Exit')
    }

    _tryRecord(person, contactPerson, visitCard, items, comment, action) {
        console.log('recordPErson service')
        console.log(person)
        let entryElems = [this.PersonService.getOrCreate(person)].concat(this._getItemsPromises(items));
        return this.$q.all(entryElems)
            .then((results)=> {
            console.log(results[0])
                let returnedPerson = results[0];
                let returnedItems = this._getItems(results);

                return this._trySaveRecordAction(returnedPerson, contactPerson, visitCard, returnedItems, comment, action);
            })
            .then(resultFromTryRecordAction=> {
                this._updatePerson(resultFromTryRecordAction.person, action);
                this._updateItems(resultFromTryRecordAction.items, resultFromTryRecordAction.person, action);

                return resultFromTryRecordAction;
            });
    }


    _trySaveRecordAction(person, contactPerson, visitCard, items, comment, action) {
        if (this.RecordPersonValidator.checkPersonIsOnCorrecSite(person, action)) {
            let gateAction = new GateAction('gateAction' + action + 'PersonGate' + '-' + new Date().toISOString(), contactPerson, visitCard, comment, action, 'personGate');
            gateAction.person = person;
            gateAction.items = items;

            return this.GateActionService.saveGateAction(gateAction);
        }
        return this.$q.reject({message: 'WRONG_LOCATION', data: [person]})
    }

    _getItemsPromises(items) {
        let result = [];
        items.forEach((item)=> {
            result.push(this.ItemService.getOrCreate(item))
        });
        return result;
    }

    _getItems(results){
        return  _.filter(results,(result=>{
            return result._id.indexOf('items')!==-1;
        }));
    }

    _updatePerson(person, action) {
        if (action === 'Entry') {
            person.isOnObject = true;
            person.lastEntry = new Date();
        } else {
            person.isOnObject = false;
            person.lastExit = new Date();
        }
        this.PersonService.putPerson(person);
    }

    _updateItems(items, person, action) {
        items.forEach((item)=> {
            if (!item.usedBy) {
                item.usedBy = [{person: person, action: action, date: new Date()}];
            } else {
                item.usedBy.push({person: person, action: action, date: new Date()})
            }
            this.ItemService.putItem(item);
        });
    }

    changeLocationPerson(objects, isOnObject) {
        let person = objects[0];
        person.isOnObject = isOnObject;
        return this.PouchdbService.addDocument(person).then((result)=>{
           return this.PersonService.getPerson(result.id);
        });
    }

}

export default RecordPersonService;





