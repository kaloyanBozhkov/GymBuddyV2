import global from '../../global-variables';
import getTime from '../../common/get-current-time';
import BaseMacros from '../../macros/base-macros';
import {round, calculatePercentage} from '../../common/utilities';
//parameters are getTime objects
const getHighestTotalMacrosCaloriesFromAllSingleDayServingsWithinPeriod = (startDate, endDate) => {
    let maxTotalMacroCalories = 0;
    while(startDate.date <= endDate.date){
        if (global.historyServings.hasOwnProperty(startDate.keyFromDate) &&//there was a single day serving for that date
            global.historyTotalMacros.hasOwnProperty(global.historyServings[startDate.keyFromDate].totalMacrosId)) //its totalMacorsId is found in history total macros
            maxTotalMacroCalories = (()=>{ //if that total macros's total calories is greater than current max, update it
                let caloriesForTotalMacros = (BaseMacros.returnTotalCalories(...(()=>{
                    let {fats, carbs, proteins} = global.historyTotalMacros[global.historyServings[startDate.keyFromDate].totalMacrosId];
                    return [fats, carbs, proteins];
                })()));
                return (caloriesForTotalMacros > maxTotalMacroCalories ? caloriesForTotalMacros : maxTotalMacroCalories);
            })();
        startDate = getTime(+1, startDate.date);
    }
    return maxTotalMacroCalories;
}

const setAxisX = (currDate, axisXArr) => {
    if(axisXArr.length == 0)
        return;

    $(axisXArr[0]).attr("data-day", currDate.dayNameShort).attr("data-date",  currDate.day);

    setAxisX(getTime(+1, currDate.date), axisXArr.slice(1));
}
const setAxisY = (maxCals, decrementor, axisYArr, isFirstElement = 0) => {//Y axis shows total calories (calculated form total macros). start has 0, end has max calories of total macros of period
    if(axisYArr.length == 0)
        return;

    let tmpStore = round(maxCals - decrementor * isFirstElement);//dont subtract from max if its for first display. Quicker than shorthand if statement.
    $(axisYArr[0]).html(parseInt(tmpStore));//no need to show dot decimals for this

    setAxisY(tmpStore, decrementor, axisYArr.slice(1), 1);
}

const toggleBarDivClasses = (barDiv, grams, percent) => {
    barDiv = $(barDiv);
    barDiv.removeClass("onlyPercent noDisplay");
    if(grams == 0 || percent < 5)
        barDiv.addClass("noDisplay");
    else if(percent < 10)
        barDiv.addClass("onlyPercent");
}

const setBars = (currDate, barsArr, maxCalories) => {//array of 7x li with 3 divs inside
    if(barsArr.length == 0)
        return;

    let macrosForCurrDay = global.historyServings.hasOwnProperty(currDate.keyFromDate) ? global.historyServings[currDate.keyFromDate] : new BaseMacros();
    
    let li = $(barsArr[0]);
    
    (function setBarTotalCaloriesAttrForDisplayAndAddServingsAndTotalMacrosToDataForLoadDetails(){
        let totalMacrosForCurrDay =  macrosForCurrDay.hasOwnProperty("totalMacrosId") ? global.historyTotalMacros[macrosForCurrDay.totalMacrosId] : new BaseMacros();
        li.attr("data-total-calories", BaseMacros.returnTotalCalories(...(()=>{
            let {fats, carbs, proteins} = macrosForCurrDay;
            return [fats, carbs, proteins];
        })())).data("servings", macrosForCurrDay).data("totalMacros", totalMacrosForCurrDay);
    })();

    (function setFatsCarbsProteinsBarsInsideLi(){
        let bars = li.children("div");

        let {fats, carbs, proteins} = macrosForCurrDay;
        let [fatsCals, carbsCals, proteinsCals] = BaseMacros.returnCaloriesForMacros(fats, carbs, proteins);
        let fatsPercent = calculatePercentage(fatsCals, maxCalories);
        let carbsPercent = calculatePercentage(carbsCals, maxCalories);
        let proteinsPercent = calculatePercentage(proteinsCals, maxCalories);
    
        $(bars[0]).attr("data-percent", fatsPercent).attr("data-grams", fats).css("height", `${fatsPercent}%`);
        $(bars[1]).attr("data-percent", carbsPercent).attr("data-grams", carbs).css("height", `${carbsPercent}%`);
        $(bars[2]).attr("data-percent", proteinsPercent).attr("data-grams", proteins).css("height", `${proteinsPercent}%`);
    
        toggleBarDivClasses(bars[0], fats, fatsPercent);
        toggleBarDivClasses(bars[1], carbs, carbsPercent);
        toggleBarDivClasses(bars[2], proteins, proteinsPercent);
    })();

    setBars(getTime(+1, currDate.date), barsArr.slice(1), maxCalories);
}

const setDisplayDate = (startDate, endDate) => {
    let displayDatesHtml = $(".caloricDistribution__mainContainer__displayWeekLabel");
    displayDatesHtml.attr("data-start", startDate.displayKeyFromDate).attr("data-end", endDate.displayKeyFromDate).data("startDate", startDate).data("endDate", endDate);
}

const setWeeklyTotalSign = liArr => {
    $(".caloricDistribution__mainContainer__header .hangingSign p").html(liArr.reduce((acc, i) => acc + +$(i).attr("data-total-calories"), 0));
}
export default (startDate = getTime(-7), endDate = getTime(-1)) => {
    setDisplayDate(startDate, endDate);
    let highestCalorieCountOfLast7Days = getHighestTotalMacrosCaloriesFromAllSingleDayServingsWithinPeriod(startDate, endDate);
    setAxisY(highestCalorieCountOfLast7Days, highestCalorieCountOfLast7Days / 7, Array.from($(".graphContainer__totalCalories li p")));
    setAxisX(startDate, Array.from($(".graphContainer__weekDays li p")));
    let liArr = Array.from($(".graphContainer__content li"));
    setBars(startDate, liArr, highestCalorieCountOfLast7Days);
    setWeeklyTotalSign(liArr);
    console.log("Completed loading graph!");
}
