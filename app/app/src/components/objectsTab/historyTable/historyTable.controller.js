class HistoryTableController {
    constructor() {
        this.selectedType = 'all';
        let dateInMillisecond = Date.now() - 604800000;

        this.dateFrom = new Date(dateInMillisecond);
        this.dateFrom.setHours(0, 0, 0, 0);

        this.dateTo = new Date();
        this.dateTo.setHours(23, 59, 59, 999);
    }

    $onInit() {
        this.currentObjects = angular.copy(this.history);
        this._orderData();
    }

    $onChanges() {
        this.currentObjects = angular.copy(this.history);
        this._orderData();
        this.selectedType = 'all';
    }


    filterData() {
        if (this.selectedType === 'all') {
            this.currentObjects = this.history
        } else if (this.selectedType === 'transportGate') {
            this.currentObjects = this.history.filter((history) => {
                return history.type === 'transportGate'
            })
        } else {
            this.currentObjects = this.history.filter((history) => {
                return history.type === 'personGate'
            })
        }
        this._orderData();

    }

    filterDataByTextAndDate() {
        this.filterData();
        this.currentObjects = _.filter(this.currentObjects, (elem) => {
            return +new Date(elem.action.date) >= +new Date(this.dateFrom) && +new Date(elem.action.date) <= +new Date(this.dateTo)
        });
        if (this.searchText) {
            let searchWords = this.searchText.split(" ");
            this.currentObjects = _.filter(this.currentObjects, (elem) => {

                for (let word of searchWords) {
                    let result = this.filter(elem,word);
                    if (result === false) {
                        return false;
                    }
                }
                return true;
            })
        }

    }

    filter(elem, word) {
        let result = false;
        if(elem){
            for (let [key,value] of Object.entries(elem)) {
                if(elem.hasOwnProperty(key) && key !=='usedBy'){
                    if( typeof value ==='object'){
                        result = this.filter(value, word);
                        if(result===true){
                            break;
                        }
                    }else{
                        if(!!value && typeof value === 'string' && value.toLowerCase().includes(word.toLowerCase())){
                            result = true;
                            break;
                        }
                    }
                }

            }
        }


        return result;
    }

    _orderData() {
        this.currentObjects = _.sortBy(this.currentObjects, function (elem) {
            return new Date(elem.action.date);
        }).reverse();
    }
}

export default HistoryTableController;