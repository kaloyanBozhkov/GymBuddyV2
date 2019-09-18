import global from '../global-variables';
import getCurrentTime from './get-current-time';
export default {
    lastPageOpened(){
        localStorage.setItem("lastPageOpened", global.lastPageOpened);
    },
    totalMacros(){
        if(global.totalMacros)
            localStorage.setItem("totalMacros", JSON.stringify(global.totalMacros));
    },
    currentMacros(){
        if(global.currentMacros)
            localStorage.setItem("currentMacros", JSON.stringify(global.currentMacros));
    },
    singleDayServing(){
        if(global.singleDayServing)
            localStorage.setItem("singleDayServing", JSON.stringify(global.singleDayServing));
    },
    favoriteServings(){
        if(global.favoriteServings)
            localStorage.setItem("favoriteServings", JSON.stringify(global.favoriteServings));
    },
    historyTotalMacros(){
        if(global.historyTotalMacros){
            global.historyTotalMacros[getCurrentTime().keyFromDate] = global.totalMacros.toJSON();
            localStorage.setItem("historyTotalMacros", JSON.stringify(global.historyTotalMacros));
        }
    },
    historyServings(){
        if(global.historyServings)
            localStorage.setItem("historyServings", JSON.stringify(global.historyServings));
    }
};


