import RecognizationController from '../../../../common/components/recognization/recognization.controller'


class ContactPersonFieldController extends RecognizationController{
    constructor($scope,$element,SpeechRecognizerService,$rootScope) {
        "ngInject";
        super($scope, $element,SpeechRecognizerService,$rootScope);
        $scope.$watch(()=> {
            return $rootScope.online;
        }, ()=> {
            this.online = $rootScope.online;
        }, true);


  }

  $onInit(){
    if(!this.disabled){
      this.disabled=false;
    }
  }
 
}

export default ContactPersonFieldController;
