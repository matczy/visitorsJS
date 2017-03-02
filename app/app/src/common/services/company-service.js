import Company from './../components/model/company'
class CompanyService {
    constructor(PouchdbService, $q) {
        "ngInject";
        this.PouchdbService = PouchdbService;
        this.$q = $q;
    }


    loadCompanies() {
       return this.PouchdbService.getAllDocuments('company').then((result)=> {
            return  result.rows.map((elem)=> {
                return elem.doc
            });
        });
    }


    putCompany(company) {
        return this.PouchdbService.addDocument(company);
    }

    create(company){
        let newCompany = new Company('company' + company.name.toLowerCase().trim().replace( /\s/g, "") + '-' + new Date().toISOString(), company.name);
        return this.PouchdbService.addDocument(newCompany);
    }

    getOrCreate(company) {
        if(company && company.name){
            return this.findByName(company.name).then(foundedCompany=>{
                return foundedCompany;
            })
                .catch((error)=> {
                    switch (error.message) {
                        case 'NOT_FOUND_COMPANY':
                            let id= 'company' + company.name.toLowerCase().trim().replace( /\s/g, "") + '-' + new Date().toISOString();
                            let newCompany = new Company(id,company.name);

                            return this.PouchdbService.addDocument(newCompany).then((data)=> {
                                return this.getCompany(data.id)
                            });

                        case 'TO_MANY_RESULTS_COMPANY':
                            return this.$q.reject({message:'TO_MANY_RESULTS_COMPANY',data:error.data});
                    }
                });
        }else{
            let deffer = this.$q.defer()
            return deffer.promise
        }

    }



    findByName(name) {
        return this.PouchdbService.searchDocumentByName(name.toLowerCase().trim().replace( /\s/g, ""), 'company')
            .then((data)=> {
                switch (data.rows.length) {
                    case 0:
                        return this.$q.reject({message:'NOT_FOUND_COMPANY'});
                    case 1:
                        return data.rows[0].doc;
                    default:
                        return this.$q.reject({message:'TO_MANY_RESULTS_COMPANY',data:data.rows});
                }
            }).catch(error=>{
                return this.$q.reject(error)
            });
    }


    getCompany(id) {
        return this.PouchdbService.getDocument(id);
    }

    remove(ids){
        return this.$q.all(ids.map((id)=>{
            return this.PouchdbService.remove(id)
        }));
    }


}

export default CompanyService;





