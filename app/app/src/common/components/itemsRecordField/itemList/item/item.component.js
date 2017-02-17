import template from './item.html';

let itemComponent = {
  restrict: 'E',
  bindings: {
    item:'<',
    remove:'&',
    disabled:'<'
  },
  template,
};

export default itemComponent;
