import Person from '../../../common/components/model/person'
class RecordEquipmentController{
    constructor(ItemService) {
        "ngInject";
        this.ItemService = ItemService;
        this.searchText = '';
    }

    $onInit(){

    }

    search(){
        this.ItemService.findByCodeOrName(this.searchText,'').then(data=>{
            this.item  = data;
        })
    }

    entryAction(){

    }

    exitAction(){

    }

}

export default RecordEquipmentController;
