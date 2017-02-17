import Vehicle from '../../common/components/model/vehicle'
class TrailerService {
    constructor(PouchdbService, $q) {
        "ngInject";
        this.PouchdbService = PouchdbService;
        this.$q = $q;
    }


    loadTrailers() {
        return this.PouchdbService.getAllDocuments('trailers').then((result)=> {
            return result.rows.map((elem)=> {
                return elem.doc
            });
        });
    }


    putTrailer(trailer) {
        console.log(trailer)
        return this.PouchdbService.addDocument(trailer);
    }

    create(trailer){
        let id = 'trailers' + trailer.registration.toLowerCase() + '-' + new Date().toISOString();
        let newTrailer = new Vehicle(id,trailer.registration.toLowerCase());

        return this.PouchdbService.addDocument(newTrailer);
    }

    getOrCreate(trailer) {
        if(trailer && trailer.registration){
            return this.findByRegistration(trailer.registration).then((foundedTrailer)=> {
                return foundedTrailer;
            }).catch((error)=> {
                switch (error.message) {
                    case 'NOT_FOUND_VEHICLE':
                        return this.create(trailer).then((data)=> {
                            return this.getTrailer(data.id)
                        });

                    case 'TO_MANY_RESULTS_VEHICLE':
                        return this.$q.reject({message:'TO_MANY_RESULTS_VEHICLE',data:error.data});
                }
            });
        }
    }



    findByRegistration(registration) {
        return this.PouchdbService.searchDocumentByName(registration.replace(/ /g, ''), 'trailers').then((data)=> {
            switch (data.rows.length) {
                case 0:
                    return this.$q.reject({message:'NOT_FOUND_VEHICLE'});
                case 1:
                    return data.rows[0].doc;
                default:
                    return this.$q.reject({message:'TO_MANY_RESULTS_VEHICLE',data:byName.rows});
            }
        }).catch(error=>{
            return this.$q.reject(error)
        });

    }

    getTrailer(id) {
        return this.PouchdbService.getDocument(id);
    }


}

export default TrailerService;





