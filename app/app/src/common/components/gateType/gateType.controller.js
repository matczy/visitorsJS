
class GateTypeController {
    constructor() {
        "ngInject";
        this.name="";
        this.class="";
    }


    $onInit(){
        if(this.type==='personGate'){
            this.name='Ruch osobowy';
            this.class="label-warning";
        }else if(this.type==='transportGate'){
            this.name='Ruch kołowy';
            this.class="label-primmary";
        }
    }
}
export default GateTypeController;
