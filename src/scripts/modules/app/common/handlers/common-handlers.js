//handlers common for macors/calories sections, not for general use those are in general-handlers
import loadContent from '.././load-content';
import global from '../../../global-variables';
import save from '../../../common/save';
//To fix stickyhover on mobile devices
export default () => {
    $("#btnMacros, #btnWorkouts").on('mouseenter touchstart', function () {
        $(this).addClass("btnHovered");
    });
    
    $("#btnMacros, #btnWorkouts").on('mouseleave touchend', function () {
        $(this).removeClass("btnHovered");
    });
    
    $("#btnMacros, #btnWorkouts").on("click", function () {
        var width1 = "";
        var width2 = "";
        if (global.selected == "none") {
            width1 = "110%";
            width2 = "0%";
            global.selected = $(this).attr("id").replace("btn", "").toLowerCase();
            $(this).addClass("btnActive");
            $("#header > div:first-of-type, #body").addClass("opened");
            save.lastSectionOpened(global.selected);
        } else {
            width1 = width2 = "55%";
            global.selected = "none";
            $(".btnActive").trigger("mouseleave"); //To fix stickyhover on mobile devices
            $(".btnActive").removeClass("btnActive");
            $("#header > div:first-of-type, #body").removeClass("opened");
        }
        $(this).width(width1);
        $(this).siblings().width(width2);
    
        loadContent(global.selected);
    });
}

