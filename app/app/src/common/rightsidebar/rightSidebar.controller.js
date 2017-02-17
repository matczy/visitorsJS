class RightSidebarController {
    constructor($rootScope, CONST, $state, $filter) {
        "ngInject";
        this.CONST =CONST;
        this._$rootScope = $rootScope;

        this.contentType = this.CONST.HISTORY_TAB;
        this.prompts = [];

        this.registrationHistory = [];

        this.promptCount=this.prompts.length;
        this.tabs={
            tab1:true,
            tab2:false
        };
        this.$state=$state;
        this.$filter = $filter;
    }

    $onInit(){
        this.isShowedRightSidebar = !(this.$state.current.name === 'home' || this.$state.current.name === 'objectsTab');


        this._$rootScope.$on(this.CONST.SHOW_RIGHT_PANEL,()=>{
            this.isShowedRightSidebar =true;
        });


        this._$rootScope.$on(this.CONST.HIDE_RIGHT_PANEL,()=>{
            this.isShowedRightSidebar = false;
        });

        this._$rootScope.$on(this.CONST.REFRESH_PERSONS, (event, data)=> {
            this.persons=data;
        });

        this._$rootScope.$on(this.CONST.REFRESH_VEHICLES, (event, data)=> {
            this.vehicles=data;
        });

        this._$rootScope.$on(this.CONST.REFRESH_ITEMS, (event, data)=> {
            this.items=data;
        });

        this._$rootScope.$on(this.CONST.REFRESH_HISTORY, (event, data)=> {
            this.lastGateActionHistory = data;
        });


        this._$rootScope.$on(this.CONST.FIND_PERSON_PROMPT, this.setContent());
        this._$rootScope.$on(this.CONST.FIND_PASSENGER_PROMPT, this.setContent());
        this._$rootScope.$on(this.CONST.FIND_ITEM_PROMPT, this.setContent());

        this._$rootScope.$on(this.CONST.HISTORY_TAB, ()=>{
            this.contentType = this.CONST.HISTORY_TAB;
            this.tabs.tab2 = false;
            this.tabs.tab1 = true;
            this.prompts = [];
            this._showHistory();
        });


        $(window).scroll(function(){
            if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
                $('#right-sidebar').addClass('sidebar-top');
            } else {
                $('#right-sidebar').removeClass('sidebar-top');
            }
        });
    }



    setContent() {
        return (event, data) => {
            if (event.name === this.CONST.FIND_PERSON_PROMPT) {
                if (data) {
                    this._showPersonPromptsForPersonSearch(data);
                } else {
                    this._showHistory();
                }

            } else if((event.name === this.CONST.FIND_PASSENGER_PROMPT)){
                if (data) {
                    this._showPersonPromptsForPassengerSearch(data);
                } else {
                    this._showHistory();
                }
            }

            else if(event.name=== this.CONST.FIND_ITEM_PROMPT){
                if (data) {
                    this._showItemPrompts(data);
                } else {
                    this._showHistory();
                }
            }

            this.promptCount=this.prompts.length;

        }
    }

    _showHistory() {
        this.contentType = this.CONST.HISTORY_TAB;
        this.tabs.tab2 = false;
        this.tabs.tab1 = true;
    }

    _showPersonPromptsForPassengerSearch(data) {
        this.contentType = this.CONST.PASSENGER_PROMPT;
        this.tabs.tab2 = true;
        this.tabs.tab1 = false;
        this.prompts = this.persons.filter(function (person) {
            return (person.surnameAndName.toLowerCase().indexOf(data) > -1) || (person.surnameAndName.toLowerCase().split(' ').reverse().join(' ').indexOf(data) > -1)
        });
        // if(this.prompts.length==1){
        //     this.choosePrompt({person:this.prompts[0]})
        // }

    }

    _showPersonPromptsForPersonSearch(data) {
        this.contentType = this.CONST.PERSON_PROMPT;
        this.tabs.tab2 = true;
        this.tabs.tab1 = false;
        this.prompts = this.persons.filter(function (person) {
            return (person.surnameAndName.toLowerCase().indexOf(data) > -1) || (person.surnameAndName.toLowerCase().split(' ').reverse().join(' ').indexOf(data) > -1)
        });

        // if(this.prompts.length==1){
        //     this.choosePrompt({person:this.prompts[0]})
        // }
    }


    _showItemPrompts(data) {
        this.contentType = this.CONST.ITEM_PROMPT;
        this.tabs.tab2 = true;
        this.tabs.tab1 = false;
        this.prompts = this.items.filter(function (item) {
            return (item.code.toLowerCase().indexOf(data) > -1)
        });
    }


    choosePrompt(data){
        data = angular.copy(data);
        if(this.contentType === this.CONST.PERSON_PROMPT){
            this._$rootScope.$emit(this.CONST.CHOOSE_PERSON_PROMPT,data);

        }else if(this.contentType === this.CONST.PASSENGER_PROMPT){
            this._$rootScope.$emit(this.CONST.CHOOSE_PASSENGER_PROMPT,data);
        }
        else if(this.contentType === this.CONST.ITEM_PROMPT ){
            this._$rootScope.$emit(this.CONST.CHOOSE_ITEM_PROMPT,data);
        }
        //TODO narazie po wybraniu prompta nie zmieniamy zakladki
        // this.contentType = this.CONST.HISTORY_TAB;
        // this.tabs.tab2 = false;
        // this.tabs.tab1 = true;
    }

    isPersonPrompt(){
        return (this.contentType === this.CONST.PERSON_PROMPT)||(this.contentType === this.CONST.PASSENGER_PROMPT);
    }


    isItemPrompt(){
        return (this.contentType === this.CONST.ITEM_PROMPT)
    }
}

export default RightSidebarController