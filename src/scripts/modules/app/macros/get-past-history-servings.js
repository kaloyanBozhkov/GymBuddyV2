import global from '../../global-variables';
import SingleDayServing from '../../macros/single-day-serving';
import DateMacros from '../../macros/date-macros';

export default servingId => {
    let currentServings = new SingleDayServing();
    let totalMacros = new DateMacros(0, 0, 0);
    if (typeof global.historyServings != "undefined" && global.historyServings.hasOwnProperty(servingId)) {
        let {time, fats, carbs, proteins} = global.historyServings[servingId];
        currentServings = new SingleDayServing(time, fats, carbs, proteins);
        let {tm_time, tm_fats, tm_carbs, tm_proteins} = global.historyTotalMacros[global.historyServings[servingId].totalMacrosId];
        totalMacros = new DateMacros(tm_time, tm_fats, tm_carbs, tm_proteins);
    }
    return {currentServings, totalMacros};
}