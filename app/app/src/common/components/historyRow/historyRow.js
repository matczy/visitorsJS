import GateType from '../gateType/gateType'
import historyRowComponent from './historyRow.component';

let historyRowModule = angular.module('historyRow',[GateType.name])

.component('historyRow', historyRowComponent);

export default historyRowModule;