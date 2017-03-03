
class OnObjectRowController {
    constructor($state, $rootScope,CONST,RecordPersonService,MessageService,PrinterService) {
        "ngInject";
        this.$state = $state;
        this.$rootScope =$rootScope;
        this.CONST =CONST;
        this.RecordPersonService = RecordPersonService;
        this.MessageService = MessageService;
        this.PrinterService = PrinterService;
    }


    $onInit(){

    }


    isPerson(){
        if(this.object){
            return this.object._id.indexOf('persons')!==-1
        }
    }

    isVehicle(){
        if(this.object){
            return this.object._id.indexOf('vehicles')!==-1
        }
    }
    isTrailer(){
        if(this.object){
            return this.object._id.indexOf('trailers')!==-1
        }
    }
    goToRecordPage(object){
        if(this.isPerson(object)){
            this.$state.go('person-recording',{personId:object._id});
        }else if(this.isVehicle(object)){
            this.$state.go('transport-recording',{vehicleId:object._id});
        }else{
            this.$state.go('transport-recording',{trailerId:object._id});
        }
        this.$rootScope.$broadcast(this.CONST.SHOW_RIGHT_PANEL)

    }

    immediatelyExitAction(object){
        if(this.isPerson(object)){
            this.RecordPersonService.recordExit(object, {},{}, [], "immediatelyExitAction").then((sucessRecordingResponse)=> {
                this.MessageService.showInfoMessage("Poprawne zarejestrowanie wyjścia " + sucessRecordingResponse.person.surnameAndName);
            });
        }
    }

    printVisitCard(object){
        this.PrinterService.print(object);
    }
}

export default OnObjectRowController;
