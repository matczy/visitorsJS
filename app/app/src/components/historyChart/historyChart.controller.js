class HistoryChartController {
    constructor(GateActionService){
        "ngInject";
        this.GateActionService = GateActionService;
        this.gatePerson30days = {labels:[],data:[],series:['Wejście', 'Wyjście']};
        this.gateTransport30days = {labels:[],data:[],series:['Wjazd', 'Wyjazd']};

        this.gatePerson24h = {labels:[],data:[],series:['Wejście', 'Wyjście']};
        this.gateTransport24h = {labels:[],data:[],series:['Wjazd', 'Wyjazd']};
        this.options= {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        stepSize: 1
                    }
                }]
            }
        }
    }

    $onInit(){
        this.GateActionService.getChartDataForLastMonthFromGateActionForPerson().then((result)=>{
            this.gatePerson30days.labels = result.labels;
            this.gatePerson30days.data = result.data;
        });

        this.GateActionService.getChartDataForLastMonthFromGateActionForTransport().then((result)=>{
            this.gateTransport30days.labels = result.labels;
            this.gateTransport30days.data = result.data;
        })


        this.GateActionService.getChartDataForLastDayFromGateActionForPerson().then((result)=>{
            this.gatePerson24h.labels = result.labels;
            this.gatePerson24h.data = result.data;
            console.log(result.labels)

        });

        this.GateActionService.getChartDataForLastDayFromGateActionForTransport().then((result)=>{
            this.gateTransport24h.labels = result.labels;
            this.gateTransport24h.data = result.data;
        })
    }



}

export default HistoryChartController;