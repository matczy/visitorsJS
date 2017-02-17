import DialogController from'../dialog.controller'
class ItemDialogController extends DialogController {
    constructor(ItemService,) {
        "ngInject";
        super();
        this.ItemService = ItemService;
    }

    $onInit() {
        this.title = this.resolve.title;
        this.errorMessage = ""
    }

    ok(data) {
        this.ItemService.findByCodeOrName(data.code, data.name).then(() => {
            this.errorMessage = "Przedmiot o podanym kodzie i nazwie znajduje się już w bazie danych"
        }).catch(error => {
            if (error.message === "NOT_FOUND_ITEM") {
                this.close({$value: data});
            } else {
                this.errorMessage = "Wystąpił nieznany błąd";
            }
        })


    };


    cancel() {
        this.dismiss({$value: 'cancel'});
    };

}

export default ItemDialogController;
