import addCommentComponent from './addComment.component';

let addCommentModule = angular.module('addCommentModule', [])
.component('addComment', addCommentComponent);

export default addCommentModule;
