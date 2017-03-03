
class GateTypeController {
    constructor() {
        "ngInject";
        this.name="";
        this.class="";
    }


    $onInit(){
        if(this.type==='personGate'){
            this.name='Ruch osobowy';
            this.class="label-warcning";
        }else if(this.type==='transportGate'){
            this.name='Ruch kołowy';
            this.class="label-primary";
        }else if(this.type==='equipmentGate'){
            this.name='Rejestracja sprzęt';
            this.class="label-success";
        }
    }
}
export default GateTypeController;
