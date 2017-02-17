import ICheckComponent from './icheck.component'
import FullScrollComponent from './fullScroll.component'


let externalComponentsModule = angular.module('externalComponentsModule', [])
    .directive('icheck', ICheckComponent.directiveFactory)
    .directive('fullScroll', FullScrollComponent.directiveFactory)
export default externalComponentsModule;
