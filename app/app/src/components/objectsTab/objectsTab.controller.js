class ObjectsTabController {
    constructor(PersonService, VehicleService, TrailerService, CompanyService, ItemService, TransportService, GateActionService, $rootScope, CONST) {
        "ngInject"
        this.PersonService = PersonService;
        this.VehicleService = VehicleService;
        this.TrailerService = TrailerService;
        this.CompanyService = CompanyService;
        this.TransportService = TransportService;
        this.GateActionService = GateActionService;
        this.ItemService = ItemService;
        this.objectDetails = {};
        this._$rootScope = $rootScope;
        this.CONST = CONST;
    }

    $onInit() {
        this.PersonService.loadPersons().then((data)=>{
            this.persons = data;
        });

        this.VehicleService.loadVehicles().then((data)=>{
            this.vehicles = data;
        });
        this.TrailerService.loadTrailers().then((data)=>{
            this.trailers = data;
        });

        this.ItemService.loadItems().then((data)=>{
            this.items = _.filter(data, (e) => {
                return e.isInternal === false;
            })
            this.internalEquipments = _.filter(data, (e) => {
                return e.isInternal === true;
            })
        });
        this.TransportService.loadTransports().then((data)=>{
            this.transports = data;
        });
        this.GateActionService.getLastHistory(1000).then((data)=>{
            this.histories = data;
        });
        this.CompanyService.loadCompanies().then((data)=>{
            this.companies = data;
        });


        this._$rootScope.$on(this.CONST.REFRESH_PERSONS, (event, data)=> {
            this.persons = data;
        });

        this._$rootScope.$on(this.CONST.REFRESH_VEHICLES, (event, data)=> {
            this.vehicles = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_TRAILERS, (event, data)=> {
            this.trailers = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_ITEMS, (event, data)=> {
            this.items = _.filter(data, (e) => {
                return e.isInternal === false;
            })
            this.internalEquipments = _.filter(data, (e) => {
                return e.isInternal === true;
            })
        });

        this._$rootScope.$on(this.CONST.REFRESH_HISTORY, (event, data)=> {
            this.histories = data;
        });

        this._$rootScope.$on(this.CONST.REFRESH_TRANSPORTS, (event, data)=> {
            this.transports = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_COMPANY, (event, data)=> {
            this.companies = data;
        });

    }


    $onChanges(changes) {
    }

    changeTab() {
        this.objectDetails = {};
        this.isEditedRightPanel = false;
    }

    showDetails(object) {
        if (object._id.indexOf('persons') !== -1) {
            this.PersonService.getPerson(object._id).then(person=> {
                this.objectDetails = person;
            })
        }

        if (object._id.indexOf('vehicles') !== -1) {
            this.VehicleService.getVehicle(object._id).then(vehicle=> {
                this.objectDetails = vehicle;
            })
        }
        if (object._id.indexOf('trailers') !== -1) {
            this.TrailerService.getTrailer(object._id).then(trailer=> {
                this.objectDetails = trailer;
            });
        }
        if (object._id.indexOf('company') !== -1) {
            this.CompanyService.getCompany(object._id).then(company=> {
                this.objectDetails = company;
            })
        }
        if (object._id.indexOf('items') !== -1) {
            this.ItemService.getItem(object._id).then(item=> {
                this.objectDetails = item;
            })
        }
        if (object._id.indexOf('transport') !== -1) {
            this.TransportService.getTransport(object._id).then(transport=> {
                this.objectDetails = transport;
            })
        }

        if (object._id.indexOf('gateAction') !== -1) {
            this.GateActionService.get(object._id).then(gateAction=> {
                this.objectDetails = gateAction;
            })
        }
        this.isEditedRightPanel = false;


    }

}

export default ObjectsTabController;