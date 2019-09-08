import global from '../../global-variables';
import getTime from '../../common/get-current-time';
import {round} from '../../common/utilities';

export default function(){
    // console.log("Starting macros graph load..");
    // var highestCalorieCountOfLast7Days = getHighestTotalMacrosFromLast7Days();
    // var singleIncrementUnit = Math.round(highestCalorieCountOfLast7Days) / 4;
    // highestCalorieCountOfLast7Days += singleIncrementUnit;
    // var graphMaxHeight = $("#statsBox").height() - 30;//30 is to offset to height of last index eg 3500
    // for (let j = 1; j < 8; j++) {
    //     let pastDate = getTime(-j);
    //     let singleDayServingId = pastDate.keyFromDate;

    //     $("#xAxisDays p:nth-of-type(" + (8 - j) + ")").html(pastDate.dayNameShort + "<br/>" + pastDate.day);
    //     let tmpObj = {
    //         calsFats: 0,
    //         calsCarbs: 0,
    //         calsProteins: 0,
    //         fats: 0,
    //         carbs: 0,
    //         proteins: 0
    //     };
    //     if (global.historyServings.hasOwnProperty(singleDayServingId)) {
    //         tmpObj.calsFats = round(global.historyServings[singleDayServingId].fats * 9);
    //         tmpObj.calsCarbs = round(global.historyServings[singleDayServingId].carbs * 4);
    //         tmpObj.calsProteins = round(global.historyServings[singleDayServingId].proteins * 4);
    //         tmpObj.fats = getHeightForGraph(tmpObj.calsFats, highestCalorieCountOfLast7Days, graphMaxHeight);
    //         tmpObj.carbs = getHeightForGraph(tmpObj.calsCarbs, highestCalorieCountOfLast7Days, graphMaxHeight);
    //         tmpObj.proteins = getHeightForGraph(tmpObj.calsProteins, highestCalorieCountOfLast7Days, graphMaxHeight);
    //     }
    //     setGraphDivValues((8 - j), tmpObj, graphMaxHeight);
    // }

    // if (highestCalorieCountOfLast7Days > 0) {
    //     $("#calorieIndex p").each(function () {
    //         $(this).html(highestCalorieCountOfLast7Days);
    //         highestCalorieCountOfLast7Days -= singleIncrementUnit;
    //     });
    // } else {
    //     $("#graphOldValuesDisplayer > div > p").html("No entries within last 7 days.");
    // }
    // console.log("Completed loading graph!");
}

function setGraphDivValues(count, tmpObj) {
    $("#myDopeTable > div:nth-of-type(" + count + ")").data("values", tmpObj);

    //sets graph heights
    $("#myDopeTable > div:nth-of-type(" + count + ") .fatsTable").css("height", tmpObj.fats + "px");
    $("#myDopeTable > div:nth-of-type(" + count + ") .carbsTable").css("height", tmpObj.carbs + "px");
    $("#myDopeTable > div:nth-of-type(" + count + ") .proteinsTable").css("height", tmpObj.proteins + "px");


    $("#myDopeTable > div:nth-of-type(" + count + ") .fatsTable p:first-of-type").html((tmpObj.fats > 8 ? tmpObj.calsFats : "")); //min height of 8px for each block for calories text to fit in, otherwise hide
    $("#myDopeTable > div:nth-of-type(" + count + ") .carbsTable p:first-of-type").html((tmpObj.carbs > 8 ? tmpObj.calsCarbs : ""));
    $("#myDopeTable > div:nth-of-type(" + count + ") .proteinsTable p:first-of-type").html((tmpObj.proteins > 8 ? tmpObj.calsProteins : ""));


    $("#myDopeTable > div:nth-of-type(" + count + ") .fatsTable p:last-of-type").html((tmpObj.fats > 23 ? parseFloat((tmpObj.calsFats / 9).toFixed(2)) + "g" : ""));//if height greater than 23px then can fit grams under calories
    $("#myDopeTable > div:nth-of-type(" + count + ") .carbsTable p:last-of-type").html((tmpObj.carbs > 23 ? parseFloat((tmpObj.calsCarbs / 4).toFixed(2)) + "g" : ""));
    $("#myDopeTable > div:nth-of-type(" + count + ") .proteinsTable p:last-of-type").html((tmpObj.proteins > 23 ? parseFloat((tmpObj.calsProteins / 4).toFixed(2)) + "g" : ""));
}

function getHeightForGraph(macroCalories, maxGraphCalories, graphHeightAtMaxGraphCalories) {
    //passing:
    //macroCalories, which is fats, proteins of carbs in calories
    //maxGraphCalories, which is x (3500 on default)
    //graphHeightAtMaxGraphCalories, which is 200px for 3500 on default
    return (macroCalories * 100 / maxGraphCalories) / 100 * graphHeightAtMaxGraphCalories;
}


function getHighestTotalMacrosFromLast7Days() {
    // var totalMacroIdsToCheck = [];
    // for (let j = 1; j < 8; j++) {
    //     let singleDayServingId = getTime(-j).keyFromDate;

    //     if (global.historyServings.hasOwnProperty(singleDayServingId))
    //         totalMacroIdsToCheck.push(global.historyServings[singleDayServingId].totalMacrosId);
    // }
    // var maxTotalMacros = 0;
    // for (let j = 0; j < totalMacroIdsToCheck.length; j++)
    //     if (global.historyTotalMacros.hasOwnProperty(totalMacroIdsToCheck[j])) {
    //         let totalCals = global.historyTotalMacros[totalMacroIdsToCheck[j]].calculateCalories();
    //         if (maxTotalMacros < totalCals)
    //             maxTotalMacros = totalCals;
    //     }

    // return Math.round(maxTotalMacros);
}