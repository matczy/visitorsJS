import RecognizationController from '../../../../common/components/recognization/recognization.controller'


class TrailerFieldController extends RecognizationController{
  constructor($scope,$element,SpeechRecognizerService,$rootScope) {
    "ngInject";
    super($scope, $element,SpeechRecognizerService,$rootScope);
    this.isActive = false;
    this.temporatyValue = '';
    this.$scope=$scope;
      $scope.$watch(()=> {
          return $rootScope.online;
      }, ()=> {
          this.online = $rootScope.online;
      }, true);

  };


  $onChanges(){
      if (this.trailerRegistration) {
        this.isActive = true;
      }else{
        this.isActive = false;
      }
  }

  changeTrailerRegistration(registration){
    if(!registration){
      this.isActive = false;
    }
  }

  editTrailer(){
    this.temporatyValue = angular.copy(this.trailerRegistration);
    this.isActive = true;
  }

  save(){
    this.isActive = false;

  }
  cancel(){
    this.trailerRegistration = this.temporatyValue;
    this.isActive = false;
  }

}


export default TrailerFieldController;
