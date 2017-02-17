
class MessageService {
    constructor(toastr) {
        "ngInject";
        this.toastr = toastr;

    }


    showInfoMessage(message) {
        this.toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "showDuration": "300",
            "hideDuration": "3000",
            "timeOut": "15000",
            "extendedTimeOut": "1000"
        };
        this.toastr.info(message);
    }

    showWarningMessage(message) {
        this.toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "showDuration": "300",
            "hideDuration": "3000",
            "timeOut": "15000",
            "extendedTimeOut": "1000"
        };
        this.toastr.warning(message);
    }

    showErrorMessage(message) {
        this.toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-left",
            "preventDuplicates": false,
            "onclick": null,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "timeOut": "105000"

        };
        this.toastr.error(message);
    }

}


export default MessageService;





