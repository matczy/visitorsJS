import recordPersonComponent from './recordPerson.component.js';
import RecordPersonService from './recordPerson.service';
import RecordPersonValidator from './recordPerson.validator';
import GateActionService from '../gateAction.service';
import personField from '../personField/personField';
import contactPersonField from './../../../common/components/person/contactPersonField/contactPersonField';

let recordPerson = angular.module('recordPerson', [personField.name,contactPersonField.name])
    .component('recordPersonComponent', recordPersonComponent)

    .service('RecordPersonService', RecordPersonService)
    .service('RecordPersonValidator', RecordPersonValidator)
    .service('GateActionService',GateActionService)
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('person-recording',
            {
                title: {pl: 'Brama ruch pieszy'},

                parent: 'global',
                url: '/person-recording/:personId',
                views: {
                    'content@': {
                        component: 'recordPersonComponent'
                    }
                }

            });
    });


export default recordPerson;
