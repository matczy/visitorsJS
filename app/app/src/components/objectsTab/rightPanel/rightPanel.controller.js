class RightPanelController {
    constructor(PersonService, VehicleService,TrailerService,ItemService,CompanyService,MessageService,$rootScope,CONST,PrinterService){
        "ngInject"
        this._$rootScope = $rootScope;
        this.CONST =CONST;
        this.PersonService = PersonService;
        this.VehicleService = VehicleService;
        this.TrailerService = TrailerService;
        this.ItemService = ItemService;
        this.CompanyService = CompanyService;
        this.MessageService = MessageService;
        this.PrinterService = PrinterService;
    }

    $onChanges(changes){
        if(changes.object && changes.object.currentValue._id && changes.object.currentValue._id.indexOf('company')!==-1){
            this.workers = _.filter(this.persons,(person)=>{return person.company.name === changes.object.currentValue.name});
        }
    }

    isPersonObject() {
        if (this.object._id) {
            return this.object._id.indexOf('persons') !== -1;
        } else {
            return false;
        }
    }

    isVehicleObject() {
        if (this.object._id) {
            return (this.object._id.indexOf('vehicles') !== -1)||this.object._id.indexOf('trailers') !== -1;
        } else {
            return false;
        }
    }

    isCompanyObject() {
        if (this.object._id) {
            return this.object._id.indexOf('company') !== -1;
        } else {
            return false;
        }
    }


    isItemObject() {
        if (this.object._id) {
            return ((this.object._id.indexOf('items') !== -1 )&& (this.object.isInternal == false));
        } else {
            return false;
        }
    }

    isInternalEquipmentObject() {
        if (this.object._id) {
            return ((this.object._id.indexOf('items') !== -1) && (this.object.isInternal == true));
        } else {
            return false;
        }
    }

    isTransportObject() {
        if (this.object._id) {
            return this.object._id.indexOf('transport') !== -1;
        } else {
            return false;
        }
    }

    isHistoryObject() {
        if (this.object._id) {
            return this.object._id.indexOf('gateAction') !== -1;
        } else {
            return false;
        }
    }

    goToEditMode(){
        this.isEditedMode = true;
    }
    exitEditMode(){
        this.isEditedMode=false;
    }

    editedPerson(person){
        this.PersonService.putPerson(person).then((result)=>{
            // this._$rootScope.$broadcast(this.CONST.REFRESH_PERSONS);
            this.MessageService.showInfoMessage('Poprawnie zaktualizowano osobę');
            this.isEditedMode=false;
        });
    }

    editedItem(item){
        this.ItemService.putItem(item).then((result)=>{
            // this._$rootScope.$broadcast(this.CONST.REFRESH_ITEMS);
            this.MessageService.showInfoMessage('Poprawnie zaktualizowano przedmiot');
            this.isEditedMode=false;
        });
    }

    editedCompany(company){
        this.CompanyService.putCompany(company).then((result)=>{

            this._updatePersonsForCompany(company);
            // this._$rootScope.$broadcast(this.CONST.REFRESH_COMPANY);
            this.MessageService.showInfoMessage('Poprawnie zaktualizowano firmę');
            this.isEditedMode=false;
        });
    }

    _updatePersonsForCompany(company){
        let filteredPersons = _.filter(this.persons,(person)=>{
            return person.company._id ===company._id;
        });

        _.forEach(filteredPersons, (person)=>{
            person.company = company;
        });

        this.PersonService.putPersons(filteredPersons);

    }

    editedVehicle(vehicle){
        if (this.vehicle._id.indexOf('vehicles') !== -1) {
            this.VehicleService.putVehicle(vehicle).then((result)=>{
                // this._$rootScope.$broadcast(this.CONST.REFRESH_VEHICLES);
                this.MessageService.showInfoMessage('Poprawnie zaktualizowano pojazd');
                this.isEditedMode=false;
            });
        } else {
            this.TrailerService.putTrailer(vehicle).then((result)=>{
                // this._$rootScope.$broadcast(this.CONST.REFRESH_VEHICLES);
                this.MessageService.showInfoMessage('Poprawnie zaktualizowano naczepę');
                this.isEditedMode=false;
            });
        }

    }

    printVisitCard(object){
        if(object.type==="personGate"){
            this.PrinterService.print(object.person,object.contactPerson)
        }else{
            object.transport.passengers.forEach((passenger)=>{
                this.PrinterService.print(passenger,object.contactPerson)
            })
        }
    }

}

export default RightPanelController;