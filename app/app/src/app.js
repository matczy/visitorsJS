//build app epi w konsoli


import angular from "angular";
import "angular-ui-router"
import "ui-router-route-to-components"
import "angular-ui-bootstrap"
import "angular-aria"
import "angular-animate"
import "angular-sanitize"
import "angular-material"
import "angular-toastr"
import "angular-messages"
import "jquery-slimscroll"
import 'angular-ui-mask'
import 'angular-local-storage'
import '../../node_modules/annyang/dist/annyang.js'

import moment from 'expose?moment!moment';
import '../../node_modules/chart.js/dist/Chart.min.js'
import '../../node_modules/angular-chart.js/dist/angular-chart.min.js'
import 'restangular'
import 'mdPickers'
import * as _ from 'lodash'
import PouchDB from 'expose?PouchDB!pouchdb';
import Pauth from '../../node_modules/pouchdb-authentication/dist/pouchdb.authentication.min'
PouchDB.plugin(Pauth);

import "angular-pouchdb"
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import '../assets/css/font-awesome/css/font-awesome.css';

import '../assets/css/animate.css';
import '../assets/css/plugins/iCheck/custom.css';
import '../../node_modules/mdPickers/dist/mdPickers.min.css';

import '../../node_modules/angular-material/angular-material.css';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/angular-toastr/dist/angular-toastr.css';
import '../../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css';

import '../assets/css/style.css';

angular.module('app', [
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
     'pouchdb',
    'toastr',
    'ngMaterial',
    'ui.router.components',
    'ngMessages',
    "ui.mask",
    'LocalStorageModule',
    'chart.js',
    'restangular',
    'mdPickers',
    Common.name,
    Components.name,
])
    .config(
        ($locationProvider,$stateProvider, $urlRouterProvider, localStorageServiceProvider, pouchDBProvider, POUCHDB_METHODS,ChartJsProvider,$httpProvider)=>{
            "ngInject"


            let authMethods = {
                login: 'qify',
                logout: 'qify',
                getUser: 'qify',
                signup:'qify'
            };
            pouchDBProvider.methods = angular.extend({}, POUCHDB_METHODS, authMethods);


            localStorageServiceProvider
                .setStorageType('sessionStorage').setDefaultToCookie(false);


             $locationProvider.html5Mode(true).hashPrefix('!');


            // $locationProvider.hashPrefix('!');
            //
            // $locationProvider.html5Mode({enabled: false, requireBase: false});

            $urlRouterProvider.otherwise('/home');

            $stateProvider.state('global', {
                abstract: true,
                resolve: {
                    persons:(PersonService)=>{
                        return PersonService.loadPersons();
                    },
                    vehicles:(VehicleService)=>{
                        return VehicleService.loadVehicles();
                    },
                    trailers:(TrailerService)=>{
                        return TrailerService.loadTrailers();
                    },
                    items:(ItemService)=>{
                        return ItemService.loadItems();
                    },
                    transports:(TransportService)=>{
                        return TransportService.loadTransports();
                    },
                    companies:(CompanyService)=>{
                        return CompanyService.loadCompanies();
                    },
                    // histories:(GateActionService)=>{
                    //     return GateActionService.getLastHistory(1000);
                    // },
                    lastGateActionHistory:(GateActionService)=>{
                        return GateActionService.getLastHistory(50);
                    }
                },
                views: {
                    'rightsidebar@': {
                        component: 'rightsidebar'
                    }
                }
            });

            ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

        }
    )
    .run(function ($rootScope, CONST,localStorageService,AuthService, $state,OnlineOfflineService) {
        "ngInject"

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            let loginPanelAvailable = false;
            if(loginPanelAvailable){
                if(!OnlineOfflineService.getCurrentOnlineStatus()){
                    $rootScope.$broadcast("loggedEvent",true)
                    if(toState.name ==='login'){
                        $state.go('home');
                    }
                }else{
                    if(localStorageService.get(localStorageService.get('userName'))){
                        $rootScope.$broadcast("loggedEvent",true)
                    }else{
                        $rootScope.$broadcast("loggedEvent",false);
                        localStorageService.set(localStorageService.get('userName'), false);
                        localStorageService.set('userName','');
                        $state.go('login');
                    }
                }
            } else{
                $rootScope.$broadcast("loggedEvent",true)
                if(toState.name ==='login'){
                    $state.go('home');
                }
            }



            $rootScope.$broadcast('changeNavigationStateEvent',toState);

        });


    })
    .component('app', AppComponent);


