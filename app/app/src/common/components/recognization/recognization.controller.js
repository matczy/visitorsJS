import mic from '../../../../assets/image/mic.gif'
import micAnimate from '../../../../assets/image/mic-animate.gif'

class RecognizationController {
    constructor($scope, $element,SpeechRecognizerService, $rootScope) {
        "ngInject";
        this.SpeechRecognizerService = SpeechRecognizerService;

        this.$scope = $scope;
        this.inputsName = [];

        angular.forEach($element.find("input"), (node)=>{
            this.inputsName.push(node.name);}
        );

    };

    $onInit(){


        let isRecording={};
        _.forEach(this.inputsName, (elem=>{
            let element = {};
            element[this.formName.$name+'_'+elem]=false;
            angular.extend( isRecording,element )
        }));
        this.SpeechRecognizerService.addListeningInputs(isRecording);
        this.micSrc = 'visitor1\\'+mic;
        this.micAnimateSrc = 'visitor1\\'+micAnimate;
    }


    showRecordIcon(field,form){
        let isRecording = this.SpeechRecognizerService.listeningInputs;
        return isRecording[form.$name+'_'+field]
    }

    clickRecordIcon(field,form){
        let isRecording = this.SpeechRecognizerService.listeningInputs;

        let elemName = form.$name+'_'+field;
        let newValue = !isRecording[form.$name+'_'+field];
        for(let property in isRecording){
            if(isRecording.hasOwnProperty(property)){
                isRecording[property]=false;
            }
        }

        if(newValue){
            isRecording[form.$name+'_'+field]= newValue;
            this. $scope.$emit("startRecording",{field:elemName, value:newValue});
        }else{
            this. $scope.$emit("stopRecording");
        }

    }

}

export default RecognizationController;