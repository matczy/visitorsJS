class AppController {
    constructor($http,$sce,PouchdbService, PersonService, VehicleService, TrailerService, ItemService, TransportService, CompanyService, GateActionService, $rootScope, CONST,$location  ) {
        "ngInject";


        let localDB = PouchdbService.createDatabase('reco');
        PouchdbService.createHistoryViewsForDay();
        PouchdbService.createHistoryViewsForMonth();


        let synchronizeAllowed = false;
//         remoteDB.signup('admin', 'admin1', function (err, response) {
//             if (err) {
//                 if (err.name === 'conflict') {
// console.log("sadasdas")  ;
//                 } else if (err.name === 'forbidden') {
//                     console.log("34242342341d")
//                 } else {
// console.log("32423423")
//                 }
//             }
//         });

        if(synchronizeAllowed){
            let remoteDB = PouchdbService.createRemoteDatabase('http://127.0.0.1:5984/remotedatabase',{skipSetup: true});

            localDB.sync(remoteDB, {
                live: true,
                retry: true
            }).on('change', function (change) {
                console.log('yo, something changed');
            }).on('paused', function (info) {
                console.log('replication was paused, usually because of a lost connection');
            }).on('active', function (info) {
                console.log('replication was resumed');
            }).on('error', function (err) {
                console.log(' totally unhandled error (shouldnt happen)');
            });
        }

        this._$rootScope = $rootScope;
        this.$location = $location;
        this.CONST = CONST;
        this.PouchdbService = PouchdbService;
        this.PersonService = PersonService;
        this.TrailerService = TrailerService;
        this.VehicleService = VehicleService;
        this.ItemService = ItemService;
        this.TransportService = TransportService;
        this.GateActionService = GateActionService;
        this.CompanyService = CompanyService;

        PouchdbService.listenChanges(function (result) {
            if (result.id.indexOf('persons') !== -1) {
                PersonService.loadPersons().then((persons)=> {
                    $rootScope.$broadcast(CONST.REFRESH_PERSONS, persons);
                });
            }

            if (result.id.indexOf('vehicles') !== -1) {
                VehicleService.loadVehicles().then((vehicles)=> {
                    $rootScope.$broadcast(CONST.REFRESH_VEHICLES, vehicles);
                });
            }

            if (result.id.indexOf('trailers') !== -1) {
                TrailerService.loadTrailers().then((trailers)=> {
                    $rootScope.$broadcast(CONST.REFRESH_TRAILERS, trailers);
                });
            }

            if (result.id.indexOf('items') !== -1) {
                ItemService.loadItems().then((items)=> {
                    $rootScope.$broadcast(CONST.REFRESH_ITEMS, items);
                });
            }

            if (result.id.indexOf('transports') !== -1) {
                TransportService.loadTransports().then((transports)=> {
                    $rootScope.$broadcast(CONST.REFRESH_TRANSPORTS, transports);
                });
            }

            if (result.id.indexOf('gateAction') !== -1) {
                GateActionService.getLastHistory(100).then((gateActions)=> {
                    $rootScope.$broadcast(CONST.REFRESH_HISTORY, gateActions);
                });
            }

            if (result.id.indexOf('company') !== -1) {
                CompanyService.loadCompanies().then((companies)=> {
                    $rootScope.$broadcast(CONST.REFRESH_COMPANY, companies);
                });
            }
        })

    }


    $onInit(){
    }



}

export default AppController