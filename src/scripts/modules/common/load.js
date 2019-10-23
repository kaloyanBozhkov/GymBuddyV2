import global from '../global-variables';
import Macros from '../macros/date-macros';
import SingleDayServing from '../macros/single-day-serving';
import save from './save';
import getCurrentTime from '../common/get-current-time';
import { doesNotExist } from '../common/utilities';
import setDefaultExercises from '../app/workouts/set-default-exercises';
import loadContent from '../app/common/load-content';
import HistoryWorkouts from '../workouts/history-workouts';
//pre loads all possible message boxes, so that in real time there is no delay when reading from disk
const preloadAlerts = () => global.alerts.map(alert => $.get(`alerts/${alert}.html`, data => global.msgBox[alert] = data ));
const preloadPages = () =>  global.pageNames.map(page =>  $.get(`${page}.html`, data => global.pages[page] = data));

const loadLastPageOpened = (immediate=false) => {
    global.lastPageOpened = doesNotExist(localStorage.getItem("lastPageOpened")) ? "landingPage" : localStorage.getItem("lastPageOpened");
    setTimeout(function waitForAnimation() {
        if(global.lastPageOpened != "landingPage"){
            $(`#btn${global.lastPageOpened.substr(0,1).toUpperCase() + global.lastPageOpened.substr(1).toLocaleLowerCase()}`).addClass("btnActive");
            $("#header, #container").addClass("opened");
        }else{
            $(".btnActive").removeClass("btnActive");
            $("#header, #container").removeClass("opened");
        }
        loadContent();
    }, immediate ? 0 : 500);
}

const loadTotalMacros = () => global.totalMacros = doesNotExist(localStorage.getItem("totalMacros")) ? new Macros() : new Macros(...(()=> {
    let {fats, carbs, proteins, time} = JSON.parse(localStorage.getItem("totalMacros"));
    return [fats, carbs, proteins, time];
})());

const loadCurrentMacros = () => {
    let newMacrosForToday = false;
    if (!doesNotExist(localStorage.getItem("currentMacros"))){
        let {fats, carbs, proteins, time} = JSON.parse(localStorage.getItem("currentMacros"));
        global.currentMacros = new Macros(fats, carbs, proteins, time);
        newMacrosForToday = getCurrentTime().keyFromDate != global.currentMacros.keyFromDate;//check if loaded daily macros are not for today
    }else{
        newMacrosForToday = true;
    }

    if(newMacrosForToday){
        global.currentMacros = new Macros();
        save.currentMacros();
    }
}
const loadSingleDayServing = () => {
    let newSingleDayServing = false;
    if (!doesNotExist(localStorage.getItem("singleDayServing"))) {
        let {time, fats, carbs, proteins, servings} = JSON.parse(localStorage.getItem("singleDayServing"));
        global.singleDayServing = new SingleDayServing(time, fats, carbs, proteins, servings);
        newSingleDayServing = global.singleDayServing.keyFromDate != getCurrentTime().keyFromDate;
     }else{
        newSingleDayServing = true;
    }

    if(newSingleDayServing){
        global.singleDayServing = new SingleDayServing();
        save.singleDayServing();
    }
}
const loadfavoriteServings = () => global.favoriteServings = doesNotExist(localStorage.getItem("favoriteServings")) ? [] : JSON.parse(localStorage.getItem("favoriteServings"));

const loadHistoryTotalMacros = () => global.historyTotalMacros = doesNotExist(localStorage.getItem("historyTotalMacros")) ? {} :  JSON.parse(localStorage.getItem("historyTotalMacros"));

const loadHistoryServings = () => global.historyServings = doesNotExist(localStorage.getItem("historyServings")) ? {} : JSON.parse(localStorage.getItem("historyServings"));

const loadExercises = () => {
    if(!doesNotExist(localStorage.getItem("exercises")))
        global.exercises = JSON.parse(localStorage.getItem("exercises"));
    else
        setDefaultExercises();
}

const loadHistoryWorkouts = () => global.historyWorkouts = new HistoryWorkouts(doesNotExist(localStorage.getItem("historyWorkouts")) ? undefined : JSON.parse(localStorage.getItem("historyWorkouts")));

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
    loadExercises,
    loadHistoryWorkouts,
    loadLastPageOpened
};
