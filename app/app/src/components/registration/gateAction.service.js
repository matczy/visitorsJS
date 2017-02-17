import GateAction from '../../common/components/model/gateAction'

class GateActionService {
    constructor(PouchdbService, $q) {
        "ngInject";
        this.$q = $q;
        this.PouchdbService = PouchdbService;

    }

    put(gateAction) {
        console.log(gateAction)
        return this.PouchdbService.addDocument(gateAction);
    }

    get(id) {
        return this.PouchdbService.getDocument(id);
    }


    saveGateAction(gateAction) {
        return this.put(gateAction).then((response) => {
                console.log(response);
                return this.get(response.id)
            }
        );
    };

    getLastHistory(number) {
        return this.PouchdbService.query('getLastMonthFromGateAction/last_history').then((result) => {

            let history = result.rows.map((elem) => {
                        return elem.key
            });
            return _.slice(_.sortBy(history, function(elem){
                        return new Date(elem.action.date);
             }).reverse(),0,number);
        });
    }


    getChartDataForLastMonthFromGateActionForPerson() {
        return this.$q.all([this.PouchdbService.query('getLastMonthFromGateAction/by_date_entry_person_gate', {
            reduce: true,
            group: true
        }),
            this.PouchdbService.query('getLastMonthFromGateAction/by_date_exit_person_gate', {
                reduce: true,
                group: true
            })]).then((promises) => {

            return this._generateChartData(promises);
        });
    }

    getChartDataForLastMonthFromGateActionForTransport() {
        return this.$q.all([this.PouchdbService.query('getLastMonthFromGateAction/by_date_entry_transport_gate', {
            reduce: true,
            group: true
        }),
            this.PouchdbService.query('getLastMonthFromGateAction/by_date_exit_transport_gate', {
                reduce: true,
                group: true
            })]).then((promises) => {
            return this._generateChartData(promises);
        });
    }

    getChartDataForLastDayFromGateActionForPerson() {
        return this.$q.all([this.PouchdbService.query('getLastDayFromGateAction/by_date_entry_person_gate', {
            reduce: true,
            group: true
        }),
            this.PouchdbService.query('getLastDayFromGateAction/by_date_exit_person_gate', {
                reduce: true,
                group: true
            })]).then((promises) => {
                return this._generateChartData(promises);
            });
    }

    getChartDataForLastDayFromGateActionForTransport() {
        return this.$q.all([this.PouchdbService.query('getLastDayFromGateAction/by_date_entry_transport_gate', {
            reduce: true,
            group: true
        }),
            this.PouchdbService.query('getLastDayFromGateAction/by_date_exit_transport_gate', {
                reduce: true,
                group: true
            })]).then((promises) => {
                 return this._generateChartData(promises);
            });
    }

    _generateChartData(data) {
        let entryData = [];
        let exitData = [];

        let labels = Array.from(new Set(_.map(data[0].rows.concat(data[1].rows), (elem) => {
            return elem.key;
        }))).sort();
        _.forEach(labels, (label) => {
            let entryValue = _.map(_.filter(data[0].rows, (elem) => {
                return elem.key === label
            }), (elem) => {
                return elem.value
            });
            let exitValue = _.map(_.filter(data[1].rows, (elem) => {
                return elem.key === label
            }), (elem) => {
                return elem.value
            });

            let entrySum = 0;
            let exitSum = 0;
            _.forEach(entryValue, elem => {
                entrySum = entrySum + elem;
            });
            _.forEach(exitValue, elem => {
                exitSum = exitSum + elem;
            });
            entryData.push(entrySum);
            exitData.push(exitSum);
        });
        return {labels: labels, data: [entryData, exitData]};
    }

}

export default GateActionService;





