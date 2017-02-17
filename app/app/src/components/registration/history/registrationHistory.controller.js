class RegistrationHistoryController {
  constructor(DialogService) {
    "ngInject";
      this.DialogService = DialogService;
    };


    showDetails(gateAction){
      this.DialogService.showDetails(gateAction);
    }
}

export default RegistrationHistoryController;
