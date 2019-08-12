import global from '../../global-variables';
import loadDailyServings from './load-daily-servings';
import {round, calculatePercentage} from '../../common/utilities';

export default function(){
    $("#currentFats").html(round(global.currentMacros.fats));
    $("#currentCarbs").html(round(global.currentMacros.carbs));
    $("#currentProteins").html(round(global.currentMacros.proteins));
    $("#totalFats").html(round(global.totalMacros.fats));
    $("#totalCarbs").html(round(global.totalMacros.carbs));
    $("#totalProteins").html(global.totalMacros.proteins);
    $("#currentCalories").html(Math.round(global.currentMacros.calculateCalories()));
    $("#totalCalories").html(Math.round(global.totalMacros.calculateCalories()));

    let barFatsWidth = calculatePercentage(global.currentMacros.fats, global.totalMacros.fats);
    let barCarbsWidth = calculatePercentage(global.currentMacros.carbs, global.totalMacros.carbs);
    let barProteinsWidth = calculatePercentage(global.currentMacros.proteins, global.totalMacros.proteins);
    $("#barFats > div").width(`${barFatsWidth}%`);
    $("#barCarbs > div").width(`${barCarbsWidth}%`);
    $("#barProteins > div").width(`${barProteinsWidth}%`);
    $("#barFats > div").data("progress", barFatsWidth);
    $("#barCarbs > div").data("progress", barCarbsWidth);
    $("#barProteins > div").data("progress", barProteinsWidth);

    if (round(global.totalMacros.fats) < round(global.currentMacros.fats)) {
        $("#warningFats").removeClass("hidden");
    } else {
        $("#warningFats").addClass("hidden");
    }
    if (round(global.totalMacros.carbs) < round(global.currentMacros.carbs)) {
        $("#warningCarbs").removeClass("hidden");
    } else {
        $("#warningCarbs").addClass("hidden");
    }
    if (round(global.totalMacros.proteins) < round(global.currentMacros.proteins)) {
        $("#warningProteins").removeClass("hidden");
    } else {
        $("#warningProteins").addClass("hidden");
    }
    loadDailyServings();
}

