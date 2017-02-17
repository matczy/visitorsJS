
class AuthService {
    constructor() {
        "ngInject";
        this.loggedUser = "";
        this.logged = false;
    }

    setLoggedUser(userName){
        this.loggedUser = userName
    }
    isLogged(value){
        this.logged =value;
    }
    getLoggedUser(){
        return this.loggedUser;
    }
    getIsLogged(){
        return this.logged;
    }
}

export default AuthService;





