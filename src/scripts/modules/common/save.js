import global from '../global-variables';
import getCurrentTime from './get-current-time';
export default {
    exercises(){
        //save exercises to localstorage here
        if(global.exercises)
            localStorage.setItem("exercises", JSON.stringify(global.exercises));
    },
    categories(){
       //save exercise categories to localstorage here
       if(global.exerciseCategories)
        localStorage.setItem("exerciseCategories", JSON.stringify(global.exerciseCategories));
    },
    historyWorkouts(){
        if(global.historyWorkouts)
        localStorage.setItem("historyWorkouts", JSON.stringify(global.historyWorkouts));
    },
    singleDayServing(){
        if(global.singleDayServing)
        localStorage.setItem("singleDayServing", JSON.stringify(global.singleDayServing));
    },
    historyServings(){
        if(global.historyServings)
        localStorage.setItem("historyServings", JSON.stringify(global.historyServings));
    },
    lastSectionOpened(which){
        localStorage.setItem("lastOpened", which);
    },
    totalMacros(){
        if(global.totalMacros)
        localStorage.setItem("totalMacros", JSON.stringify(global.totalMacros));
    },
    historyTotalMacros(){
        if(global.historyTotalMacros){
            global.historyTotalMacros[getCurrentTime().keyFromDate] = global.totalMacros;
            localStorage.setItem("historyTotalMacros", JSON.stringify(global.historyTotalMacros));
        }
    },
    currentMacros(){
        if(global.currentMacros)
        localStorage.setItem("currentMacros", JSON.stringify(global.currentMacros));
    },
    favoriteServings(){
        if(global.favoriteServings)
        localStorage.setItem("favoriteServings", JSON.stringify(global.favoriteServings));
    }
};


