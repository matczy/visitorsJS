import RecognizationController from '../../recognization/recognization.controller'

class AddCommentController extends RecognizationController {
    constructor($scope, $element, SpeechRecognizerService,$rootScope) {
        "ngInject";
        super($scope, $element, SpeechRecognizerService,$rootScope)
        this.micSrc = "../../../assets/image/mic.gif";
        this.micAnimateSrc = "../../../assets/image/mic-animate.gif";
        $scope.$watch(()=> {
            return $rootScope.online;
        }, ()=> {
            this.online = $rootScope.online;
        }, true);
    };


    $onInit() {
        this.isActive = false;
        this.temporatyValue = '';
    }

    editComment() {
        this.temporatyValue = angular.copy(this.comment);
        this.isActive = true;
    }

    save() {
        this.isActive = false;
    }

    cancel() {
        this.comment = this.temporatyValue;
        this.isActive = false;
    }


}

export default AddCommentController;
