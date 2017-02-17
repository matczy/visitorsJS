import OnObjectTable from './onObjectTable/onObjectTable'
import homeComponent from './home.component';
// import '../../../../node_modules/chart.js/dist/'
let homeModule = angular.module('home', [OnObjectTable.name])
    .component('home', homeComponent)


.config(($stateProvider, $urlRouterProvider)=> {
    "ngInject"
    $stateProvider
        .state('home',
            {
                title: {pl: 'Główna'},
                //parent: 'global',
                url: '/home',
                views: {
                    'content@': {
                        component: 'home'
                    }
                }
            });
});

export default homeModule;