class NavigationController {
    constructor($scope, $rootScope, CONST, AuthService,localStorageService){
        "ngInject";
        this._$scope = $scope;
        this._$rootScope = $rootScope;
        this.CONST = CONST;
        this.AuthService = AuthService;
        this.localStorageService = localStorageService;
    }

    $onInit() {
        this.isShowedSidebar = false;
    }

    $onInit(){
        this._$rootScope.$on('showHideNavigationPanel',()=>{
            this.isShowedSidebar = !this.isShowedSidebar;
        });
        this._$rootScope.$on('loggedEvent', (event,data)=>{
            this.isLogged = data;
            this.loggedUser = this.localStorageService.get('userName');

        });
    }

    clickLink(name){

        this.isShowedSidebar = !this.isShowedSidebar;
        this._$rootScope.$broadcast(this.CONST.HISTORY_TAB);
        if(name==='home' || name==='objectsTab'){
            this._$rootScope.$broadcast(this.CONST.HIDE_RIGHT_PANEL)
        }else{
            this._$rootScope.$broadcast(this.CONST.SHOW_RIGHT_PANEL)
        }
    }
}

export default NavigationController