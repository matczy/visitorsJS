import template from './itemsRecordField.html';
import controller from './itemsRecordField.controller';

let itemsListComponent = {
  restrict: 'E',
  bindings: {
    items:'<',
    selectedItems:'<',
    onClose:'&',
    disabled:'<'
  },
  template,
  controller
};

export default itemsListComponent;
