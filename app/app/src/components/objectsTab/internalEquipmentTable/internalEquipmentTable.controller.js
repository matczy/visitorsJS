class InternalEquipmentTableController {
    constructor(DialogService,ItemService,$rootScope,CONST) {
        "ngInject"
        this.DialogService= DialogService;
        this.ItemService=ItemService;
        this._$rootScope = $rootScope;
        this.CONST = CONST;
        this.selectedType = 'all';
    }


    $onInit() {
        this.currentObjects = angular.copy(this.equipments)
    }

    $onChanges() {
        this.currentObjects = angular.copy(this.equipments)
    }


    filterData() {
        if (this.selectedType === 'all') {
            this.currentObjects = angular.copy(this.equipments);
        } else if (this.selectedType === 'laptops') {
            this.currentObjects = _.filter(this.equipments, {'type': 'Laptop'})
        } else if (this.selectedType === 'cameras') {
            this.currentObjects = _.filter(this.equipments, {'type': 'Kamera'})
        }
        else {
            this.currentObjects = _.filter(this.equipments, {'type': 'Inne'})
        }
    }


    openCreateItemDialog(){
        this.DialogService.createUpdateInternalEquipment().then((data)=>{
            this.ItemService.create(data);
            this._$rootScope.$emit(this.CONST.REFRESH_ITEMS);
        });
    }
}

export default InternalEquipmentTableController;