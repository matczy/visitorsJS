
class PersonTypeController {
    constructor() {
        "ngInject";
        this.name="";
        this.class="";
    }


    $onInit(){
       let type= this.type;
        if(this.type==='GUEST'){
            this.name='gość';
            this.class="label-warning";
        }else if(this.type==='INTERNAL_WORKER'){
            this.name='p.wewnętrzny';
            this.class="label-primmary";
        }else if(this.type==='EXTERNAL_WORKER'){
            this.name='p.zewnętrzny';
            this.class="label-danger"
        }
    }
}

export default PersonTypeController;
