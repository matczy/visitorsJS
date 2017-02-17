import registrationHistoryComponent from './registrationHistory.component';

let registrationHistoryModule = angular.module('registrationHistoryModule', [])
.component('registrationHistory', registrationHistoryComponent);

export default registrationHistoryModule;
