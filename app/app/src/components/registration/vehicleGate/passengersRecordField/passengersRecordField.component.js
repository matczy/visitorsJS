import template from './passengersRecordField.html';
import controller from './passengersRecordField.controller';

let passengerListComponent = {
  restrict: 'E',
  bindings: {
    passengers:'<',
    onClose:'&',
    disabled:'<'
  },
  template,
  controller
};

export default passengerListComponent;
