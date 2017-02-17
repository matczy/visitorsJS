import Item from '../model/item'
class ItemsRecordFieldController {
  constructor($rootScope,$scope,CONST) {
    "ngInject";
    this.CONST=CONST;
    this._$rootScope = $rootScope;
    this.$scope = $scope;
    this.newItem= new Item();
    this.types=['Laptop', 'Kamera','Inne']
  };


  $onInit(){
      this.currentItems = angular.copy(this.items);
      this._$rootScope.$on(this.CONST.CHOOSE_ITEM_PROMPT, (event, data)=> {
      this.newItem = data.item;
    });
  }


  $onChanges(){
    if(!this.items.length){
      this.currentItems = angular.copy(this.items);
    }
  }
  editItemsList(){
    this.isActive = true;
  }

  addItemToList(data){
    this.currentItems.push(data.item);
    this.newItem= new Item();
    data.form.$setDirty();
    data.form.$setPristine();
    data.form.$setUntouched();

  }

  cancelAddItemToList(){
    this.isActive = false;
    this.newItem= new Item();
    this.onClose({items: this.currentItems});
    this._$rootScope.$emit(this.CONST.HISTORY_TAB);

  }


  findItemPrompt(text){
    if(text){
      this._$rootScope.$emit(this.CONST.FIND_ITEM_PROMPT, text.toLowerCase())
    }
  }
}

export default ItemsRecordFieldController;
