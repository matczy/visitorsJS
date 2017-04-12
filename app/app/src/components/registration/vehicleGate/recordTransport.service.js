import Transport from '../../../common/components/model/transport'
import GateAction from '../../../common/components/model/gateAction'
import Company from '../../../common/components/model/company'


class RecordTransportService {
    constructor(GateActionService, PersonService, VehicleService, TrailerService, TransportService, ItemService, CompanyService, PouchdbService, RecordTransportValidator, $q) {
        "ngInject";
        this.$q = $q;
        this.GateActionService = GateActionService;
        this.PersonService = PersonService;
        this.VehicleService = VehicleService;
        this.TrailerService = TrailerService;
        this.ItemService = ItemService;
        this.CompanyService = CompanyService;
        this.RecordTransportValidator = RecordTransportValidator;
        this.TransportService = TransportService;
        this.PouchdbService = PouchdbService;

    }


    recordEntry(transport, contactPerson, visitCard, comment) {
        return this._tryRecord(transport, contactPerson, visitCard, comment, 'Entry');
    }


    recordExit(transport, contactPerson, visitCard, comment) {
        return this._tryRecord(transport, contactPerson, visitCard, comment, 'Exit');
    }

    _tryRecord(transport, contactPerson, visitCard, comment, action) {
        let allCompaniesName = this._getAllCompaniesName(transport.driver, transport.passengers);
        return this.$q.all(this._createCompanies(allCompaniesName)).then((data) => {
            let entryElems = [this.PersonService.getOrCreate(transport.driver), this.VehicleService.getOrCreate(transport.vehicle), this.TrailerService.getOrCreate(transport.trailer)]
                .concat(this._getPassengersPromises(transport.passengers))
                .concat(this._getItemsPromises(transport.items));

            return this.$q.all(entryElems)
                .then((results) => {
                    let returnedDriver = results[0];
                    let returnedVehicle = results[1];
                    let returnedTrailer = results[2];
                    let returnedPassengers = this._getPassengers(angular.copy(results));
                    let returnedItems = this._getItems(results);
                    let transportToRecord = new Transport(transport._id, returnedDriver, returnedVehicle, returnedTrailer, returnedPassengers, returnedItems);
                    return this._trySaveRecordAction(transportToRecord, contactPerson, visitCard, comment, action)

                })
                .then(resultFromTryRecordAction => {
                    this._updateTransportObjects(resultFromTryRecordAction.transport, action);

                    return resultFromTryRecordAction;
                });
        })


    }

    _getAllCompaniesName(driver, passengers) {
        let copyDriver = angular.copy(driver);
        let persons = angular.copy(passengers);
        persons.push(copyDriver);
        return _.filter(_.uniq(_.map(persons, (person) => {
            return person.company.name;
        })), (companyName) => {
            return !!companyName;
        });
    }

    _trySaveRecordAction(transport, contactPerson, visitCard, comment, action) {
        if (this.RecordTransportValidator.checkAllTransportObjectIsOnCorrecSite(transport, action)) {
            return this.TransportService.create(transport).then((savedTransport) => {
                let gateAction = new GateAction('gateAction' + action + 'TransportGate' + '-' + new Date().toISOString(), contactPerson, visitCard, comment, action, 'transportGate');
                gateAction.transport = savedTransport;

                return this.GateActionService.saveGateAction(gateAction);
            });

        }
        return this.$q.reject({
            message: 'WRONG_LOCATION',
            data: this.RecordTransportValidator.getObjectsWithWrongLocation(transport, action)
        })
    }

    _getPassengersPromises(passengers) {
        let result = [];
        passengers.forEach((passenger) => {
            result.push(this.PersonService.getOrCreate(passenger))
        });
        return result;
    }

    _getItemsPromises(items) {
        let result = [];
        items.forEach((item) => {
            result.push(this.ItemService.getOrCreate(item))
        });
        return result;
    }

    _getPassengers(results) {
        let elems = _.dropRight(_.reverse(results), 1);
        return _.filter(elems, (elem => {
            if (elem) {
                return elem._id.indexOf('persons') !== -1;
            } else {
                return false;
            }
        }));
    }

    _getItems(results) {
        return _.filter(results, (result => {
            if (result) {
                return result._id.indexOf('items') !== -1;
            } else {
                return false;
            }
        }));
    }

