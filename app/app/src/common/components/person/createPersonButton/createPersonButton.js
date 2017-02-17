import createPersonButtonComponent from './createPersonButton.component';

let createPersonButtonModule = angular.module('createPersonButtonModule', [])
.component('createPersonButton', createPersonButtonComponent);

export default createPersonButtonModule;
