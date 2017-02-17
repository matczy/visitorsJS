class OnlineOfflineService {
    constructor($rootScope, $window,$http,$interval, $state) {
        "ngInject";
        this.$rootScope =  $rootScope;
        $rootScope.online= false;



        Offline.options = {checkOnLoad: true,checks: {image: {url: ()=> {
            return 'http://esri.github.io/offline-editor-js/tiny-image.png?_='
                + (Math.floor(Math.random() * 1000000000));
        }}, active: 'image'}}


        Offline.on('up', () => {
            $rootScope.online = true;
        });

        Offline.on('down', () => {
            $rootScope.online = false;
        });
        Offline.check();
        $rootScope.online = Offline.state === 'up';
    }

    $onInit(){
        $interval(()=>{
            Offline.check();
            $rootScope.online = Offline.state === 'up';
        },20000);
    }
    getCurrentOnlineStatus(){
        return  this.$rootScope.online;
    }
}


export default OnlineOfflineService;





