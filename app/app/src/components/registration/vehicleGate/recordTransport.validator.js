class RecordTransportValidator {
    constructor( ) {
        "ngInject";
    }


    validateTransport(driver, vehicle) {
        return !!(driver.surnameAndName && vehicle.registration);
    }

    checkPersonExist(person) {
        return !!person._id;
    }
    checkDriverIsNotOnPersonsList(transport){
        let driver = transport.driver;
        let passengers = transport.passengers;
        let result =_.filter(passengers,(passenger)=>{
            return !!((passenger.surnameAndName === driver.surnameAndName) && (passenger.identifier === driver.identifier));
        });
        return result.length===0
    }

    checkAllTransportObjectIsOnCorrecSite(transport,action) {
        if (action === 'Entry') {
            if (transport.passengers) {
                transport.passengers.forEach((passenger)=> {
                    if ((passenger.isOnObject)) {
                        return false;
                    }
                });
            }
            if(transport.trailer.registration){
               return !!(!transport.driver.isOnObject && !transport.vehicle.isOnObject && !transport.trailer.isOnObject);
            }else{
                return  !!(!transport.driver.isOnObject && !transport.vehicle.isOnObject);
            }

        } else {
            transport.passengers.forEach((passenger)=> {
                if ((!passenger.isOnObject)) {
                    return false;
                }
            });
            if(transport.trailer.registration){
                return !!(transport.driver.isOnObject && transport.vehicle.isOnObject && transport.trailer.isOnObject);
            }else{
                return !!(transport.driver.isOnObject && transport.vehicle.isOnObject);
            }
        }
    }

    getObjectsWithWrongLocation(transport, action) {
        let objects = [];
        if (action === 'Entry') {
            if (transport.driver.isOnObject) {
                objects.push(transport.driver);
            }
            if (transport.vehicle.isOnObject) {
                objects.push(transport.vehicle);
            }
            if (transport.trailer.isOnObject) {
                objects.push(transport.trailer);
            }

            transport.passengers.forEach((passenger)=> {
                if (passenger.isOnObject) {
                    objects.push(transport.trailer);
                }
            });

        } else {
            if (!transport.driver.isOnObject) {
                objects.push(transport.driver);
            }
            if (!transport.vehicle.isOnObject) {
                objects.push(transport.vehicle);
            }
            if (!transport.trailer.isOnObject) {
                objects.push(transport.trailer);
            }
            transport.passengers.forEach((passenger)=> {
                if (!passenger.isOnObject) {
                    objects.push(transport.trailer);
                }
            });
        }
        return objects;
    }

}

export default RecordTransportValidator;





