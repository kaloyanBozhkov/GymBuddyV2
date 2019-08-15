import global from '../../global-variables';
import BaseMacros from '../../macros/base-macros';

export default servingId => {
    let currentObj = new BaseMacros(0, 0, 0);
    let totalObj = new BaseMacros(0, 0, 0);
    if (typeof global.historyServings != "undefined" && global.historyServings.hasOwnProperty(servingId)) {
        currentObj = global.historyServings[servingId];
        totalObj = global.historyTotalMacros[global.historyServings[servingId].totalMacrosId];
    }
    return [currentObj, totalObj];
}