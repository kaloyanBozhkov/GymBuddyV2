import save from './common/save';
import load from './common/load';

export default {
    database: null,
    lastPageOpened: 'landingPage',
    originalBodyContent: '',
    totalMacros: undefined,
    currentMacros: undefined,
    historyServings: {}, 
    singleDayServing: undefined, 
    historyTotalMacros: {}, 
    favoriteServings: undefined,
    historyWorkouts: {}, 
    exercises: undefined, 
    dailyWorkout: undefined, 
    alerts: [
        'addFavorites', 
        'importFavoriteServing',
        'editFavoriteServing', 
        'confirmOperation',
        'setGoals',
        'addExercise'
    ],
    msgBox: {},
    pageNames: ['workouts', 'macros', 'landingPage'],
    pages: {},
    otherHtml: {},
    locale: 'en-EN',
    load,
    save, 
    holdTimer: null,
    dateFormat: 'dd/mm/yyyy'
}

