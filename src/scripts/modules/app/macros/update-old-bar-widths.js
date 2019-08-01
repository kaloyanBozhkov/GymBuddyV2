import global from '../../global-variables';
import loadDailyServings from './load-daily-servings';
import {round, calculatePercentage} from '../../common/utilities';
export default function (servingId) {
    if (typeof global.historyServings != "undefined" && global.historyServings.hasOwnProperty(servingId)) {
        let oldServings = global.historyServings[servingId];
        let totalOldMacros = global.historyTotalMacros[global.historyServings[servingId].totalMacrosId];
        console.log(global.historyTotalMacros);
        console.log(servingId);
        console.log(global.historyServings[servingId]);
        $("#currentFatsHistory").html(round(oldServings.fats));
        $("#currentCarbsHistory").html(round(oldServings.carbs));
        $("#currentProteinsHistory").html(round(oldServings.proteins));
        $("#totalFatsHistory").html(round(totalOldMacros.fats));
        $("#totalCarbsHistory").html(round(totalOldMacros.carbs));
        $("#totalProteinsHistory").html(totalOldMacros.proteins);
        $("#barFatsHistory").width(calculatePercentage(oldServings.fats, totalOldMacros.fats) + "%");
        $("#barCarbsHistory").width(calculatePercentage(oldServings.carbs, totalOldMacros.carbs) + "%");
        $("#barProteinsHistory").width(calculatePercentage(oldServings.proteins, totalOldMacros.proteins) + "%");
        $("#currentCaloriesHistory").html(Math.round(oldServings.calculateCalories()));
        $("#totalCaloriesHistory").html(Math.round(totalOldMacros.calculateCalories()));
        loadDailyServings("#pastEntriesContainer", oldServings, "No servings added for " + servingId);
    } else {
        $("#currentFatsHistory").html(0);
        $("#currentCarbsHistory").html(0);
        $("#currentProteinsHistory").html(0);
        $("#totalFatsHistory").html(0);
        $("#totalCarbsHistory").html(0);
        $("#totalProteinsHistory").html(0);
        $("#barFatsHistory").width(0 + "%");
        $("#barCarbsHistory").width(0 + "%");
        $("#barProteinsHistory").width(0 + "%");
        $("#currentCaloriesHistory").html(0);

        //make total calories equal to last loaded calories
        $("#totalCaloriesHistory").html(0);
        loadDailyServings("#pastEntriesContainer", null, "No servings added for " + servingId);
    }
}