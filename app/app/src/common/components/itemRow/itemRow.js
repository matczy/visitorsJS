
import itemType from '../itemType/itemType'
import itemRowComponent from './itemRow.component';

let itemRowModule = angular.module('itemRow',[itemType.name])

.component('itemRow', itemRowComponent);

export default itemRowModule;