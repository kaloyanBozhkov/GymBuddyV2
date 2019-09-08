import global from '../../global-variables';
import getTime from '../../common/get-current-time';
import updateBarWidths from '../macros/update-bar-widths';
import loadDailyServings from '../macros/load-daily-servings';
import getPastHistorySerings from '../macros/get-past-history-servings';
import loadWeeklyStatsGraph from '../macros/load-weekly-stats-graph';
import checkHistoryWorkouts from '../workouts/check-history-workouts';
import loadWorkoutsForToday from '../workouts/load-workouts-for-today';

export default ()=>{
    (function loadHTMLBasedOnCurrentlyOpenedPage(){
        $("#container").empty().append(global.pages[global.lastPageOpened]);
    })();
    (function initializeWidgetsAndSetTheirValuesForDifferentPages(){
        let d = getTime(-1);
        if (global.lastPageOpened == "macros") {
            //Calories
            updateBarWidths("#caloriesCounter", global.currentMacros, global.totalMacros);
            loadDailyServings(".dailyEntries");
            //Past Entries
            $("#dayEntriesShownFor").html(d.displayDate).data("date", d.date);
            let pastHistorySerings = getPastHistorySerings(d.keyFromDate);
            updateBarWidths("#pastEntries", pastHistorySerings.currentServings, pastHistorySerings.totalMacros);
            loadDailyServings(".pastEntries", pastHistorySerings.currentServings, d.keyFromDate);
            //Weekly Stats
            loadWeeklyStatsGraph();
            console.log("Finished loadWeeklyStatsGraph");
        } else if(global.lastPageOpened == "workouts"){//workouts
            checkHistoryWorkouts(d);
            loadWorkoutsForToday();
        } else if(global.lastPageOpened == "landingPage"){//landingPage
            console.log("You are on landing page");
        }
    })();
}