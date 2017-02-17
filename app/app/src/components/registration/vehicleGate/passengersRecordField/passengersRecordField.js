import addPassengerFormComponent from './addPassengerForm/addPassengerForm.component'

import passengersRecordFieldComponent from './passengersRecordField.component';
import passengerListComponent from './passengerList/passengerList.component';
import passengerComponent from './passengerList/passenger/passenger.component';
import personField from '../../personField/personField';
let passengersRecordField = angular.module('passengersRecordField', [personField.name])
    .component('addPassengerForm',addPassengerFormComponent)
    .component('passenger',passengerComponent)
    .component('passengerList',passengerListComponent)
    .component('passengersRecordField',passengersRecordFieldComponent);



export default passengersRecordField;
