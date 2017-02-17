import dateRangeComponent from './dateRange.component';

let dateRangeModule = angular.module('dateRangeModule', [])
.component('myDateRange', dateRangeComponent);

export default dateRangeModule;
