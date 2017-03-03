import Person from '../../../common/components/model/person'
import RecordController from '../record.controller'
class RecordPersonController extends RecordController{
    constructor($rootScope, $scope, $stateParams, $state, RecordPersonService, PersonService, MessageService, DialogService,SpeechRecognizerService, CONST) {
        "ngInject";
        super();
        this.CONST = CONST;
        this.RecordPersonService = RecordPersonService;
        this.PersonService = PersonService;
        this.MessageService = MessageService;
        this.DialogService = DialogService;
        this.SpeechRecognizerService = SpeechRecognizerService;
        this._$rootScope = $rootScope;
        this._$stateParams = $stateParams;
        this.$state = $state;
        this.$scope = $scope;

        this.contactPerson = new Person();
        this.visitCard = {startDate: new Date(), endDate: new Date().setHours(23, 59, 59, 999)};
        this.comment = "";
        this.selectedItems = [];

    }

    $onInit() {

        if (this._$stateParams.personId) {
            this.PersonService.getPerson(this._$stateParams.personId).then((person) => {
                this.person = person;
            })
        } else {
            this.person = new Person();
        }

        this._$rootScope.$on(this.CONST.CHOOSE_PERSON_PROMPT, (event, data) => {
            this.person = data.person;
        });
        this._$rootScope.$on(this.CONST.REFRESH_PERSONS, (event, data) => {
            this.persons = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_COMPANY, (event, data) => {
            this.companies = data;
        });
        this._$rootScope.$on(this.CONST.REFRESH_ITEMS, (event, data) => {
            this.items = data;
        });

        this.contactPersons = this._getInsideWorkers();

        //TODO wywalic pozniej do czegos innego
        this.SpeechRecognizerService.start();

        let commands = {
            '*find': (val) => {
                this.$scope.$apply(
                    () => {
                        if (this.listeningOnFieldName === "recordPerson_surnameAndNameField") {
                            this.person.surnameAndName = val;
                            this.sendSurnameAndNameChangeEvent(val)
                        }
                        if (this.listeningOnFieldName === "recordPerson_documentIdentifierField") {
                            this.person.documentIdentifier = val;
                        }
                        if (this.listeningOnFieldName === "recordPerson_phoneField") {
                            this.person.phone = val;
                        }
                        if (this.listeningOnFieldName === "recordPerson_companyField") {
                            this.person.company.name = val;
                        }
                        if (this.listeningOnFieldName === "recordPerson_contactPersonField") {
                            this.contactPerson.surnameAndName = val;
                        }
                        if (this.listeningOnFieldName === "recordPerson_commentField") {
                            this.comment=val;
                        }
                    })
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
    }

    sendSurnameAndNameChangeEvent(surnameAndName) {
        if (surnameAndName) {
            surnameAndName = surnameAndName.toLowerCase()
        }
        this._$rootScope.$emit(this.CONST.FIND_PERSON_PROMPT, surnameAndName)
    }

    entryAction() {
        this.RecordPersonService.recordEntry(this.item)
            .then((success)=> {
                this.successAction("Poprawne zarejestrowanie wejścia " + success.person.surnameAndName);
                this._clearFields();
            })
            .catch((error)=> {
                switch(error.message){
                    case 'WRONG_LOCATION':
                        this._wrongLocationEntryAction(error.data, this.person, this.contactPerson, this.visitCard, this.selectedItems, this.comment);
                        break;
                    case 'TO_MANY_RESULTS_COMPANY' :
                    case 'TO_MANY_RESULTS_PERSON' :
                        this.toManyResultAction(error);
                        break;
                    default:
                        this.MessageService.showWarningMessage("error " + error);
                }
            });
    }

    exitAction() {
        this.RecordPersonService.recordExit(this.person, this.contactPerson, this.visitCard, this.selectedItems, this.comment).then((sucessRecordingResponse)=> {
            this.successAction("Poprawne zarejestrowanie wyjścia " + sucessRecordingResponse.person.surnameAndName);
            this._clearFields();
        }).catch((error)=> {
            switch(error.message){
                case 'WRONG_LOCATION':
                    this._wrongLocationExitAction(error.data, this.person, this.contactPerson, this.visitCard, this.selectedItems, this.comment);
                    break;
                case 'TO_MANY_RESULTS_COMPANY' :
                case 'TO_MANY_RESULTS_PERSON' :
                    this.toManyResultAction(error);
                    break;
                default:
                    this.MessageService.showWarningMessage("error " + error);

            }
        });
    }

    _wrongLocationEntryAction(data, person, contactPerson, visitCard, items, comment) {
        this.DialogService.showWrongLocationMessage(data).then((result)=> {
            this.RecordPersonService.changeLocationPerson(result).then(()=> {
                this.RecordPersonService.recordEntry(person, contactPerson, visitCard, items, comment).then((successRecordingResponse)=> {
                    this.successAction("Poprawne zarejestrowanie wejścia " + successRecordingResponse.person.surnameAndName)
                    this._clearFields();
                })
            });
        });
    }

    _wrongLocationExitAction(data, person, contactPerson, visitCard, items, comment) {
        this.DialogService.showWrongLocationMessage(data).then((result)=> {
            this.RecordPersonService.changeLocationPerson(result).then(()=> {
                this.RecordPersonService.recordExit(person, contactPerson, visitCard, items, comment).then((successRecordingResponse)=> {
                    this.successAction("Poprawne zarejestrowanie wyjścia " + successRecordingResponse.person.surnameAndName);
                    this._clearFields();
                });
            });
        })
    }

    _getInsideWorkers() {
        return this.persons.filter((person)=> {
            return person.type === 'INTERNAL_WORKER';
        });
    }

    _clearFields() {
        this.person = new Person();
        this.contactPerson = new Person();
        this.comment = "";
        this.visitCard = {startDate: new Date(), endDate: new Date().setHours(23, 59, 59, 999)};
        this.selectedItems = [];
        this.$scope.recordPerson.$setDirty();
        this.$scope.recordPerson.$setPristine();
        this.$scope.recordPerson.$setUntouched();
    }


    setItems(items) {
        this.selectedItems = items;
    }

}

export default RecordPersonController;
