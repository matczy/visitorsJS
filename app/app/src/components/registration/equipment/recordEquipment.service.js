import GateAction from '../../../common/components/model/gateAction'


class RecordEquipmentService {
    constructor(GateActionService) {
        "ngInject";
        this.GateActionService = GateActionService;

    }


    recordEntry(item) {
        return this._tryRecord(item, 'Entry');
    }

    recordExit(item) {
        return this._tryRecord(item, 'Exit')
    }

    _tryRecord(item, action) {
        let gateAction = new GateAction('gateAction' + action + 'EquipmentGate' + '-' + new Date().toISOString(), null, null, null, action, 'equipmentGate');
        gateAction.item = item;
        return this.GateActionService.saveGateAction(gateAction);
    }



}

export default RecordEquipmentService;





