class PassengerListController {
    constructor() {
        "ngInject";

    };

    removeFromPassengersList(person) {
        for (var i = 0; i < this.passengers.length; i++) {
            if ((this.passengers[i].surnameAndName === person.surnameAndName) && (this.passengers[i].documentIdentifier === person.documentIdentifier) && (this.passengers[i].company.name === person.company.name)) {
                this.passengers.splice(i--, 1);
            }
        }
    }

}

export default PassengerListController;
