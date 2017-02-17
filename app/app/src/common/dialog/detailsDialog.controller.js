import DialogController from './dialog.controller'
class DetailsDialogController extends DialogController{

    isTransport(gateType){
        return gateType === 'transportGate';
    }

    isPerson(gateType){
        return gateType === 'personGate';
    }
}

export default DetailsDialogController;
