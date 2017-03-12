class InternalEquipmentDetailsController {
    constructor(ItemService,MessageService){
        "ngInject";
        this.showLinkedPersons = false;
        this.ItemService  = ItemService;
        this.MessageService = MessageService;
    }


    chose(object){
        this.item.assignedPerson = object;
        this.ItemService.putItem(this.item).then(data=>{
            this.MessageService.showInfoMessage("Sprzęt został poprawnie przypisany do osoby")
        });
        this.showLinkedPersons = false;
    }
}

export default InternalEquipmentDetailsController;