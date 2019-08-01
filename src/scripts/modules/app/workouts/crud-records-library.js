import save from "../../common/save";
import {round} from '../../common/utilities';

//used to loop through all specific exercise sets ever imported and re-set the records
export function updateRecords(exerciseID){
    for (let dayWorkout in global.historyWorkouts) {
        let singleExerciseIndex = 0;
        for (let exercise of global.historyWorkouts[dayWorkout]) {
            let setCounter = 0;
            if (exercise.exerciseID == exerciseID)
                for (let set of exercise.set)
                    setRecords(exerciseID, set.weight, set.reps, dayWorkout, singleExerciseIndex, setCounter++);

            singleExerciseIndex++;
        }
    }
}

export function setRecords(exerciseID, weight, reps, todayDate, singleExerciseIndex, setId){
        //if no record for exercise, set one immediatelly
        if (global.exercises[exerciseID].record.length == 0) {
            global.exercises[exerciseID].record = [new Record(weight, reps, todayDate, singleExerciseIndex, setId)];
            save.exercises();
            return true;
        } else {
            //array of records to check
            let isRecord = true;
            for (let i in global.exercises[exerciseID].record) {
                if (round(global.exercises[exerciseID].record[i].weight) >= round(weight) && round(global.exercises[exerciseID].record[i].reps) >= round(reps)) {
                    isRecord = false;
                    break;
                }
            }
            if (isRecord) {
                for (let i = global.exercises[exerciseID].record.length - 1; i >= 0; i--) {//add indexes back to forth so splice does not fuck up the order
                    if (round(global.exercises[exerciseID].record[i].weight) <= round(weight) && round(global.exercises[exerciseID].record[i].reps) <= round(reps))
                        global.exercises[exerciseID].record.splice(i, 1);;
                }
    
                global.exercises[exerciseID].record.push(new Record(weight, reps, todayDate, singleExerciseIndex, setId));
                save.exercises();
                return true;
            }
        }
        return false;
}

export function checkForRecord(exerciseId = this.exerciseId, date, exerciseIndex, setId, deleteFound = false) {
    if (global.exercises[exerciseId].record.length > 0) {
        let recordIndex = 0;
        for (let record of global.exercises[exerciseId].record) {//of used to access the array items dirrectly instead of getting the item index and then using that to get value from array, although ironically i am using a personal index counter to delete the array item lol
            if (record.where.date == date &&
                record.where.exerciseIndex == exerciseIndex &&
                record.where.setId == setId) {
                if (deleteFound) {
                    global.exercises[exerciseId].record.splice(recordIndex, 1);
                    save.exercises();
                }
                return true;
            }
            recordIndex++;
        }
    }
    return false;
}
