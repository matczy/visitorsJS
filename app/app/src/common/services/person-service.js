import Person from '../components/model/person'


class PersonService {
    constructor(CompanyService, PouchdbService, $q) {
        "ngInject";
        this.PouchdbService = PouchdbService;
        this.CompanyService = CompanyService;

        this.$q = $q;
    }


    loadPersons() {
        return this.PouchdbService.getAllDocuments('persons').then((result)=> {
            return result.rows.map((elem)=> {
                return elem.doc
            });
        });
    }

    putPerson(person) {
        return this.PouchdbService.addDocument(person);
    }

    putPersons(persons) {
        return this.PouchdbService.addAllDocuments(persons);
    }

    getPerson(id) {
        return this.PouchdbService.getDocument(id);
    }


    getOrCreate(person) {
        if(person && person.surnameAndName && person.documentIdentifier){
            let company = angular.copy(person.company);

            return this.$q.all([this.CompanyService.getOrCreate(company), this.findByNameAndIdentyfier(person.surnameAndName, person.documentIdentifier)])
                .then(data=> {
                    let companyFound = data[0];
                    let personFound = data[1];
                    personFound.company = companyFound;

                    return personFound;
                })
                .catch(error=> {
                    if (error.message === 'NOT_FOUND_PERSON') {
                        return this.create(person).then(data=>{
                            return this.getPerson(data.id);
                        });
                    }

                    return this.$q.reject(error)
                });
        }

    }

    findByNameAndIdentyfier(surnameAndName, identifier) {
        let nameAndSurname = surnameAndName.split(' ').reverse().join('');
        identifier = identifier.replace(/ /g, '')
        let getUserBySurnameAndName = this.PouchdbService.searchDocumentByName(surnameAndName.replace(/ /g, '') + identifier, 'persons');
        let getUserByNameAndSurname = this.PouchdbService.searchDocumentByName(nameAndSurname + identifier, 'persons');

        return this.$q.all([getUserBySurnameAndName, getUserByNameAndSurname]).then((data=> {
            let usersBySurnameAndName = data[0].rows;
            let usersByNameAndSurname = data[1].rows;
            if (usersBySurnameAndName.length === 1 || usersByNameAndSurname.length === 1) {
                return usersBySurnameAndName.length === 1 ? usersBySurnameAndName[0].doc : usersByNameAndSurname[0].doc;
            }
            if (usersBySurnameAndName.length === 0 && usersByNameAndSurname.length === 0) {
                return this.$q.reject({message: "NOT_FOUND_PERSON"})
            }
            return this.$q.reject({
                message: 'TO_MANY_RESULTS_PERSON',
                data: sersBySurnameAndName.concat(usersByNameAndSurname)
            });

        })).catch(error=> {
            return this.$q.reject(error)
        });
    }



    create(person) {
        let id = person._id = 'persons' + person.surnameAndName.replace(/ /g, '').toLowerCase() + person.documentIdentifier.toLowerCase() + '-' + new Date().toISOString();
        let newPerson = new Person(id,person.surnameAndName,person.company,person.documentIdentifier,person.phone,person.type);
       if(person.company && person.company.name){
           return this.CompanyService.getOrCreate(newPerson.company)
               .then((returnedCompany)=> {
                   newPerson.company = returnedCompany;
                   return this.PouchdbService.addDocument(newPerson);
               });
       }else{
           return this.PouchdbService.addDocument(newPerson);
       }

    }

}


export default PersonService;





