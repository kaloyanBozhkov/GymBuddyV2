import save from './common/save';
import load from './common/load';

export default {
    database: null,
    lastPageOpened: "landingPage",
    originalBodyContent: "",
    totalMacros: undefined,
    currentMacros: undefined,
    historyServings: {}, 
    singleDayServing: undefined, 
    historyTotalMacros: {}, 
    favoriteServings: undefined,
    historyWorkouts: {}, 
    exercises: undefined, 
    dailyExercises: undefined, 
    exerciseCategories: undefined,
    alerts: [
        "addFavorites", 
        "importFavoriteServing", 
        "confirmOperation",
        "setGoals"
    ],
    msgBox: {},
    pageNames: ["workouts", "macros", "landingPage"],
    pages: {},
    otherHtml: {},
    locale: "en-EN",
    load,
    save, 
    holdTimer: null,
    dateFormat: "dd/mm/yyyy"
}

