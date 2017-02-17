
class DialogController {
    constructor() {
        "ngInject";
    }


    $onInit(){

    }

    ok(data) {
        console.log("to nie to poiwinno byc")
        this.close({$value: data});
    };

    cancel() {
        this.dismiss({$value: 'cancel'});
    };

}

export default DialogController;
