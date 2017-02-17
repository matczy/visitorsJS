import template from './itemList.html';
import controller from './itemList.controller';

let itemListComponent = {
  restrict: 'E',
  bindings: {
    items:'<',
    onClose:'&',
    disabled:'<'
  },
  template,
  controller
};

export default itemListComponent;
