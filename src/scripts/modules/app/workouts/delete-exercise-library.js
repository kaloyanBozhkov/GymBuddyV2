import save from '../../common/save';
import global from '../../global-variables';
import {checkForRecord,updateRecords} from './crud-records-library';

export function deleteExercise(exerciseDetails) {
    var formattedSetsObject = global.historyWorkouts[exerciseDetails.date][exerciseDetails.exerciseIndex].set.map(x => {
        let obj = {};
        for (let property of Object.keys(x)) {
            obj[property] = x[property];
            obj["exerciseIndex"] = exerciseDetails.exerciseIndex;
            obj["date"] = exerciseDetails.date;
        }
        return obj;
    });

    deleteSets(formattedSetsObject);
    console.log(_historyWorkouts[exerciseDetails.date][exerciseDetails.exerciseIndex]);
    //if other exercises have records for the day on which you delete an exercise then update their
    global.historyWorkouts[exerciseDetails.date].splice(exerciseDetails.exerciseIndex, 1);
    save.historyWorkouts();
}

export function deleteSets(sets) {
    let c = 0;
    for (let setDetails of sets) {
        //delete sets from global.historyWorkouts
        global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set.splice(setDetails.setIndex, 1);//Delete set!

        //delete set from records if it is a record set
        checkForRecord(global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].exerciseID, setDetails.date, setDetails.exerciseIndex, setDetails.setIndex, true);

        if (++c == sets.length) //update all other record sets for that exercise
            updateRecords(global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].exerciseID);
    }

    save.exercises();
    save.historyWorkouts();
}