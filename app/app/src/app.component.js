import template from './app.html';
 // import './app.style';
import controller from './app.controller.js';



let appComponent = {
  template,
  controller,
  // $routeConfig: [
  //   {path: '/home', name: 'Home', component: 'home', useAsDefault: true},
  //   {path: '/objectsTab', name: 'ObjectsTab', component: 'objectsTab'},
  //   {path: '/person-recording', name: 'RecordPerson', component: 'recordPersonComponent'},
  //   {path: '/transport-recording', name: 'RecordTransport', component: 'recordTransportComponent'},
  // ]
};

export default appComponent;
