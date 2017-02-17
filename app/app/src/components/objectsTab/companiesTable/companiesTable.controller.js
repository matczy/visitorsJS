class CompaniesTableController {
    constructor(DialogService,CompanyService,$rootScope,CONST) {
        "ngInject"
        this.DialogService= DialogService;
        this.CompanyService=CompanyService;
        this._$rootScope = $rootScope;
        this.CONST = CONST;
        this.selectedType = 'all';
    }


    $onInit() {
        this.currentObjects = angular.copy(this.companies)

    }

    $onChanges() {
        this.currentObjects = angular.copy(this.companies)
        this.selectedType = 'all';

    }


    filterData() {
        if (this.selectedType === 'all') {
            this.currentObjects = angular.copy(this.companies);
        } else if (this.selectedType === 'onBlackList') {
            this.currentObjects = _.filter(this.companies, {'isOnBlackList': true})
        }
    }

    openCreateCompanyDialog(){
        this.DialogService.createUpdateCompany().then((data)=>{
            this.CompanyService.create(data);
            this._$rootScope.$emit(this.CONST.REFRESH_COMANY);
        });
    }
}

export default CompaniesTableController;