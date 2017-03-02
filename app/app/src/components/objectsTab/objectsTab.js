import objectsTabComponent from './objectsTab.component';
import personsTableComponent from './personsTable/personsTable.component'
import vehiclesTableComponent from './vehicleTable/vehiclesTable.component'
import transportsTableComponent from './transportTable/transportsTable.component'
import historiesTableComponent from './historyTable/historyTable.component'
import itemsTableComponent from './itemTable/itemsTable.component'
import companiesTableComponent from './companiesTable/companiesTable.component'
import internalEquipmentsTabComponent from './internalEquipmentTable/internalEquipmentTable.component'
import RightPanel from './rightPanel/rightPanel'
import ChosePersonTableComponent from './choosePersonTable/chosePersonTable.component'
let objectsTabModule = angular.module('objectsTab', [RightPanel.name])

    .component('personsTable', personsTableComponent)
    .component('vehiclesTable', vehiclesTableComponent)
    .component('transportsTable', transportsTableComponent)
    .component('historiesTable', historiesTableComponent)
    .component('itemsTable', itemsTableComponent)
    .component('companiesTable', companiesTableComponent)
    .component('objectsTab', objectsTabComponent)
    .component('internalEquipmentsTable', internalEquipmentsTabComponent)
    .component('chosePersonTable',ChosePersonTableComponent)
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