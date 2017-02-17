import Person from '../components/model/person'
import Vehicle from '../components/model/vehicle'
import Item from '../components/model/item'
import Company from '../components/model/company'

class DialogService {
    constructor($uibModal) {
        "ngInject";
        this.$uibModal = $uibModal;

    }
    showWrongLocationMessage(objects){
        let modalInstance =this.$uibModal.open({
            animation:true,
            component:'wrongLocationDialogComponent',
            resolve:{
                title:()=>{
                    return 'Uwaga';
                },
                objects:()=>{
                    return objects;
                }
            }
        });

        return modalInstance.result;
    }


    showToManyResults(data){
        let modalInstance =this.$uibModal.open({
            animation:true,
            component:'toManyResultsDialogComponent',
            resolve:{
                title:()=>{
                    return 'Uwaga';
                },
                type:()=>{
                   return data.message;
                },
                data:()=>{
                    return data.data;
                }
            }
        });

        return modalInstance.result;
    }

    showDetails(gateAction){
        let modalInstance =this.$uibModal.open({
            animation:true,
            component:'detailsDialog',
            resolve:{
                title:()=>{
                    return 'Szczegóły';
                },
                gateAction:()=>{
                    return gateAction;
                }
            }
        });

        return modalInstance.result;
    }

    createUpdatePerson(){
        let modalInstance =this.$uibModal.open({
            animation:true,
            component:'personDialog',
            resolve:{
                title:()=>{
                    return 'Utwórz osobe';
                },
                person:()=>{
                    return new Person();
                },
                types:()=>{
                    return ['GUEST','INTERNAL_WORKER','EXTERNAL_WORKER']
                }
            }
        });
        return modalInstance.result;
    }

    createUpdateVehicle(){
        let modalInstance =this.$uibModal.open({
            animation:true,
            component:'vehicleDialog',
            resolve:{
                title:()=>{
                    return 'Utwórz pojazd';
                },
                vehicle:()=>{
                    return new Vehicle();
                },
                types:()=>{
                    return ['VEHICLE', 'TRAILER']
                }
            }
        });
        return modalInstance.result;
    }

    createUpdateItem(){
        let modalInstance =this.$uibModal.open({
            animation:true,
            component:'itemDialog',
            resolve:{
                title:()=>{
                    return 'Utwórz przedmiot';
                },
                item:()=>{
                    return new Item();
                },
                types:()=>{
                    return ['Laptop', 'Kamera','Inne']
                }
            }
        });
        return modalInstance.result;
    }

    createUpdateCompany(){
        let modalInstance =this.$uibModal.open({
            animation:true,
            component:'companyDialog',
            resolve:{
                title:()=>{
                    return 'Utwórz firmę';
                },
                company:()=>{
                    return new Company();
                },
                companies:(CompanyService)=>{
                    "ngInject"
                    return CompanyService.loadCompanies();
                }
            }
        });
        return modalInstance.result;
    }
    showDialog() {
        let modalInstance =this.$uibModal.open({
            animation:true,
            component:'dialogComponent',
            size:'lg',
            resolve:{
                title:()=>{
                   return 'Title dialog';
                }
            }
        });

    return modalInstance.result;
}


}


export default DialogService;





