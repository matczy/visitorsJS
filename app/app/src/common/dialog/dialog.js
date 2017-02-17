import dialogComponent from './dialog.component';
import wrongLocationDialogComponent from './wrongLocationDialog.component';
import toManyResultsDialogComponent from './toManyResultsDialog.component';
import detailsComponent from './detailsDialog.component';
import personComponent from './person/personDialog.component';
import vehicleComponent from './vehicle/vehicleDialog.component'
import itemComponent from './item/itemDialog.component'
import companyComponent from './company/companyDialog.component'

let dialogModule = angular.module('dialogModule', [])

    .component('dialogComponent', dialogComponent)
    .component('wrongLocationDialogComponent', wrongLocationDialogComponent)
    .component('toManyResultsDialogComponent', toManyResultsDialogComponent)
    .component('detailsDialog', detailsComponent)
    .component('personDialog', personComponent)
    .component('vehicleDialog', vehicleComponent)
    .component('itemDialog', itemComponent)
    .component('companyDialog', companyComponent);


export default dialogModule;
