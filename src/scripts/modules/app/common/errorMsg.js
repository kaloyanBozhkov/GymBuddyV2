
import global from '../../global-variables';
export default function(msg, element = null) {
    $("body").prepend(global.otherHtml["errorMsg"].replace("MSG", msg)).addClass("removeMsg");
    if(element)
        $(element).removeClass("errorField");
        setTimeout(function () { //wait some miliseconds before adding class, if we removed it before.
            $(element).addClass("errorField");
        }, 50);

    $(document).one("click scroll touchstart touchend dbclick", "body.removeMsg", function(){
        $(this).removeClass("removeMsg");
        let errMsgBox = $(this).children(".errorMsgBox").addClass("removed");
        setTimeout(function () { //wait some miliseconds before adding class, if we removed it before.
            $(errMsgBox).remove();
        }, 500);
    });
}