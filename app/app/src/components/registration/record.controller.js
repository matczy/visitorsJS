class RecordController {
    constructor($rootScope, $scope, $stateParams, $state, MessageService,DialogService, CONST) {
        "ngInject";
        this.CONST = CONST;
        this.MessageService = MessageService;
        this._$rootScope = $rootScope;
        this.DialogService = DialogService;
    }




    successAction(message) {
        this.MessageService.showInfoMessage(message);
        this._$rootScope.$emit(this.CONST.HISTORY_TAB);
        this._$rootScope.$emit(this.CONST.REFRESH_ON_OBJECT);
    }

    toManyResultAction(data){
        this.DialogService.showToManyResults(data).then((data)=>{
            console.log('co zwocilismy',data)
        }).catch(error=>{
            console.log("jakis blad");
        })
    }

}

export default RecordController;
