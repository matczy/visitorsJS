import RecognizationController from '../../../../common/components/recognization/recognization.controller'
class RegistrationVehicleFieldController extends RecognizationController{
  constructor($scope, $element,SpeechRecognizerService, $rootScope) {
    "ngInject";
        super($scope, $element,SpeechRecognizerService,$rootScope)
      $scope.$watch(()=> {
          return $rootScope.online;
      }, ()=> {
          this.online = $rootScope.online;
      }, true);
  };

}

export default RegistrationVehicleFieldController;
