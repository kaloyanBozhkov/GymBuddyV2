import getTime from '../../common/get-current-time';
import global from '../../global-variables';
import { round } from '../../common/utilities';

export default () => {
    let todayDate = getTime().keyFromDate;
    $("#workoutsToday").empty();
    if (global.historyWorkouts.hasOwnProperty(todayDate)) {
        //check if for TODAY there are any workouts saved already, if soooo load them!
        var div = "";
        let indexCounter = 0;
        for (var singleExercise of global.historyWorkouts[todayDate]) {//assume array of singleExercises
            let setsDiv = "";
            let totalVolumeDiv = "";
            let totalVolume = 0;
            console.log(global.exercises);
            console.log(singleExercise);
            div += `<div class="individualExercise noselect margin-bottom-15">
                <div class="workoutHeader">
                    <h3 class="margin-0">`+ global.exercises[singleExercise.exerciseID].name + `</h3>
                    <span id="deleteExerciseBtn" class="fas fa-times" data-exercise-details='`+ JSON.stringify({ exerciseID: singleExercise.exerciseID, exerciseIndex: indexCounter, date: todayDate }) + `'></span>
                </div>
                <div class="workoutContent" data-empty="`+ (singleExercise.set.length == 0 ? "true" : "false") + `" data-id='` + singleExercise.exerciseID + `' ">
                    <!-- start sets -->
                    ` + (singleExercise.set.length == 0 ? "" : "#SETS#") + `
                    <!-- last div of type set have border bottom and data-attribute for total weight -->
                    <div class="addSet">
                        <div>` + (singleExercise.set.length == 0 ? "" : "#TOTALVOLUME#") + `</div>                
                        <div><span data-array-index='`+ indexCounter + `' data-id='` + singleExercise.exerciseID + `'  class="addSetBtn fas fa-plus-square"></span>
                        `+ (singleExercise.set.length == 0 ? '<p class="noSets">No sets added yet.</p>' : "") + `</div>                    
                    </div>
                    <hr class='fancySeparator'>
                    <div class='workoutHistory'>
                        <hr class='fancySeparator'>              
                    </div>
                    <div class='historyButtonWrapper'><p data-date='`+ todayDate + `' data-id='` + singleExercise.exerciseID + `'>View History</p></div>
                </div>
            </div>`;

            if (singleExercise.set.length > 0) {
                setsDiv += "<div class='setsTable'>";
                let setIndexCounter = 0;
                for (var set of singleExercise.set) {//array of sets
                    setsDiv += `<div class="set" data-set-details='` + JSON.stringify({ date: todayDate, exerciseIndex: indexCounter, setIndex: setIndexCounter++ }) + `' data-record="` + (checkForRecord(singleExercise.exerciseID, todayDate, indexCounter, setIndexCounter) == true ? "visible" : "invisible") + `" data-has-note="` + (set.note.length > 0 ? "true" : "false") + `"` + (set.note.length > 0 ? ` data-note='` + set.note + `'` : "") + `>
                        <div class="recordSection">
                            <div data-set-index='`+ setIndexCounter +`'></div>
                            <span class="fas fa-trophy"></span>
                            <span class="fas fa-comment-dots"></span>
                        </div>
                        <div class="weightSection">
                           <div><p>` + set.weight + `</p></div>
                           <div><p>` + set.reps + `</p></div>
                        </div>
                    </div>`;
                    totalVolume += parseFloat(set.weight) * set.reps;
                }
                setsDiv += "</div>";
            }

            //sdasd
            totalVolumeDiv = `<div class="totalVolume">
                            <p><span>`+ round(totalVolume) + ` kg</span></p>
                        </div>`;

            div = div.replace("#SETS#", setsDiv).replace("#TOTALVOLUME#", totalVolumeDiv);
            indexCounter++;
        }
        $("#workoutsToday").append(div);
        $("#exercisesMsg").addClass("hidden");
    } else {
        //no workouts for today
        $("#exercisesMsg").removeClass("hidden");
    }    
}