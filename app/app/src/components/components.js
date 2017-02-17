import Login from './login/login'
import RecordTransport from './registration/vehicleGate/recordTransport';
import RecordPerson from './registration/personGate/recordPerson';

import Home from './home/home';
import RegistrationHistory from './registration/history/registrationHistory';
import ObjectsTab from './objectsTab/objectsTab';

import HistoryChart from './historyChart/historyChart';


let componentModule = angular.module('app.components', [
  RecordTransport.name,RecordPerson.name, Home.name, RegistrationHistory.name, ObjectsTab.name, Login.name,HistoryChart.name]);

export default componentModule;
