import global from '../../global-variables';
import getTime from '../../common/get-current-time';
import save from '../../common/save';
import updateBarWidths from '../macros/update-bar-widths';
import updateOldBarWidths from '../macros/update-old-bar-widths';
import loadWeeklyStatsGraph from '../macros/load-weekly-stats-graph';
import checkHistoryWorkouts from '../workouts/check-history-workouts';
import loadWorkoutsForToday from '../workouts/load-workouts-for-today';

export default function(what) {//initializes one part of the app vs the other
    if (what !== "none") {
        global.originalBodyContent = $("#body").html();
        $("#body").empty().append(global.pages[what]);
        pushTopAnimation("#pushContent", what);
        let d = getTime(-1);
        if (what == "macros") {
            updateBarWidths();
            console.log("Finished updateBarWidths");
            //History Servings
            $("#caloriesCounterHistory").removeClass("hidden");
            $("#dayEntriesShownFor").html(d.displayDate).data("date", d.date);
            updateOldBarWidths(d.keyFromDate);
            console.log("Finished updateOldBarWidths");
            loadWeeklyStatsGraph();
            console.log("Finished loadWeeklyStatsGraph");
        } else {//workouts
            checkHistoryWorkouts(d);
            loadWorkoutsForToday();
        }
    } else {
        $("#pushContent").children("div").each(function (i, e) {
            if ($(this).attr("id") == "workoutsToday"){
                $(this).children("div").each(function (ii, ee) {
                    $(ee).addClass("animatedOut");
                });
            } else {
                $(e).addClass("animatedOut");
            }
        });
        setTimeout(function () {
            $("#body").empty().append(global.originalBodyContent.replace("parent both-full", "parent opacity-0 both-full"));
            $("#body .opacity-0").animate({
                "opacity": "1"
            }, 250);
            localStorage.removeItem("lastOpened");
        }, 300);
    }
}

function pushTopAnimation(element, what) {
    var delay = 0; //regardless of how many children div, all will animate
    $(element).children("div").each(function (i, e) {
        setTimeout(function () {
            $(e).addClass("animatedIn");
        }, delay);
        delay += 250 - (i * 50);
    });
}