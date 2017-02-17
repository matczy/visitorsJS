import template from './addComment.html';
import controller from './addComment.controller.js';

let addCommentComponent = {
  restrict: 'E',
  bindings: {
    onClick:"&",
    color:'@',
    title:'@',
    comment:'=',
    disabled:'<',
      formName:'<'
  },
  template,
  controller
};

export default addCommentComponent;
