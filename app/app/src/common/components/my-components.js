
import ActionButton from './buttons/action/actionButton';
import PersonPrompt from './person/personPrompt/personPrompt'
import DateRange from './visitCard/dataRange/dateRange'
import AddComment from './buttons/addComment/addComment'
import ItemsRecordField from './itemsRecordField/itemsRecordField'
import CreatePersonButton from './person/createPersonButton/createPersonButton'
import PersonRow from './personRow/personRow'
import PersonDetails from './personDetails/personDetails'
import PersonEdit from './personEdit/personEdit'
import PersonType from './personType/personType'

import VehicleRow from './vehicleRow/vehicleRow'
import VehicleDetails from './vehicleDetails/vehicleDetails'
import VehicleType from './vehicleType/vehicleType'
import VehicleEdit from './vehicleEdit/vehicleEdit'

import TrailerRow from './trailerRow/trailerRow'
import ItemRow from './itemRow/itemRow'
import ItemDetails from './itemDetails/itemDetails'
import ItemEdit from './itemEdit/itemEdit'

import TransportRow from './transportRow/transportRow'
import TransportDetails from './transportDetails/transportDetails'


import HistoryRow from './historyRow/historyRow'
import HistoryDetails from './historyDetails/historyDetails'

import CompanyRow from './companyRow/companyRow'
import CompanyDetails from './companyDetails/companyDetails'
import CompanyEdit from './companyEdit/companyEdit'




let myComponents = angular.module('mycomponents', [
    ActionButton.name, PersonPrompt.name ,
    DateRange.name ,AddComment.name,ItemsRecordField.name,CreatePersonButton.name,
    PersonRow.name,PersonDetails.name,PersonEdit.name,PersonType.name,
    VehicleRow.name,VehicleDetails.name,VehicleType.name,VehicleEdit.name,
    TrailerRow.name,
    ItemRow.name,ItemDetails.name,ItemEdit.name,
    TransportRow.name,TransportDetails.name,
    HistoryRow.name,HistoryDetails.name,
    CompanyRow.name,CompanyDetails.name,CompanyEdit.name
]);


export default myComponents;
