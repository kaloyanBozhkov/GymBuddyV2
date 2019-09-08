import global from '../global-variables';
import Macros from '../macros/date-macros';
import SingleDayServing from '../macros/single-day-serving';
import save from './save';
import getCurrentTime from '../common/get-current-time';
import { doesNotExist } from '../common/utilities';
import loadContent from '../app/common/load-content';
//pre loads all possible message boxes, so that in real time there is no delay when reading from disk
const preloadAlerts = () => global.alerts.map(alert => $.get(`alerts/${alert}.html`, data => global.msgBox[alert] = data ));
const preloadPages = () =>  global.pageNames.map(page =>  $.get(`${page}.html`, data => global.pages[page] = data));

const loadLastPageOpened = (immediate=false) => {
    global.lastPageOpened = doesNotExist(localStorage.getItem("lastPageOpened")) ? "landingPage" : localStorage.getItem("lastPageOpened");
    setTimeout(function waitForAnimation() {
        if(global.lastPageOpened != "landingPage"){
            console.log(global.lastPageOpened);
            $(`#btn${global.lastPageOpened.substr(0,1).toUpperCase() + global.lastPageOpened.substr(1).toLocaleLowerCase()}`).addClass("btnActive");
            $("#header, #container").addClass("opened");
        }else{
            $(".btnActive").removeClass("btnActive");
            $("#header, #container").removeClass("opened");
        }
        loadContent();
    }, immediate ? 0 : 500);
}

const loadTotalMacros = () => {
    if (doesNotExist(localStorage.getItem("totalMacros"))){
        global.totalMacros = new Macros(); //save only on set of new macros! (unlike current daily macros) 
    }
    else{
        let totalMacros = JSON.parse(localStorage.getItem("totalMacros"));
        global.totalMacros = new Macros(totalMacros.fats, totalMacros.carbs, totalMacros.proteins, totalMacros.time);//re-sets the inner functions of the objects, since JSON stringify does not consider them
    }
}

const loadCurrentMacros = () => {
    if (doesNotExist(localStorage.getItem("currentMacros"))){
        global.currentMacros = new Macros();
        save.currentMacros();
    }
    else{
        global.currentMacros = JSON.parse(localStorage.getItem("currentMacros"));
        //check if loaded daily macros are for today
        let currentDate = getCurrentTime();
        if (currentDate.day == global.currentMacros.day && currentDate.month == global.currentMacros.month && currentDate.year == global.currentMacros.year) {
            global.currentMacros = new Macros(global.currentMacros.fats, global.currentMacros.carbs, global.currentMacros.proteins, global.currentMacros.time);
        } else {
            //load new current macros for the day
            global.currentMacros = new Macros();
            save.currentMacros();
        }
    }
}
const loadSingleDayServing = () => {
    if (doesNotExist(localStorage.getItem("singleDayServing"))) {
        global.singleDayServing = new SingleDayServing();
     } else {
        let tmpObj = JSON.parse(localStorage.getItem("singleDayServing"));
        global.singleDayServing = new SingleDayServing(tmpObj.time, tmpObj.fats, tmpObj.carbs, tmpObj.proteins);
        let time = getCurrentTime();
        if (global.singleDayServing.day !== time.day || global.singleDayServing.month !== time.month || global.singleDayServing.year !== time.year)
            global.singleDayServing = new SingleDayServing();
    }
}
const loadfavoriteServings = () => {
    if(doesNotExist(localStorage.getItem("favoriteServings"))){
        console.log("No Favorites");
        global.favoriteServings = [];
    }else{
        global.favoriteServings = JSON.parse(localStorage.getItem("favoriteServings"));
    }
}

const loadHistoryTotalMacros = () => {
    if (!doesNotExist(localStorage.getItem("historyTotalMacros"))){//save only on set of new macros! (unlike current daily macros)
        global.historyTotalMacros = JSON.parse(localStorage.getItem("historyTotalMacros"));
    }
}

const loadHistoryServings = () => {
    if (!doesNotExist(localStorage.getItem("historyServings")))
        global.historyServings = JSON.parse(localStorage.getItem("historyServings"));
}

const loadEverything = function(funcsToRun = Object.keys(this)){
    if(funcsToRun.length == 0)
        return

    if(this[funcsToRun[0]] != loadEverything)
        this[funcsToRun[0]]();
    
    loadEverything.bind(this)(funcsToRun.slice(1));
}

export default {
    loadEverything,
    preloadAlerts,
    preloadPages,
    loadTotalMacros,
    loadCurrentMacros,
    loadHistoryTotalMacros,
    loadHistoryServings,
    loadSingleDayServing,
    loadfavoriteServings,
    loadLastPageOpened
};
