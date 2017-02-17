class PersonPromptController {
    constructor() {
        "ngInject";
    }


    _getFirstRegistration(){
        if(this.usedVehicles.length){
            return this.usedVehicles[0].registration
        }else{
            return null;
        }
    }

    $onInit(){
        let sorted = [];
        if (this.person.usedVehicles) {
            let map = new Map(JSON.parse(this.person.usedVehicles));
            let countUsedVehiclesList = [];

            for (let [key, value] of map.entries()) {
                let elem = {registration: key, count: value};
                countUsedVehiclesList.push(elem);
            }

            sorted = countUsedVehiclesList.sort((e1, e2)=> {
                return e1.count < e2.count;
            });

        }

        this.usedVehicles = sorted;
        this.selectedVehicle = this._getFirstRegistration();
    }
}

export default PersonPromptController;
