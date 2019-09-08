import Macros from '../../../macros/date-macros';
import global from '../../../global-variables';
import save from '../../../common/save';
import errorMsg from '../../common/error';
import alertMsg from '../../common/alert-msg';
import updateBarWidths from '../update-bar-widths';
import closeAlert from '../../common/close-alert';
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
                        (function setTotalMacrosWidgetsDisplayValueForProteinsOnUpdateOfProteinsPercentagesInputForSetMacrosPercentages(){
                            $(".setPercentagesSection__totalMacros .proteins").html(Macros.returnGrams(percent,totalCalories, 4));
                        })();
                        break;
                    case "percentCarbs":
                        (function setTotalMacrosWidgetsDisplayValueForCarbsOnUpdateOfCarbsPercentagesInputForSetMacrosPercentages(){
                            $(".setPercentagesSection__totalMacros .carbs").html(Macros.returnGrams(percent,totalCalories, 4));
                        })();
                    break;
                    case "percentFats":
                        (function setTotalMacrosWidgetsDisplayValueForFatsOnUpdateOfCarbsFatsInputForSetMacrosPercentages(){
                            $(".setPercentagesSection__totalMacros .fats").html(Macros.returnGrams(percent,totalCalories, 9));
                        })();
                    break;
                    case "totalCaloriesForPercents":
                       (function setTotalMacrosWidgetsDisplayValuesWhenTotalCaloriesIsUpdatedForSetMacrosPercentages(){
                            let pProt = $("#percentProteins").val().trim().replace(/\%/g, "");
                            let pCarbs = $("#percentCarbs").val().trim().replace(/\%/g, "");
                            let pFats = $("#percentFats").val().trim().replace(/\%/g, "");
                            $(".setPercentagesSection__totalMacros .proteins").html(Macros.returnGrams(pProt,totalCalories, 4));
                            $(".setPercentagesSection__totalMacros .carbs").html(Macros.returnGrams(pCarbs,totalCalories, 4));
                            $(".setPercentagesSection__totalMacros .fats").html(Macros.returnGrams(pFats,totalCalories, 9));
                       })();
                    break;
                }
            }else{
                (function setTotalMacrosWidgetToDisplayZeroWhenTotalCaloriesIsZeroForSetMacrosPercentages(){
                    $(".setPercentagesSection__totalMacros .proteins").html(0);
                    $(".setPercentagesSection__totalMacros .carbs").html(0);
                    $(".setPercentagesSection__totalMacros .fats").html(0);
                })();
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

    $(document).on("click", "#setGoals", function () {
        alertMsg("setGoals");
    });

    $(document).on("click", "#setGrams, #setPercentages", function () {
        if(!$(this).hasClass("active")){
            (function resetFieldValuesOnSwapTab(){
                $("#displayMessage input:not(.validateNumeric--percentages)").val(0);
                $("#percentFats, #percentProtein").val("25%");
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
                let fats,carbs,protein;
                (function setFatsCarbsProteinFromFieldsOnSetMacrosGramsAlert(){
                    fats = $("#gramsFats").val().trim();
                    carbs =  $("#gramsCarbs").val().trim();
                    protein = $("#gramsProtein").val().trim();
                })();
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
                let fats,carbs,protein,calories;
                (function formatAndSetVarsFatsCarbsProteinCaloriesFromFieldsOnSetMacrosPercentagesAlert(){
                    fats = parseFloat($("#percentFats").val().replace("%",""));
                    carbs = parseFloat($("#percentCarbs").val().replace("%",""));
                    protein = parseFloat($("#percentProteins").val().replace("%",""));
                    calories = parseFloat($("#totalCaloriesForPercents").val());
                })();
                if (fats > 0 && carbs > 0 && protein > 0 && fats+carbs+protein == 100 && calories > 0) {
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

