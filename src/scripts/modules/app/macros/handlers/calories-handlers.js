import Macros from '../../../macros/date-macros';
import global from '../../../global-variables';
import save from '../../../common/save';
import errorMsg from '../../common/error';
import alertMsg from '../../common/alert-msg';
import updateBarWidths from '../update-bar-widths';
import closeAlert from '../../common/close-alert';

const setPercentCarbs = carbs =>  $(".setPercentagesSection__totalMacros .carbs").html(carbs);
const setPercentFats = fats =>  $(".setPercentagesSection__totalMacros .fats").html(fats);
const setPercentProteins = proteins =>  $(".setPercentagesSection__totalMacros .proteins").html(proteins);
const setPercentSection = (fats, carbs, proteins) => {
    setPercentProteins(proteins);
    setPercentCarbs(carbs);
    setPercentFats(fats);
}

export default () => {
    //Set New Goal For Calories
    $(document).on("focusout", "#percentProteins, #percentCarbs, #percentFats, #totalCaloriesForPercents", function(){
        (function onSetMacrosPercentagesInputFieldsFocusOutUpdateTotalMacrosWidgetsDisplayValues(self){
            let thisId = $(self).attr("id");
            let totalCalories = thisId == "totalCaloriesForPercents" ? $(self).val().trim() : $("#totalCaloriesForPercents").val().trim();
            if(totalCalories > 0){
                let percent = $(self).val().replace(/\%/g, "");
                switch(thisId){
                    case "percentProteins":
                        //set Total Macros Widgets Display Value For Proteins On Update Of Proteins Percentages Input For Set Macros Percentages
                        setPercentProteins(Macros.returnGrams(percent,totalCalories, 4));
                        break;
                    case "percentCarbs":
                        //set Total Macros Widgets Display Value For Carbs On Update Of Carbs Percentages Input For Set Macros Percentages
                        setPercentCarbs(Macros.returnGrams(percent,totalCalories, 4));
                    break;
                    case "percentFats":
                        //set TotalMacros Widgets Display Value For Fats On Update Of Fats Input For Set Macros Percentages
                        setPercentFats(Macros.returnGrams(percent,totalCalories, 9));
                    break;
                    case "totalCaloriesForPercents":
                       (function setTotalMacrosWidgetsDisplayValuesWhenTotalCaloriesIsUpdatedForSetMacrosPercentages(){
                            let pProt = $("#percentProteins").val().trim().replace(/\%/g, "");
                            let pCarbs = $("#percentCarbs").val().trim().replace(/\%/g, "");
                            let pFats = $("#percentFats").val().trim().replace(/\%/g, "");
                            setPercentSection(Macros.returnGrams(pFats,totalCalories, 9),Macros.returnGrams(pCarbs,totalCalories, 4),Macros.returnGrams(pProt,totalCalories, 4));
                       })();
                    break;
                }
            }else{
                //set TotalMacros Widget To Display Zero When Total Calories Is Zero For Set Macros Percentages
                setPercentSection(0,0,0);
            }
        })(this);
    });

    $(document).on("focusout mouseleave", "#gramsFats, #gramsCarbs, #gramsProtein", function(){
        (function setTotalMacrosWidgetValuesBasedOnCurrentInputFieldsValuesOnSetCaloriesGrams(){
            let fats = $("#gramsFats").val() || 0;
            let carbs = $("#gramsCarbs").val() || 0;
            let proteins = $("#gramsProtein").val() || 0;
            $(".setMacrosContent__totalCalories").html(Macros.returnTotalCalories(fats, carbs, proteins));
        })();
    });

    $(document).on("click", "#setGoals", ()=> alertMsg("setGoals"));

    $(document).on("click", "#setGrams, #setPercentages", function () {
        if(!$(this).hasClass("active")){
            (function resetFieldValuesOnSwapTab(){
                $("#displayMessage input:not(.validateNumeric--percentages)").val(0);
                $("#percentFats, #percentProteins").val("25%");
                $("#percentCarbs").val("50%");
                $(".errorMsg.active").removeClass("active");
                $(".setPercentagesSection__totalMacros .fats, .setPercentagesSection__totalMacros .carbs, .setPercentagesSection__totalMacros .proteins").html(0);
                $(".setMacrosContent__totalCalories").html(0);
            })();
            (function toggleActiveTab(self){
                $(self).siblings(".active").removeClass("active");
                $(self).addClass("active");
                $(`#setMacrosContent > div.active`).toggleClass("active");
                $(`#setMacrosContent #${$(self).attr("id")}Section`).toggleClass("active");
            })(this);
        }
    });

    $(document).on("click", "#setMacros", function () {
        let set = false;
        if($("#setGrams").hasClass("active")){
            (function setMacrosWithGramsGiven(self){
                let [fats,carbs,protein] = Array.from($("#gramsFats, #gramsCarbs, #gramsProtein")).reduce((arr, e) => [...arr, $(e).val()], []);
                if (fats > 0 && carbs > 0 && protein > 0) {
                    global.totalMacros = new Macros(fats, carbs, protein);
                    set = true;
                } else {
                    (function showErrorMessageOfAlertForOneOfTheMacroFieldsBeingUnset(){
                        errorMsg($(self).data("errorMsgGrams"));
                    })();
                }
            })(this);
        }else{
            (function setMacrosWithPercentagesGiven(self){
                let [calories,fats,carbs,protein] = Array.from($("#totalCaloriesForPercents, #percentFats, #percentCarbs, #percentProteins")).reduce((arr, e) => [...arr, +$(e).val().replace("%", "")], []);
                if (fats > 0 && carbs > 0 && protein > 0 && fats+carbs+protein === 100 && calories > 0) {
                    let carbsGrams = Macros.returnGrams(carbs, calories, 4);
                    let fatsGrams = Macros.returnGrams(fats, calories, 9);
                    let proteinGrams =  Macros.returnGrams(protein, calories, 4);
                    global.totalMacros = new Macros(fatsGrams, carbsGrams, proteinGrams);
                    set = true;
                } else if(calories <= 0){
                   (function showErrorMessageOfAlertForTotalCaloriesBeingZero(){
                        errorMsg($(self).data("errorMsgGrams"));
                   })();
                }else{
                    (function showErrorMessageOfAlertForFatsCarbsProteinsPercentagesNotAddingToHundred(){
                        errorMsg($(self).data("errorMsgPercentages"));
                    })();
                }
            })(this);
        }
        (function saveTotalMacrosAndTotalHistoryMacrosAfterUpdateOfCaloriesMacrosThenUpdateCaloriesBarsToMatchNewTotalMacrosThenCloseAlert(){
            if(set){
                save.totalMacros();
                save.historyTotalMacros();
                updateBarWidths("#caloriesCounter", global.currentMacros, global.totalMacros);
                closeAlert();
            }
        })();
    });
}

