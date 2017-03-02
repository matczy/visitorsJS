import DialogController from'../dialog.controller'

class PersonDialogController extends DialogController{
    constructor(PersonService) {
        "ngInject";
        super();
        this.PersonService = PersonService;
    }


    $onInit() {
        this.title = this.resolve.title;
        this.errorMessage = ""
    }


    ok(data) {
        console.log(data)
        this.PersonService.findByNameAndIdentyfier(data.surnameAndName, data.documentIdentifier).then(foundedPerson=>{
            this.errorMessage = "Osoba o podanych danych Nazwisko imię , identyfikator znajduje się już w bazie danych"
        }).catch(error=>{
            if(error.message==="NOT_FOUND_PERSON"){
                this.close({$value: data});
            }else{
                this.errorMessage = "Wystąpił nieznany błąd";
            }
        })

    };



}

export default PersonDialogController;
