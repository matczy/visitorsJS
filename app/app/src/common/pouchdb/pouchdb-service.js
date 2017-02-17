class PouchdbService {
    constructor(pouchDB, $q) {
        "ngInject";
        this.pouchDB = pouchDB;
        this.$q = $q;
        this.db = null;
    }


    createDatabase(databaseName) {
        this.db = this.pouchDB(databaseName);

        return this.db;
    }

    getRemoteDatabase(){
        return this.remoteDatabase;
    }

    createRemoteDatabase(database, options){
        this.remoteDatabase = this.pouchDB(database,options);
        return this.remoteDatabase;
    }

    addDocument(document) {
        return this.db.put(document);
    }

    addAllDocuments(documents) {
        return this.db.bulkDocs(documents);
    }

    getDocument(id) {
        return this.db.get(id,{include_docs: true});
    }

    searchDocumentByName(name, prefix){
        name = name.toLowerCase()
        return this.db.allDocs(
            {include_docs: true,startkey: prefix+name+'-', endkey:prefix+name+'-'+ '\uffff'});
    }

    getAllDocuments(prefix) {
        return this.db.allDocs(
            {include_docs: true,startkey: prefix, endkey: prefix + '\uffff'});
    }

    getAllDocumentsPaging(prefix, number){
        return this.db.allDocs(
            {include_docs: true,startkey: prefix + '\uffff', endkey: prefix,descending : true,limit : number });
    }


    listenChanges(callback){
        let changes= this.db.changes({
            since: 'now',
            live: true,
            include_docs: false
        }).on('change', function(change) {
            callback(change);
        }).on('complete', function (complete) {
            console.log("complete")
        }).on('error', function (err) {
        });

    }
    remove(id){
        return this.db.get(id).then((doc)=> {
            return this.db.remove(doc);
        });
    }


    query(name,options){
       return this.db.query(name,options);
    }


    createHistoryViewsForMonth(){
        var ddoc = {
            _id: '_design/getLastMonthFromGateAction',
            views: {
                by_date_entry_person_gate: {
                    map: function (doc){
                        if(doc._id.indexOf('gateActionEntryPersonGate')!=-1 &&(doc.action.date && doc.action.type)){
                            let timestampFromDoc =new Date(doc.action.date).getTime() ;
                            let timestamp = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
                            if(timestampFromDoc > timestamp){
                                let date = doc.action.date.substring(0,10);
                                emit(date, doc.action);//(key,value)
                            }

                        }
                    }.toString(),
                    reduce: '_count'

                },
                by_date_exit_person_gate: {
                    map: function (doc){
                        if(doc._id.indexOf('gateActionExitPersonGate')!=-1 &&(doc.action.date && doc.action.type)){
                            let timestampFromDoc =new Date(doc.action.date).getTime() ;
                            let timestamp = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
                            if(timestampFromDoc > timestamp){
                                let date = doc.action.date.substring(0,10);
                                emit(date, doc.action);//(key,value)
                            }
                        }
                    }.toString(),
                    reduce: '_count'

                },
                by_date_entry_transport_gate: {
                    map: function (doc){
                        if(doc._id.indexOf('gateActionEntryTransportGate')!=-1 &&(doc.action.date && doc.action.type)){
                            let timestampFromDoc =new Date(doc.action.date).getTime() ;
                            let timestamp = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
                            if(timestampFromDoc > timestamp){
                                let date = doc.action.date.substring(0,10);
                                emit(date, doc.action);//(key,value)
                            }
                        }
                    }.toString(),
                    reduce: '_count'

                },
                by_date_exit_transport_gate: {
                    map: function (doc){
                        if(doc._id.indexOf('gateActionExitTransportGate')!=-1 &&(doc.action.date && doc.action.type)){
                            let timestampFromDoc =new Date(doc.action.date).getTime() ;
                            let timestamp = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
                            if(timestampFromDoc > timestamp){
                                let date = doc.action.date.substring(0,10);
                                emit(date, doc.action);//(key,value)
                            }
                        }
                    }.toString(),
                    reduce: '_count'

                },
                last_history :{
                    map: function (doc){
                        if(doc._id.indexOf('gateAction')!=-1 &&(doc.action.date && doc.action.type)){
                            let timestampFromDoc =new Date(doc.action.date).getTime() ;
                            let timestamp = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
                            if(timestampFromDoc > timestamp){
                                emit(doc);//(key,value)
                            }
                         }
                    }.toString(),
                }

            }
        };
        this.db.put(ddoc).then(function () {
            // success!
        }).catch(function (err) {
            // some error (maybe a 409, because it already exists?)
        });


    }

    createHistoryViewsForDay(){
        var ddoc = {
            _id: '_design/getLastDayFromGateAction',
            views: {
                by_date_entry_person_gate: {
                    map: function (doc){
                        if(doc._id.indexOf('gateActionEntryPersonGate')!=-1 &&(doc.action.date && doc.action.type)){
                            let timestampFromDoc =new Date(doc.action.date).getTime() ;
                            let timestamp = new Date().getTime() - (24 * 60 * 60 * 1000);
                            if(timestampFromDoc > timestamp){
                                let dateTime = moment(timestampFromDoc).format("YYYY-MM-DD HH:mm");

                                let date = dateTime.substring(0,10)+" "+dateTime.substring(11,13)+":00";
                                emit(date, doc.action);//(key,value)
                            }

                        }
                    }.toString(),
                    reduce: '_count'

                },
                by_date_exit_person_gate: {
                    map: function (doc){
                        if(doc._id.indexOf('gateActionExitPersonGate')!=-1 &&(doc.action.date && doc.action.type)){
                            let timestampFromDoc =new Date(doc.action.date).getTime() ;
                            let timestamp = new Date().getTime() - (24 * 60 * 60 * 1000);
                            if(timestampFromDoc > timestamp){
                                let dateTime = moment(timestampFromDoc).format("YYYY-MM-DD HH:mm");

                                let date = dateTime.substring(0,10)+" "+dateTime.substring(11,13)+":00";
                                emit(date, doc.action);//(key,value)
                            }
                        }
                    }.toString(),
                    reduce: '_count'

                },
                by_date_entry_transport_gate: {
                    map: function (doc){
                        if(doc._id.indexOf('gateActionEntryTransportGate')!=-1 &&(doc.action.date && doc.action.type)){
                            let timestampFromDoc =new Date(doc.action.date).getTime() ;
                            let timestamp = new Date().getTime() - (24 * 60 * 60 * 1000);
                            if(timestampFromDoc > timestamp){
                                let dateTime = moment(timestampFromDoc).format("YYYY-MM-DD HH:mm");
                                let date = dateTime.substring(0,10)+" "+dateTime.substring(11,13)+":00";
                                emit(date, doc.action);//(key,value)
                            }
                        }
                    }.toString(),
                    reduce: '_count'

                },
                by_date_exit_transport_gate: {
                    map: function (doc){
                        if(doc._id.indexOf('gateActionExitTransportGate')!=-1 &&(doc.action.date && doc.action.type)){
                            let timestampFromDoc =new Date(doc.action.date).getTime() ;
                            let timestamp = new Date().getTime() - (24 * 60 * 60 * 1000);
                            if(timestampFromDoc > timestamp){
                                let dateTime = moment(timestampFromDoc).format("YYYY-MM-DD HH:mm");

                                let date = dateTime.substring(0,10)+" "+dateTime.substring(11,13)+":00";
                                emit(date, doc.action);//(key,value)
                            }
                        }
                    }.toString(),
                    reduce: '_count'

                }

            }
        };
        this.db.put(ddoc).then(function () {
            // success!
        }).catch(function (err) {
            // some error (maybe a 409, because it already exists?)
        });


    }
}

export default PouchdbService;
