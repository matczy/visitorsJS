class ItemsTableController {
    constructor(DialogService,ItemService,$rootScope,CONST) {
        "ngInject"
        this.DialogService= DialogService;
        this.ItemService=ItemService;
        this._$rootScope = $rootScope;
        this.CONST = CONST;
        this.selectedType = 'all';
    }


    $onInit() {

        this.currentObjects = angular.copy(this.items)

    }

    $onChanges() {
        this.currentObjects = angular.copy(this.items)
    }


    filterData() {
        if (this.selectedType === 'all') {
            this.currentObjects = angular.copy(this.items);
        } else if (this.selectedType === 'laptops') {
            this.currentObjects = _.filter(this.items, {'type': 'Laptop'})
        } else if (this.selectedType === 'cameras') {
            this.currentObjects = _.filter(this.items, {'type': 'Kamera'})
        }
        else {
            this.currentObjects = _.filter(this.items, {'type': 'Inne'})
        }
    }


    openCreateItemDialog(){
        this.DialogService.createUpdateItem().then((data)=>{
            this.ItemService.create(data);
            this._$rootScope.$emit(this.CONST.REFRESH_ITEMS);
        });
    }
}

export default ItemsTableController;