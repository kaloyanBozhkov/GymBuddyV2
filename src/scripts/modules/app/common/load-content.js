import global from '../../global-variables';
import getTime from '../../common/get-current-time';
import save from '../../common/save';
import updateBarWidths from '../macros/update-bar-widths';
import loadDailyServings from '../macros/load-daily-servings';
import getPastHistorySerings from '../macros/get-past-history-servings';
import loadWeeklyStatsGraph from '../macros/load-weekly-stats-graph';
import checkHistoryWorkouts from '../workouts/check-history-workouts';
import loadWorkoutsForToday from '../workouts/load-workouts-for-today';

export default function(what) {//initializes one part of the app vs the other
    if (what !== "none") {
        global.originalBodyContent = $("#container").html();
        $("#container").empty().addClass("opened").append(global.pages[what]);
        let d = getTime(-1);
        if (what == "macros") {
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
        } else {//workouts
            checkHistoryWorkouts(d);
            loadWorkoutsForToday();
        }
    } else {
            $("#container").empty().removeClass("opened").append(global.originalBodyContent);
            $("#container").animate({
                "opacity": "1"
            }, 250);
            localStorage.removeItem("lastOpened");
    }
}