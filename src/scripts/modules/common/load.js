import SingleDayServing from '../macros/single-day-serving';
import { doesNotExist, copyMethodsFromBaseClass, addIteratorToObject } from '../common/utilities';
import global from '../global-variables';
import save from './save';
import getCurrentTime from '../common/get-current-time';
import Macros from '../macros/date-macros';
import BaseMacros from '../macros/base-macros';
import {setDefaultExercises, setDefaultExerciseCategories} from '../app/workouts/set-defaults';

//import Exercise from '../workouts/exercise';

export default function loader(){
    var load = {
        alerts: preloadAlerts,
        pages: preloadPages,
        totalMacros: loadTotalMacros,
        currentMacros: loadCurrentMacros,
        historyTotalMacros: loadHistoryTotalMacros,
        historyServings: loadHistoryServings,
        singleDayServing: loadSingleDayServing,
        favoriteServings: loadfavoriteServings,
        historyWorkouts: loadHistoryWorkouts,
        exercises: loadExercises,
        exerciseCategories: loadExerciseCategories,
        loadLastSectionOpened: loadLastSectionOpened
    };

    Object.defineProperty(load, "bulkLoader", {
        value: function() {
            let obj = this;
            for(let key of Object.keys(obj)){
                console.log(`Loading ${key}`);
                obj[key]();
            }
        }, 
        configurable: true,
        writable: false,
        enumerable: false
    });

    return load;
}

function preloadAlerts() { //pre loads all possible message boxes, so that in real time there is no delay when reading from disk
    for (let j = 0; j < global.alerts.length; j++) {
        $.get(`alerts/${global.alerts[j]}.html`, function (data) {
            global.msgBox[global.alerts[j]] = data;
        });
    }
}

function preloadPages() {
    for (let j = 0; j < global.pageNames.length; j++) 
        $.get(`${global.pageNames[j]}.html`, function (data) {
            global.pages[global.pageNames[j]] = data;
        });
}

function loadSingleDayServing(){
    if (doesNotExist(localStorage.getItem("singleDayServing"))) {
        global.singleDayServing = new SingleDayServing();
     } else {
        global.singleDayServing = JSON.parse(localStorage.getItem("singleDayServing"));
        let time = getCurrentTime();
        if (global.singleDayServing.day !== time.day || global.singleDayServing.month !== time.month || global.singleDayServing.year !== time.year)
            global.singleDayServing = new SingleDayServing();
        else
            copyMethodsFromBaseClass(global.singleDayServing, false, BaseMacros, SingleDayServing);
     }
}

function loadHistoryServings(){
    if (!doesNotExist(localStorage.getItem("historyServings"))){
        global.historyServings = JSON.parse(localStorage.getItem("historyServings"));
        copyMethodsFromBaseClass(global.historyServings, true, BaseMacros, SingleDayServing);
    }
}



function loadLastSectionOpened(){
    if (!doesNotExist(localStorage.getItem("lastOpened")))
        setTimeout(function waitForAnimation() {
            if (localStorage.getItem("lastOpened") == "macros")
                $("#btnMacros").trigger("click");
  
            if (localStorage.getItem("lastOpened") == "workouts")
                $("#btnWorkouts").trigger("click");
        }, 500)
}

function loadfavoriteServings(){
    if(doesNotExist(localStorage.getItem("favoriteServings"))){
        console.log("No Favorites");
        global.favoriteServings = [];
    }else{
        global.favoriteServings = JSON.parse(localStorage.getItem("favoriteServings"));
    }
}

function loadHistoryWorkouts(){
    if (doesNotExist(localStorage.getItem("historyWorkouts")))
        console.log("No historyWorkouts");
    else
        global.historyWorkouts = JSON.parse(localStorage.getItem("historyWorkouts"));
    
    addIteratorToObject(global.historyWorkouts);
}

function loadExercises(){
    if (doesNotExist(localStorage.getItem("exercises"))){
        console.log("No exercises");
        setDefaultExercises();
    }
    else
        global.exercises = JSON.parse(localStorage.getItem("exercises"));

    addIteratorToObject(global.exercises);
}

function loadExerciseCategories(){
    if (doesNotExist(localStorage.getItem("exerciseCategories"))){
        console.log("No exercise categories");
        setDefaultExerciseCategories();
    }
    else
        global.exerciseCategories = JSON.parse(localStorage.getItem("exerciseCategories"));

    addIteratorToObject(global.exerciseCategories);
}

function loadTotalMacros(){
    if (doesNotExist(localStorage.getItem("totalMacros"))){
        global.totalMacros = new Macros(); //save only on set of new macros! (unlike current daily macros) 
    }
    else{
        let totalMacros = JSON.parse(localStorage.getItem("totalMacros"));
        global.totalMacros = new Macros(totalMacros.fats, totalMacros.carbs, totalMacros.proteins, totalMacros.time);//re-sets the inner functions of the objects, since JSON stringify does not consider them
    }
}

function loadHistoryTotalMacros(){
    if (!doesNotExist(localStorage.getItem("historyTotalMacros"))){//save only on set of new macros! (unlike current daily macros)
        global.historyTotalMacros = JSON.parse(localStorage.getItem("historyTotalMacros"));
        copyMethodsFromBaseClass(global.historyTotalMacros, true, BaseMacros);   //set calculateCalories and other methods of Base Macros that JSON has removed
    }
}

function loadCurrentMacros(){
    if (doesNotExist(localStorage.getItem("currentMacros"))){
        global.currentMacros = new Macros();
        save.currentMacros();
    }
    else{
        global.currentMacros = JSON.parse(localStorage.getItem("currentMacros"));
        //check if loaded daily macros are for today
        let currentDate = getCurrentTime();
        if (currentDate.day == global.currentMacros.day && currentDate.month == global.currentMacros.month && currentDate.year == global.currentMacros.year) {
            //if same day, load macros. Since JSON.stringify does not take into consideration functions inside of objects, create new object from parsed obj taken from localstorage so that calculateCalories is assigned. Could have used Object.setPrototypeOf as well 
            global.currentMacros = new Macros(global.currentMacros.fats, global.currentMacros.carbs, global.currentMacros.proteins, global.currentMacros.time);
        } else {
            //load new current macros for the day
            global.currentMacros = new Macros();
            save.currentMacros();
        }
    }
}
