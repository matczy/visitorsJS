import Navbar from './navbar/navbar';
import Navigation from './navigation/navigation';
import Rightsidebar from './rightsidebar/rightSidebar';
import ExternalComponents from './externalComponents/externalComponents'
import DialogComponent from './dialog/dialog'
import MyComponents from './components/my-components'
import PouchdbModule from './pouchdb/pouchdb'
import Const from './const/const';

import PersonService from './services/person-service'
import VehicleService from './services/vehicle-service'
import TrailerService from './services/trailer-service'
import ItemService from './services/item-service'
import PrinterService from './services/printer-service'
import TransportService from './services/transport-service'
import MessageService from './services/message-service'
import DialogService from './services/dialog-service'
import CompanyService from './services/company-service'
import SpeechRecognizerService from './services/speechRecognizer-service'
import AuthService from './services/auth-service'
import PhoneFilter from './filter/phone-filter'

import OnlineOfflineService from './services/onlineOffline-service'


let commonModule = angular.module('app.common', [
    Navbar.name,
    Navigation.name,
    Rightsidebar.name,
    MyComponents.name,
    PouchdbModule.name,
    ExternalComponents.name,
    DialogComponent.name,
    Const.name
]).service('PersonService', PersonService)
    .service('VehicleService', VehicleService)
    .service('TrailerService', TrailerService)
    .service('TransportService', TransportService)
    .service('ItemService', ItemService)
    .service('MessageService', MessageService)
    .service('DialogService', DialogService)
    .service('CompanyService', CompanyService)
    .service('AuthService',AuthService)
    .service("SpeechRecognizerService",SpeechRecognizerService)
    .service('OnlineOfflineService',OnlineOfflineService)
    .service('PrinterService',PrinterService)
    .filter('phoneFilter',()=>PhoneFilter.PhoneFilterFactory);

export default commonModule;
