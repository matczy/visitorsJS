import historyChartComponent from './historyChart.component';
let historyChartModule = angular.module('historyChart', [])
    .component('historyChart', historyChartComponent)


.config(($stateProvider, $urlRouterProvider)=> {
    "ngInject"
    $stateProvider
        .state('historyChart',
            {
                title: {pl: 'Raporty'},
                //parent: 'global',
                url: '/historyChart',
                views: {
                    'content@': {
                        component: 'historyChart'
                    }
                }
            });
});

export default historyChartModule;