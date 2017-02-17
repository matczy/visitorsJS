import recordTransportComponent from './recordTransport.component.js';
import personOrVehicleRowComponent from '../../../common/dialog/personOrVehicleRow/personOrVehicleRow.component';
import registrationVehicleFieldComponent from './registrationVehicleField/registrationVehicleField.component';
import chooseInstructionComponent from './../../../common/components/buttons/chooseInstruction/chooseInstruction.component'
import trailerFieldComponent from './trailerField/trailerField.component';

import RecordTransportService from './recordTransport.service'
import RecordTransportValidator from './recordTransport.validator'
import GateActionService from '../gateAction.service'
import personField from '../personField/personField';
import contactPersonField from './../../../common/components/person/contactPersonField/contactPersonField';
import passengersRecordField from './passengersRecordField/passengersRecordField';


let recordTransport = angular.module('recordTransport', [personField.name,contactPersonField.name,passengersRecordField.name])
    .component('recordTransportComponent', recordTransportComponent)
    .component('registrationVehicleField', registrationVehicleFieldComponent)
    .component('trailerField', trailerFieldComponent)
    .component('personOrVehicleRow', personOrVehicleRowComponent)
    .component('chooseInstruction', chooseInstructionComponent)

    .service('RecordTransportService', RecordTransportService)
    .service('RecordTransportValidator', RecordTransportValidator)
    .service('GateActionService',GateActionService)

    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject"
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('transport-recording',
            {
                title: {pl: 'Brama ruch kołowy'},

                parent: 'global',
                url: '/transport-recording',
                params:{
                    vehicleId:null,
                    trailerId:null
                },
                views: {
                    'content@': {
                        component: 'recordTransportComponent'
                    }

                }
            });
    });


export default recordTransport;
