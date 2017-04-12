
class ItemTypeController {
    constructor() {
        "ngInject";
        this.name="";
        this.class="";
    }


    $onInit(){
        if(this.type==='Laptop'){
            this.name='Laptop';
            this.class="label-warning";
        }else if(this.type==='Kamera'){
            this.name='Kamera';
            this.class="label-primmary";
        }else if(this.type==='Inne'){
            this.name='Inne';
            this.class="label-danger"
        }
    }

    $onChanges(){
        if(this.type==='Laptop'){
            this.name='Laptop';
            this.class="label-warning";
        }else if(this.type==='Kamera'){
            this.name='Kamera';
            this.class="label-primmary";
        }else if(this.type==='Inne'){
            this.name='Inne';
            this.class="label-danger"
        }
    }
}
export default ItemTypeController;
