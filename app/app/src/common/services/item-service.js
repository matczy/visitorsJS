import Item from './../components/model/item'
class ItemService {
    constructor(PouchdbService, $q) {
        "ngInject";
        this.PouchdbService = PouchdbService;
        this.$q = $q;
    }


    loadItems() {
        return this.PouchdbService.getAllDocuments('items').then((result)=> {
            return result.rows.map((elem)=> {
                return elem.doc
            });
        });
    }


    putItem(item) {
        return this.PouchdbService.addDocument(item);
    }

    create(item) {
        let newItem = new Item('items' + item.code.toLowerCase() + '-' + new Date().toISOString(), item.name, item.code, item.type, item.isInternal)
        return this.PouchdbService.addDocument(newItem);
    }

    getOrCreate(item) {
        if (item && item.code && item.name) {
            return this.findByCodeOrName(item.code, item.name).then(foundedItem=> {
                return foundedItem;
            }).catch((error)=> {
                switch (error.message) {
                    case 'NOT_FOUND_ITEM':
                        return this.create(item).then(data=> {
                            return this.getItem(data.id)
                        });
                    case 'TO_MANY_RESULTS_ITEM':
                        return this.$q.reject({message: 'TO_MANY_RESULTS_ITEM', data: error.data});
                }
            });
        }
    }

    findByCodeOrName(code, name) {
        return this.$q.all([this.PouchdbService.searchDocumentByName(code.replace(/ /g, ''), 'items'),
            this.PouchdbService.searchDocumentByName(name.replace(/ /g, ''), 'items')])
            .then((result)=> {
                let byCode = result[0];
                let byName = result[1];
                if (byCode.rows.length > 0) {
                    switch (byCode.rows.length) {
                        case 1:
                            return byCode.rows[0].doc;
                        default:
                            return this.$q.reject({message: 'TO_MANY_RESULTS_ITEMS', data: byCode.rows});
                    }
                } else {
                    switch (byName.rows.length) {
                        case 0:
                            return this.$q.reject({message: 'NOT_FOUND_ITEM'});
                        case 1:
                            return byName.rows[0].doc;
                        default:
                            return this.$q.reject({message: 'TO_MANY_RESULTS_ITEM', data: byName.rows});
                    }
                }

            }).catch(error=> {
                return this.$q.reject(error)
            });
    }

    getItem(id) {
        return this.PouchdbService.getDocument(id);
    }


}

export default ItemService;





