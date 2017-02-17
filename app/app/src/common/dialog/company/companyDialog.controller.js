import DialogController from'../dialog.controller'
class CompanyDialogController extends DialogController{
    constructor(CompanyService,) {
        "ngInject";
        super();
        this.CompanyService = CompanyService;
    }

    $onInit(){
        this.title = this.resolve.title;
        this.errorMessage=""
    }

    ok(data) {
        console.log(data);
            this.CompanyService.findByName(data.name).then(()=>{
                this.errorMessage = "Firma o podanej nazwie znajduje się już w bazie danych"
            }).catch(error=>{
                if(error.message==="NOT_FOUND_COMPANY"){
                    this.close({$value: data});
                }else{
                    this.errorMessage = "Wystąpił nieznany błąd";
                }
            })



    };


    cancel() {
        this.dismiss({$value: 'cancel'});
    };

}

export default CompanyDialogController;
