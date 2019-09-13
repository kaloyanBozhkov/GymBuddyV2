//handlers common for macors/calories sections, not for general use those are in general-handlers
import global from '../../../global-variables';
import save from '../../../common/save';
import load from '../../../common/load';
//To fix stickyhover on mobile devices
export default () => {
    $(document).on('mouseenter touchstart', "#btnMacros, #btnWorkouts, .menu-left, .menu-right", function () {
        $(this).addClass("active");
    });
    
    $(document).on('mouseleave touchend', "#btnMacros, #btnWorkouts, .menu-left, .menu-right", function () {
        $(this).removeClass("active");
    });
    
    $("#btnMacros, #btnWorkouts").on("click", function () {
        $(".btnActive").mouseleave(); //To fix stickyhover on mobile devices
        (function toggleCaloriesOrMacrosHeaderButtonOnClick(self){
            global.lastPageOpened = global.lastPageOpened == "landingPage" ?  $(self).attr("id").replace("btn", "").toLowerCase() : "landingPage";
            save.lastPageOpened();
            load.loadLastPageOpened(true);
        })(this);
    });

    $(document).on("click touchstart touchend", "body.errorMsgShowing", ()=>{
        $("body.errorMsgShowing").removeClass("errorMsgShowing");
        $("#errorMsg").addClass("closing").animate({
            opacity: 0
        }, 400, function(){
           setTimeout(()=>{
            $(this).remove();
           }, 400);
        });
    });
    //fixes sticky hover for button
    $(document).on("touchend", ".hoverableGoldButton", function(){
        setTimeout(()=>{
            $(this).addClass("noHover");
        },300);
    });
    $(document).on("mouseleave focusout touchstart", ".hoverableGoldButton", function(){
        $(this).removeClass("noHover");
    });
}

