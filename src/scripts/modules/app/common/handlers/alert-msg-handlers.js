//Handlers for alert-msg.js
import closeAlert from '../close-alert';
export default ()=>{
    $(document).on("click", "#displayMessage", function (e) {
        e.stopPropagation();
    });

    $(document).on("click", "#alertBg", function (e) {
        if ($(this).attr("id") == "alertBg")
            closeAlert();
    });

    $(document).on("click", "#cancel", function () {
        closeAlert();
    });
}