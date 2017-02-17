import addItemFormComponent from './addItemForm/addItemForm.component'

import itemsRecordFieldComponent from './itemsRecordField.component';
import itemListComponent from './itemList/itemList.component';
import itemComponent from './itemList/item/item.component';
import itemFieldComponent from './itemField/itemField.component';
import itemPromptComponent from './itemPrompt/itemPrompt.component'
let itemsRecordField = angular.module('itemsRecordField', [])
    .component('itemPrompt', itemPromptComponent)
    .component('addItemForm',addItemFormComponent)
    .component('item',itemComponent)
    .component('itemField',itemFieldComponent)
    .component('itemList',itemListComponent)
    .component('itemsRecordField',itemsRecordFieldComponent);



export default itemsRecordField;
