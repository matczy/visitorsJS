import recordEquipmentComponent from './recordEquipment.component.js';
import RecordEquipmentService from './recordEquipment.service';
import GateActionService from '../gateAction.service';

import personField from '../personField/personField';


let recordEquipment = angular.module('recordEquipment', [personField.name])
    .component('recordEquipmentComponent', recordEquipmentComponent)
    .service('GateActionService',GateActionService)
    .service('RecordEquipmentService', RecordEquipmentService)


    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('equipment-recording',
            {
                title: {pl: 'Rejestracja sprzęt firmowy'},
                parent: 'global',
                url: '/equipment-recording',
                views: {
                    'content@': {
                        component: 'recordEquipmentComponent'
                    }
                }

            });
    });


export default recordEquipment;
