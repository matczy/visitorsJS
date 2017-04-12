import Transport from '../../../common/components/model/transport'
import Person from '../../../common/components/model/person'
import RecordController from '../record.controller'

class RecordTransportController extends RecordController {
    constructor($rootScope, $scope, RecordTransportService, VehicleService, TrailerService, MessageService, DialogService, RecordTransportValidator, CONST, $stateParams, SpeechRecognizerService) {
        "ngInject";
        super();
        this._$rootScope = $rootScope;
        this.$scope = $scope;
        this._$stateParams = $stateParams;
        this.CONST = CONST;
        this.RecordTransportService = RecordTransportService;
        this.VehicleService = VehicleService;
        this.TrailerService = TrailerService;
        this.MessageService = MessageService;
        this.DialogService = DialogService;
        this.RecordTransportValidator = RecordTransportValidator;
        this.SpeechRecognizerService = SpeechRecognizerService;

        this.transport = new Transport();
        this.contactPerson = new Person();
        this.visitCard = {startDate: new Date(), endDate: new Date().setHours(23, 59, 59, 999)};
        this.comment = [];
        this.newPerson = new Person();
        this.companyIsOnBlackList= false;

    }

    $onInit() {
        if (this._$stateParams.vehicleId) {
            this.VehicleService.getVehicle(this._$stateParams.vehicleId).then((vehicle) => {
                this.transport.vehicle = vehicle;
            })
        }
        if (this._$stateParams.trailerId) {
            this.TrailerService.getTrailer(this._$stateParams.trailerId).then((trailer) => {
                this.transport.trailer = trailer;
            })
        }

        this._$rootScope.$on(this.CONST.CHOOSE_PERSON_PROMPT, (event, data) => {
            this.transport.driver = data.person;
            this.transport.vehicle.registration = this.transport.vehicle.registration?this.transport.vehicle.registration:data.registration;
        });

        this._$rootScope.$on(this.CONST.REFRESH_PERSONS, (event, data) => {
            this.persons = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_COMPANY, (event, data) => {
            this.companies = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_VEHICLES, (event, data) => {
            this.vehicles = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_TRAILERS, (event, data) => {
            this.trailers = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_ITEMS, (event, data) => {
            this.items = data;
        });
        this.contactPersons = this._getInsideWorkers()


        //TODO wywalic pozniej do czegos innego
        this.SpeechRecognizerService.start();

        let commands = {
            '*find': (val) => {
                // this.$scope.$apply(
                //     () => {
                if (this.listeningOnFieldName === "recordTransport_surnameAndNameField") {
                    this.transport.driver.surnameAndName = val;
                    this.sendSurnameAndNameChangeEvent(val)
                }
                if (this.listeningOnFieldName === "recordTransport_documentIdentifierField") {
                    this.transport.driver.documentIdentifier = val;
                }
                if (this.listeningOnFieldName === "recordTransport_phoneField") {
                    this.transport.driver.phone = val;
                }
                if (this.listeningOnFieldName === "recordTransport_companyField") {
                    this.transport.driver.company.name = val;
                }
                if (this.listeningOnFieldName === "recordTransport_registrationField") {
                    this.transport.vehicle.registration = val.trim();
                }
                if (this.listeningOnFieldName === "recordTransport_trailerField") {
                    this.transport.trailer.registration = val.trim();
                }

                if (this.listeningOnFieldName === "addPassengerForm_surnameAndNameField") {
                    this.newPerson.surnameAndName = val;
                    this.$scope.$broadcast('recognizationPassengerBySurnameAndName', this.newPerson)
                }

                if (this.listeningOnFieldName === "addPassengerForm_documentIdentifierField") {
                    this.newPerson.documentIdentifier = val;
                    this.$scope.$broadcast('recognizationPassenger', this.newPerson)

                }
                if (this.listeningOnFieldName === "addPassengerForm_phoneField") {
                    this.newPerson.phone = val;
                    this.$scope.$broadcast('recognizationPassenger', this.newPerson)

                }
                if (this.listeningOnFieldName === "addPassengerForm_companyField") {
                    this.newPerson.company.name = val;
                    this.$scope.$broadcast('recognizationPassenger', this.newPerson)
                }
                if (this.listeningOnFieldName === "recordTransport_contactPersonField") {
                    this.contactPerson.surnameAndName = val;
                }
                if (this.listeningOnFieldName === "recordTransport_commentField") {
                    this.comment = val;

                }
                // })
                this.$scope.$apply();
            },
        };
        this.SpeechRecognizerService.addCommands(commands);
        this.SpeechRecognizerService.start();
        this.SpeechRecognizerService.pause();


        this.$scope.$on('stopRecording', () => {
            this.SpeechRecognizerService.pause();
        });

        this._$rootScope.$on('startRecording', (event, data) => {
            this.listeningOnFieldName = data.field;
            this.SpeechRecognizerService.start();
        });

        this._$rootScope.$on('isOnBlackList',(event,data)=>{
            this.companyIsOnBlackList = data;
        })

    }


    sendSurnameAndNameChangeEvent(surnameAndName) {
        if (surnameAndName) {
            surnameAndName = surnameAndName.toLowerCase()
        }
        this._$rootScope.$emit(this.CONST.FIND_PERSON_PROMPT, surnameAndName)
    }

    entryAction() {
        if (this.RecordTransportValidator.checkDriverIsNotOnPersonsList(this.transport)) {
            this.RecordTransportService.recordEntry(this.transport, this.contactPerson, this.visitCard, this.comment)
                .then((successTransportResponse) => {
                    this.successAction("Poprawne zarejestrowany wjazdy " + successTransportResponse.transport.vehicle.registration + '  ' + successTransportResponse.transport.driver.surnameAndName);
                    this._clearFields();
                })
                .catch((error) => {
                    switch (error.message) {
                        case 'WRONG_LOCATION':
                            this._wrongLocationEntryAction(error.data, this.transport, this.contactPerson, this.visitCard, this.comment);
                            break;
                        case 'TO_MANY_RESULTS_COMPANY' :
                        case 'TO_MANY_RESULTS_PERSON' :
                        case 'TO_MANY_RESULT_VEHICLE':
                            this.toManyResultAction(error);
                            break;
                        default:
                            this.MessageService.showWarningMessage("error " + error);
                    }
                });
        } else {
            this.MessageService.showWarningMessage("kierowca nie może być jednocześnie na liście pasażerów");
        }

    }

    exitAction() {
        if (this.RecordTransportValidator.checkDriverIsNotOnPersonsList(this.transport)) {
            this.RecordTransportService.recordExit(this.transport, this.contactPerson, this.visitCard, this.comment)
                .then((successTransportResponse) => {
                    this.successAction("Poprawne zarejestrowany wyjazd " + successTransportResponse.transport.vehicle.registration + '  ' + successTransportResponse.transport.driver.surnameAndName);
                    this._clearFields();
                })
                .catch((error) => {
                    switch (error.message) {
                        case 'WRONG_LOCATION':
                            this._wrongLocationExitAction(error.data, this.transport, this.contactPerson, this.visitCard, this.comment);
                            break;
                        case 'TO_MANY_RESULTS_COMPANY' :
                        case 'TO_MANY_RESULTS_PERSON' :
                        case 'TO_MANY_RESULT_VEHICLE':
                            this.toManyResultAction(error);
                            break;
                        default:
                            this.MessageService.showWarningMessage("error " + error);
                    }
                });
        } else {
            this.MessageService.showWarningMessage("kierowca nie może być jednocześnie na liście pasażerów");
        }
    }

    _wrongLocationEntryAction(data, transport, contactPerson, visitCard, comment) {
        let objects = _.filter(data, (d) => {
            return !!d._id;
        });
        this.DialogService.showWrongLocationMessage(objects).then((result) => {
            this.RecordTransportService.changeLocationObject(result, false).then(() => {
                this.RecordTransportService.recordEntry(transport, contactPerson, visitCard, comment).then((successTransportResponse) => {
                    this.successAction("Poprawne zarejestrowany wjazd " + successTransportResponse.transport.vehicle.registration + '  ' + successTransportResponse.transport.driver.surnameAndName);
                    this._clearFields();
                })
            });
        });
    }

    _wrongLocationExitAction(data, transport, contactPerson, visitCard, comment) {
        let objects = _.filter(data, (d) => {
            return !!d._id;
        });
        this.DialogService.showWrongLocationMessage(objects).then((result) => {
            this.RecordTransportService.changeLocationObject(result, true).then((newObjects) => {
                console.log(newObjects);
                console.log("dsadasda")
                this.RecordTransportService.recordExit(transport, contactPerson, visitCard, comment).then((successTransportResponse) => {
                    this.successAction("Poprawne zarejestrowany wyjazd " + successTransportResponse.transport.vehicle.registration + '  ' + successTransportResponse.transport.driver.surnameAndName);
                    this._clearFields();
                })
            });
        });
    }


    setPassengers(passengers) {
        this.transport.passengers = passengers;
    }

    setItems(items) {
        this.transport.items = items;
    }

    _getInsideWorkers() {
        return this.persons.filter((person) => {
            return person.type === 'INTERNAL_WORKER';
        });
    }

    _clearFields() {
        this.transport = new Transport();
        this.comment = "";
        this.$scope.recordTransport.$setDirty();
        this.$scope.recordTransport.$setPristine();
        this.$scope.recordTransport.$setUntouched();
        this.contactPerson = new Person();

    }

}

export default RecordTransportController;
