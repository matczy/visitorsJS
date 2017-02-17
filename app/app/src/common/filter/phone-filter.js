

class PhoneFilter {
    constructor(phoneNumber) {
        "ngInject";
        this.phoneNumber = phoneNumber;
    }

    format(){
        return  [this.phoneNumber.substring(0, 3),
        this.phoneNumber.substring(3, 6),
        this.phoneNumber.substring(6, 9)]
        .join("-")
    }

    static PhoneFilterFactory(phoneNumber){
        let filter = new PhoneFilter(phoneNumber);
        return filter.format();
    }
}

PhoneFilter.PhoneFilterFactory.$inject = ['phoneNumber'];

export default PhoneFilter;





