class ICheckComponent {
    constructor($timeout){
        this.restrict= 'A';
            this.require= 'ngModel';
            this._$timeout = $timeout;

        }

        link(scope, element, attrs, ngModel) {
            console.log(this)
             this._$timeout(function() {
                var value;
                value = attrs['value'];
                scope.$watch(attrs['ngModel'], function(newValue){
                    element.iCheck('update');
                })

                return element.iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                    if (element.attr('type') === 'checkbox' && attrs['ngModel']) {
                        scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if (element.attr('type') === 'radio' && attrs['ngModel']) {
                        return scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }
                });
            });
        }

    static directiveFactory($timeout){
        ICheckComponent.instance = new ICheckComponent($timeout);
        return ICheckComponent.instance;
    }

}
 ICheckComponent.directiveFactory.$inject = ['$timeout'];

export default ICheckComponent;