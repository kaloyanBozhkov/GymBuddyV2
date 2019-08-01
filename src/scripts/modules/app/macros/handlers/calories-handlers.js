import Macro from '../../../macros/date-macros';
import { returnGrams } from '../../../common/utilities';
import global from '../../../global-variables';
import save from '../../../common/save';
import alertMsg from '../../common/alert-msg';
import updateBarWidths from '../update-bar-widths';
import closeAlert from '../../common/close-alert';

export default () => {
    //Set New Goal For Calories
    $(document).on("click", "#setGoals .buttonStyled", function () {
        alertMsg("setGoalsWhich");
    });

    $(document).on("click", "#continueGoalSet", function () {
        alertMsg("setGoals" + $(this).data("which"));
    });

    $(document).on("click", "#gramsPrecentagesSwitch p", function () {
        $("#continueGoalSet").data("which", $(this).html());
        $("#gramsPrecentagesSwitch p.active").removeClass("active");
        $(this).addClass("active");
    });

    $(document).on("click", "#setMacrosGrams", function () {
        $(".errorMsg").slideUp();
        if ($("#fatsCount").val().trim().length > 0 && $("#carbsCount").val().trim().length > 0 && $("#proteinsCount").val().trim().length > 0) {
            global.totalMacros = new Macro($("#fatsCount").val().trim(), $("#carbsCount").val().trim(), $("#proteinsCount").val().trim());
            save.totalMacros();
            save.historyTotalMacros();
            updateBarWidths();
            closeAlert();
        } else {
            $(".errorMsg").slideDown(300);
        }
    });

    $(document).on("click", "#setMacrosPercentages", function () {
        $(".errorMsg").slideUp();
        if ($("#fatsCount").val().trim().length > 0 && $("#carbsCount").val().trim().length > 0 && $("#proteinsCount").val().trim().length > 0 && $("#caloriesCount").val().trim().length > 0 && (parseFloat($("#fatsCount").val().trim()) + parseFloat($("#carbsCount").val().trim()) + parseFloat($("#proteinsCount").val().trim()) == 100)) {
            //set new goals
            var calories = $("#caloriesCount").val().trim();
            global.totalMacros = new Macro(returnGrams($("#fatsCount").val().trim(), calories, 9), returnGrams($("#carbsCount").val().trim(), calories, 4), returnGrams($("#proteinsCount").val().trim(), calories, 4));
            save.totalMacros();
            save.historyTotalMacros();
            updateBarWidths();
            closeAlert();
        } else {
            $(".errorMsg").slideDown(300);
        }
    });
}