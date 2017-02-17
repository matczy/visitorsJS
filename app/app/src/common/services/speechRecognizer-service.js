

class SpeechRecognizerService {
    constructor($rootScope) {
        "ngInject"
        this.$rootScope = $rootScope;
        this.commands = {};
        this.listeningInputs = {};
    }


    addCommands(commands){
        this.commands = angular.extend(commands);
    }

    start(){
        annyang.init(this.commands, true);
        annyang.setLanguage('pl');
        annyang.addCommands(this.commands);
        annyang.debug(true);
        annyang.start();
    }

    pause(){
        annyang.pause();
    }

    reasume(){
        annyang.reasume();
    }

    addListeningInputs(inputs){
        angular.extend( this.listeningInputs,inputs )
    }
    clearListeningInputs(){
        this.listeningInputs = {};
    }
}


export default SpeechRecognizerService;





