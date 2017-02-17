import Vehicle from '../components/model/vehicle'

//TODO dodac mapowanie na klase przy pobieraniu
class VehicleService {
    constructor(PouchdbService, $q) {
        "ngInject";
        this.PouchdbService = PouchdbService;
        this.$q = $q;
    }


    loadVehicles() {
        return this.PouchdbService.getAllDocuments('vehicles').then((result)=> {
            return result.rows.map((elem)=> {
                return elem.doc
            });
        });
    }

    putVehicle(vehicle) {
        console.log(vehicle)
        return this.PouchdbService.addDocument(vehicle);
    }

    create(vehicle) {
        let id = 'vehicles' + vehicle.registration.toLowerCase() + '-' + new Date().toISOString();
        let newVehicle = new Vehicle(id, vehicle.registration.toLowerCase());

        return this.PouchdbService.addDocument(newVehicle);
    }

    getOrCreate(vehicle) {
        if (vehicle && vehicle.registration){
            return this.findByRegistration(vehicle.registration).then((foundedVehicle)=> {
                return foundedVehicle;
            }).catch((error)=> {
                switch (error.message) {
                    case 'NOT_FOUND_VEHICLE':
                        return this.create(vehicle).then((data)=> {
                            return this.getVehicle(data.id)
                        });

                    case 'TO_MANY_RESULTS_VEHICLE':
                        return this.$q.reject({message: 'TO_MANY_RESULTS_VEHICLE', data: error.data});
                }
            });
        }

    }


    findByRegistration(registration) {
        return this.PouchdbService.searchDocumentByName(registration.replace(/ /g, ''), 'vehicles').then((data)=> {
            switch (data.rows.length) {
                case 0:
                    return this.$q.reject({message: 'NOT_FOUND_VEHICLE'});
                case 1:
                    return data.rows[0].doc;
                default:
                    return this.$q.reject({message: 'TO_MANY_RESULTS_VEHICLE', data: byName.rows});
            }
        }).catch(error=> {
            return this.$q.reject(error)
        });
    }


    getVehicle(id) {
        return this.PouchdbService.getDocument(id);
    }


}

export default VehicleService;





