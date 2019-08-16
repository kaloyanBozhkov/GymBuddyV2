import global from '../../global-variables';
import SingleDayServing from '../../macros/single-day-serving';
import DateMacros from '../../macros/date-macros';

export default servingId => {
    let currentServings = new SingleDayServing();
    let totalMacros = new DateMacros(0, 0, 0);
    if (typeof global.historyServings != "undefined" && global.historyServings.hasOwnProperty(servingId)) {
        let dailyServing = global.historyServings[servingId];
        currentServings = new SingleDayServing(dailyServing.time, dailyServing.fats, dailyServing.carbs, dailyServing.proteins);
        let pastTotalMacros = global.historyTotalMacros[global.historyServings[servingId].totalMacrosId];
        totalMacros = new DateMacros(pastTotalMacros.fats,pastTotalMacros.carbs,pastTotalMacros.proteins,pastTotalMacros.time);
    }
    return {currentServings, totalMacros};
}