import loginComponent from './login.component';

let loginModule = angular.module('login', [])
    .component('login', loginComponent)


.config(($stateProvider, $urlRouterProvider)=> {
    "ngInject"
    $stateProvider
        .state('login',
            {
                title: {pl: 'Login'},
                url: '/login',
                views: {
                    'content@': {
                        component: 'login'
                    }
                }
            });
});

export default loginModule;