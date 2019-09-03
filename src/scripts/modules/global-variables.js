import save from './common/save';
import loader from './common/load';

export default global = {
    database: null,
    selected: "none",
    originalBodyContent: "",
    totalMacros: undefined,
    currentMacros: undefined,
    historyServings: {}, 
    singleDayServing: undefined, 
    historyTotalMacros: {}, 
    favoriteItems: undefined,
    historyWorkouts: {}, 
    exercises: undefined, 
    dailyExercises: undefined, 
    exerciseCategories: undefined,
    alerts: [
        "addFavorites", 
        "importFromFavorites", 
        "setGoals"
    ],
    msgBox: {},
    pageNames: ["workouts", "macros", "landingPage"],
    pages: {},
    otherHtml: {},
    locale: "en-EN",
    load: loader(),
    save, 
    holdTimer: null
}

