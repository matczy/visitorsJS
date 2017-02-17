import objectsTabComponent from './objectsTab.component';
import personsTableComponent from './personsTable/personsTable.component'
import vehiclesTableComponent from './vehicleTable/vehiclesTable.component'
import transportsTableComponent from './transportTable/transportsTable.component'
import historiesTableComponent from './historyTable/historyTable.component'
import itemsTableComponent from './itemTable/itemsTable.component'
import companiesTableComponent from './companiesTable/companiesTable.component'

import RightPanel from './rightPanel/rightPanel'
let objectsTabModule = angular.module('objectsTab', [RightPanel.name])

    .component('personsTable', personsTableComponent)
    .component('vehiclesTable', vehiclesTableComponent)
    .component('transportsTable', transportsTableComponent)
    .component('historiesTable', historiesTableComponent)
    .component('itemsTable', itemsTableComponent)
    .component('companiesTable', companiesTableComponent)
    .component('objectsTab', objectsTabComponent)
    .config(($stateProvider, $urlRouterProvider)=> {
        "ngInject"
        $stateProvider
            .state('objectsTab',
                {
                    title: {pl: 'Lista'},
                    //parent: 'global',
                    url: '/objectsTab',
                    views: {
                        'content@': {
                            component: 'objectsTab'
                        }
                    }
                });
    });
export default objectsTabModule;