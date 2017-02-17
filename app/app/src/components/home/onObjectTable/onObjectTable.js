

import onObjectTableComponent from './onObjectTable.component';
import OnObjectRow from '../onObjectRow/onObjectRow';
import PersonRow from '../../../common/components/personRow/personRow';
import VehicleRow from '../../../common/components/vehicleRow/vehicleRow';
import TrailerRow from '../../../common/components/trailerRow/trailerRow';


let onObjectTableModule = angular.module('onObjectTable',[OnObjectRow.name])

.component('onObjectTable', onObjectTableComponent);

export default onObjectTableModule;