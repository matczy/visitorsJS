
class ItemListController {
  constructor() {
    "ngInject";
  }


  removeFromItemsList(item){
    for (let i = 0; i < this.items.length; i++) {
      if((this.items[i].code === item.code) && (this.items[i].name === item.name)){
        this.items.splice(i--, 1);
      }
    }
  }


}

export default ItemListController;
