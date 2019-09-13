import global from '../../global-variables';
import SingleDayServing from '../../macros/single-day-serving';
import DateMacros from '../../macros/date-macros';

export default servingId => {
    let currentServings = new SingleDayServing(new Date(servingId));
    let totalMacros = new DateMacros(0, 0, 0, new Date(servingId));
    if (typeof global.historyServings != "undefined" && global.historyServings.hasOwnProperty(servingId)) {
        (function getSpecificPastSingleDayServingThatWillBeShown(){
            let {time, fats, carbs, proteins} = global.historyServings[servingId];
            currentServings = new SingleDayServing(time, fats, carbs, proteins);
        })();
        (function getTotalMacrosForThatSpecificPastSingleDayServing(){
            let {time, fats, carbs, proteins} = global.historyTotalMacros[global.historyServings[servingId].totalMacrosId];
            totalMacros = new DateMacros(fats, carbs, proteins, time);
        })();
    }
    return {currentServings, totalMacros};
}