class LoginController {
    constructor($rootScope, CONST, $state,localStorageService,AuthService, PouchdbService){
        "ngInject";

        this._$rootScope = $rootScope;
        this.CONST = CONST;
        this.$state = $state;
        this.localStorageService = localStorageService;
        this.AuthService = AuthService;
        this.PouchdbService = PouchdbService;
    }

    $onInit(){
        this.credentials = {username: '', password: '', rememberMe: false};
        this.authenticationError="";
    }

    $onChanges(changes){
    }


    login(event, creddentials) {
        event.preventDefault();
        let db = this.PouchdbService.getRemoteDatabase();
        let ajaxOpts = {
            ajax: {
                headers: {
                    Authorization: 'Basic ' + window.btoa(creddentials.username + ':' +  creddentials.password)
                }
            }
        };
        db.login(creddentials.username,  creddentials.password, ajaxOpts).then(()=> {
            this.localStorageService.set(creddentials.username, true);
            this.localStorageService.set('userName',creddentials.username);
            this.AuthService.setLoggedUser(creddentials.username);
            this.$state.go('home');
            this.authenticationError={}
        }).catch(()=> {
            this.authenticationError="Niepoprawny login lub hasło. Spróbuj ponownie"
        });

    }

}

export default LoginController;