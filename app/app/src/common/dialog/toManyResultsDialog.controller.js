import DialogController from './dialog.controller'
class ToManyResultsDialogController extends DialogController{

    constructor(CompanyService){
        "ngInject";
        super();
        this.CompanyService = CompanyService;
        this.selected = [];
    }

    toggle(item, list){
        var idx = list.indexOf(item._id);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item._id);
        }
    }

    isChecked(item, list){
        return list.indexOf(item._id) > -1;
    }

    ok(data) {
        return this.CompanyService.remove(this.selected).then((result)=>{
            this.close({$value: result});
        });
    };
}

export default ToManyResultsDialogController;