    _updateTransportObjects(transport, action) {
        this._updateDriver(angular.copy(transport.driver), angular.copy(transport.vehicle), angular.copy(transport.trailer), action);
        this._updateVehicle(angular.copy(transport.vehicle), angular.copy(transport.driver), action);
        this._updateTrailer(angular.copy(transport.trailer), angular.copy(transport.driver), action);
        this._updatePassengers(angular.copy(transport.passengers), action);
        this._updateItems(angular.copy(transport.items), angular.copy(transport), action)
    }


    _updateDriver(driver, vehicle, trailer, action) {
        if (!driver.usedVehicles) {
            driver.usedVehicles = new Map();
            driver.usedVehicles.set(vehicle.registration, 1)
        } else {
            driver.usedVehicles = new Map(JSON.parse(driver.usedVehicles));
            if (driver.usedVehicles.has(vehicle.registration)) {
                driver.usedVehicles.set(vehicle.registration, driver.usedVehicles.get(vehicle.registration) + 1);
            } else {
                driver.usedVehicles.set(vehicle.registration, 1);
            }
        }

        if (!driver.usedTrailers) {
            driver.usedTrailers = new Map();
            driver.usedTrailers.set(trailer.registration, 1)
        } else {
            driver.usedTrailers = new Map(JSON.parse(driver.usedTrailers));
            if (driver.usedTrailers.has(trailer.registration)) {
                driver.usedTrailers.set(trailer.registration, driver.usedTrailers.get(trailer.registration) + 1);
            } else {
                driver.usedTrailers.set(trailer.registration, 1);
            }
        }

        if (action === 'Entry') {
            driver.isOnObject = true;
            driver.lastEntry = new Date();
        } else {
            driver.isOnObject = false;
            driver.lastExit = new Date();
        }

        driver.usedVehicles = JSON.stringify([...driver.usedVehicles]);
        driver.usedTrailers = JSON.stringify([...driver.usedTrailers]);

        this.PersonService.putPerson(driver);

    }

    _updateVehicle(vehicle, driver, action) {
        if (action === 'Entry') {
            vehicle.isOnObject = true;
            vehicle.lastEntry = new Date();
        } else {
            vehicle.isOnObject = false;
            vehicle.lastExit = new Date();
        }

        if (!vehicle.usedBy) {
            vehicle.usedBy = [driver.surnameAndName];
        } else {
            if (vehicle.usedBy.indexOf(driver.surnameAndName) === -1) {
                vehicle.usedBy.push(driver.surnameAndName)
            }
        }
        this.VehicleService.putVehicle(vehicle);
    }

    _updateTrailer(trailer, driver, action) {
        if (trailer._id) {
            if (action === 'Entry') {
                trailer.isOnObject = true;
                trailer.lastEntry = new Date();
            } else {
                trailer.isOnObject = false;
                trailer.lastExit = new Date();
            }

            if (!trailer.usedBy) {
                trailer.usedBy = [driver.surnameAndName];
            } else {
                if (trailer.usedBy.indexOf(driver.surnameAndName) === -1) {
                    trailer.usedBy.push(driver.surnameAndName)
                }
            }
            this.TrailerService.putTrailer(trailer);
        }

    }

    _updatePassengers(passengers, action) {
        passengers.forEach((passenger) => {
            if (action === 'Entry') {
                passenger.isOnObject = true;
                passenger.lastEntry = new Date();
            } else {
                passenger.isOnObject = false;
                passenger.lastExit = new Date();
            }
            this.PersonService.putPerson(passenger);
        })
    }

    _updateItems(items, transport, action) {

        items.forEach((item) => {
            if (!item.usedBy) {
                item.usedBy = [{transport: transport, action: action, date: new Date()}];
            } else {
                item.usedBy.push({transport: transport, action: action, date: new Date()})
            }
            this.ItemService.putItem(item);
        });
    }

    changeLocationObject(objects) {
        let promisses = [];
        objects.forEach((object) => {
            object.isOnObject = !object.isOnObject;

            promisses.push(this.PouchdbService.addDocument(object).then((result)=>{
                return this.PouchdbService.getDocument(result.id);
            }));
        });
        return this.$q.all(promisses);
    }

    _createCompanies(allCompaniesName) {
        if (allCompaniesName.length === 0) {
            return this.$q.promise;
        }
        return _.map(allCompaniesName, (companyName) => {
            let company = new Company();
            company.name = companyName;
            return this.CompanyService.getOrCreate(company);
        })
    }
}

export default RecordTransportService;





