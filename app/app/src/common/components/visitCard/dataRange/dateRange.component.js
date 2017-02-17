import template from './dateRange.html';
import controller from './dateRange.controller.js';

let dateRangeComponent = {
  restrict: 'E',
  bindings: {
    startDate:'=',
    endDate:'='
  },
  template,
  controller,
};

export default dateRangeComponent;
