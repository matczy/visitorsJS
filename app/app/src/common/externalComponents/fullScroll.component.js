class FullScrollComponent {
    constructor($timeout){
        this.restrict= 'A';
        this._$timeout = $timeout;

        }

        link(scope, element, attrs, ngModel) {
             this._$timeout(function() {
                   element.slimscroll({
                       height: '100%',
                       railOpacity: 0.9
                   });
            });
        }

    static directiveFactory($timeout){
        FullScrollComponent.instance = new FullScrollComponent($timeout);
        return FullScrollComponent.instance;
    }

}
FullScrollComponent.directiveFactory.$inject = ['$timeout'];

export default FullScrollComponent;