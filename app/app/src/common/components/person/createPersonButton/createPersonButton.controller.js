class CreatePersonButtonController {
    constructor(DialogService, PersonService, MessageService) {
        "ngInject";

        this.DialogService = DialogService;
        this.PersonService = PersonService;
        this.MessageService = MessageService;
    }

    showModal() {
        this.DialogService.createUpdatePerson().then((person)=> {
            this.PersonService.getOrCreate(person).then((response)=> {
                this.MessageService.showInfoMessage("Poprawne utworzenie osoby: " + response.surnameAndName);
            }).catch((error)=> {
                this.MessageService.showErrorMessage("Wystąpił błąd podczas zapisu: " + error);
            })
        })
    }

}

export default CreatePersonButtonController;
