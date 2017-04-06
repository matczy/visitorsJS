import Item from '../../../common/components/model/item'
class RecordEquipmentController {
    constructor(ItemService, RecordEquipmentService, MessageService) {
        "ngInject";
        this.ItemService = ItemService;
        this.MessageService = MessageService;
        this.RecordEquipmentService = RecordEquipmentService;
        this.searchText = '';
    }

    $onInit() {

    }

    search() {
        this.ItemService.findByCodeOrName(this.searchText, '').then(data => {
           if(data.isInternal){
               this.item = data;
           }else{
               this.item = new Item();
               this.MessageService.showWarningMessage("Nie znaleziono sprzętu dla: " + this.searchText);
           }
        }).catch(() => {
            this.item = new Item();
            this.MessageService.showWarningMessage("Nie znaleziono sprzętu dla: " + this.searchText);
        })
    }

    entryAction() {
        this.RecordEquipmentService.recordEntry(this.item)
            .then((success) => {
                this.MessageService.showInfoMessage("Poprawne zarejestrowanie sprzetu " + success.item.name);
                this.item = new Item();
                this.searchText = '';
            })
            .catch((error) => {
                this.MessageService.showWarningMessage("error " + error);
            });
    }

    exitAction() {
        this.RecordEquipmentService.recordExit(this.item)
            .then((success) => {
                this.MessageService.showInfoMessage("Poprawne zarejestrowanie sprzetu " + success.item.name);
                this.item = new Item();
                this.searchText = '';
            })
            .catch((error) => {
                this.MessageService.showWarningMessage("error " + error);
            });
    }

}

export default RecordEquipmentController;
