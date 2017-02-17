import personPromptComponent from './personPrompt.component';

let personPromptModule = angular.module('personPromptModule', [])
.component('personPrompt', personPromptComponent);

export default personPromptModule;
