import itemListComponent from './itemList.component';
import itemComponent from './item/item.component';
import itemFieldComponent from '../itemField/itemField.component';


let itemListModule = angular.module('itemListModule', [])
    .component('itemField',itemFieldComponent)
    .component('item', itemComponent)
    .component('itemList', itemListComponent);

export default itemListModule;
