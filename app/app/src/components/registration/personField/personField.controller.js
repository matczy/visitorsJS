import RecognizationController from '../../../common/components/recognization/recognization.controller'

class PersonFieldController extends RecognizationController{
    constructor($scope, $element,SpeechRecognizerService,$rootScope, CompanyService) {
        "ngInject";
        super($scope, $element,SpeechRecognizerService,$rootScope)
        $scope.$watch(()=> {
            return $rootScope.online;
        }, ()=> {
            this.online = $rootScope.online;
        }, true);
        this.CompanyService = CompanyService;

       this.$scope = $scope;
       this.$rootScope = $rootScope;
    };


    $onInit(){
        this.$scope.$watch( ()=> {
            return this.person.company.name;

        }, (newVal, oldVal)=> {
            this.checkCompanyIsOnBlackList(newVal)
        });
    }

    checkCompanyIsOnBlackList(name){
        console.log(name)
        this.CompanyService.findByName(name).then((company)=>{
            this.$rootScope.$broadcast('isOnBlackList',company.isOnBlackList) ;
        }).catch(()=>{
            this.$rootScope.$broadcast('isOnBlackList',false) ;

        })
    }



}

export default PersonFieldController;
