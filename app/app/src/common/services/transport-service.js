import Transport from '../components/model/transport'


class TransportService {
    constructor(PouchdbService, $q) {
        "ngInject";
        this.PouchdbService = PouchdbService;
        this.$q = $q;
    }


    loadTransports() {
        return this.PouchdbService.getAllDocuments('transport').then((result)=> {
            return result.rows.map((elem)=> {
                return elem.doc
            });
        });
    }

    put(transport) {
        console.log(transport)
        return this.PouchdbService.addDocument(transport);
    }

    getTransport(id) {
        return this.PouchdbService.getDocument(id);
    }

    create(transport) {
        transport._id = 'transport-' + new Date().toISOString();
        return this.put(transport).then((response)=> {
            return this.getTransport(response.id)
        });
    }


}


export default TransportService;





