import recordEquipmentComponent from './recordEquipment.component.js';

import personField from '../personField/personField';


let recordEquipment = angular.module('recordEquipment', [personField.name])
    .component('recordEquipmentComponent', recordEquipmentComponent)

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
