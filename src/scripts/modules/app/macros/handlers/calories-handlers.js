import Macros from '../../../macros/date-macros';
import global from '../../../global-variables';
import save from '../../../common/save';
import alertMsg from '../../common/alert-msg';
import updateBarWidths from '../update-bar-widths';
import closeAlert from '../../common/close-alert';
export default () => {
    //Set New Goal For Calories

    $(document).on("focusout mouseleave", "#percentProteins, #percentCarbs, #percentFats, #gramsForPercents", function(){
        let thisId = $(this).attr("id");
        let totalCalories = thisId == "gramsForPercents" ? $(this).val().trim() : $("#gramsForPercents").val().trim();
        if(totalCalories > 0){
            let percent = $(this).val().replace(/\%/g, "");
            switch(thisId){
                case "percentProteins":
                    $(".setPercentagesSection__totalMacros .proteins").html(Macros.returnGrams(percent,totalCalories, 4));
                    break;
                case "percentCarbs":
                    $(".setPercentagesSection__totalMacros .carbs").html(Macros.returnGrams(percent,totalCalories, 4));
                break;
                case "percentFats":
                    $(".setPercentagesSection__totalMacros .fats").html(Macros.returnGrams(percent,totalCalories, 9));
                break;
                case "gramsForPercents":
                    let pProt = $("#percentProteins").val().trim().replace(/\%/g, "");
                    let pCarbs = $("#percentCarbs").val().trim().replace(/\%/g, "");
                    let pFats = $("#percentFats").val().trim().replace(/\%/g, "");
                    $(".setPercentagesSection__totalMacros .proteins").html(Macros.returnGrams(pProt,totalCalories, 4));
                    $(".setPercentagesSection__totalMacros .carbs").html(Macros.returnGrams(pCarbs,totalCalories, 4));
                    $(".setPercentagesSection__totalMacros .fats").html(Macros.returnGrams(pFats,totalCalories, 9));
                break;
            }
        }else{
            $(".setPercentagesSection__totalMacros .proteins").html(0);
            $(".setPercentagesSection__totalMacros .carbs").html(0);
            $(".setPercentagesSection__totalMacros .fats").html(0);
        }
    });

    $(document).on("focusout mouseleave", "#gramsFats, #gramsCarbs, #gramsProtein", function(){
        let fats = $("#gramsFats").val().trim();
        let carbs = $("#gramsCarbs").val().trim();
        let proteins = $("#gramsProtein").val().trim();
        $(".setMacrosContent__totalCalories").html(Macros.returnTotalCalories(fats, carbs, proteins));
    });

    $(document).on("click", "#setGoals", function () {
        alertMsg("setGoals");
    });

    $(document).on("click", "#setGrams, #setPercentages", function () {
        if(!$(this).hasClass("active")){
            $(this).siblings(".active").removeClass("active");
            $(this).addClass("active");
            $(`#setMacrosContent > div.active`).toggleClass("active");
            $(`#setMacrosContent #${$(this).attr("id")}Section`).toggleClass("active");
        }
    });

    $(document).on("click", "#setMacros", function () {
        $(".errorMsg").slideUp();
        let set = false;

        if($("#setGrams").hasClass("active")){
            //set calories with grams
            let fats = $("#fatsCount").val().trim();
            let carbs =  $("#carbsCount").val().trim();
            let protein = $("#proteinsCount").val().trim();
            if (fats > 0 && carbs > 0 && protein > 0) {
                global.totalMacros = new Macros(fats, carbs, protein);
                set = true;
            } else {
                $(".errorMsg__grams").slideDown(300);
            }
        }else{
            //set calories with percentages
            let fats = $("#setPercentagesSection .displayText[data-title='FATS'] > input").val().trim().replace("%","");
            let carbs = $("#setPercentagesSection .displayText[data-title='CARBS'] > input").val().trim().replace("%","");
            let protein = $("#setPercentagesSection .displayText[data-title='PROTEIN'] > input").val().trim().replace("%","");
            let calories = $("#setPercentagesSection .displayText[data-title='TOTAL CALORIES'] > input").val().trim();
            if (fats > 0 && carbs > 0 && protein > 0 && calories > 0 && parseFloat(fats+carbs+protein) == 100) {
                //set new goals
                let carbsGrams = Macros.returnGrams($("#carbsCount").val().trim(), calories, 4);
                let fatsGrams = Macros.returnGrams($("#fatsCount").val().trim(), calories, 9);
                let proteinGrams =  Macros.returnGrams($("#proteinsCount").val().trim(), calories, 4);
                global.totalMacros = new Macros(fatsGrams, carbsGrams, proteinGrams);
                set = true;
            } else {
                $(".errorMsg__percentages").slideDown(300);
            }
        }

        if(set){
            save.totalMacros();
            save.historyTotalMacros();
            updateBarWidths();
            closeAlert();
        }
    });
}