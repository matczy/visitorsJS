class NavbarController {
    constructor(NavbarService,$rootScope,AuthService, localStorageService,PouchdbService, $state,$scope){
        "ngInject";
        this._navbarService = NavbarService;
        this._$rootScope = $rootScope;
        this.$state = $state;
        this.AuthService = AuthService;
        this.localStorageService = localStorageService;
        this.PouchdbService = PouchdbService
        this.db = PouchdbService.getRemoteDatabase();
        $scope.$watch(()=> {
            return $rootScope.online;
        }, ()=> {
            this.online = $rootScope.online;
        }, true);
    }

    $onInit(){

        this._$rootScope.$on('changeNavigationStateEvent',(event, data)=>{
            this.stateName=data.title.pl;//TODO refaktor
        });

        this._$rootScope.$on('loggedEvent', (event,data)=>{
           this.isLogged = data;
            this.loggedUser = this.localStorageService.get('userName');
        });
    }

    changeNavigationState() {
        this._$rootScope.$emit('showHideNavigationPanel')
    }

    logout(){
        this.db.logout((succces)=>{
            this.localStorageService.remove(this.localStorageService.get(this.localStorageService.get('userName')))
            this.loggedUser = this.localStorageService.set('userName','');
            this.$state.go('login')
        }).catch(error=>{
            console.log(error);
        })

    }
}

export default NavbarController