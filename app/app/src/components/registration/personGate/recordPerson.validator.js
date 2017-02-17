class RecordPersonValidator {
    constructor( ) {
        "ngInject";
    }



    checkPersonIsOnCorrecSite(person,action) {
        if (action === 'Entry') {
            return (!person.isOnObject);
        } else {
            return !!(person.isOnObject);
        }
    }


}

export default RecordPersonValidator;





