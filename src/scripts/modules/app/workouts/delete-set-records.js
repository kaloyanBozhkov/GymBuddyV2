export default (exerciseID, weight, reps, todayDate, singleExerciseIndex, setId) => {
    //if no record for exercise, set one immediatelly
    if (_exercises[exerciseID].record.length == 0) {
        _exercises[exerciseID].record = [new record(weight, reps, todayDate, singleExerciseIndex, setId)];
        saveExercises();
        return true;
    } else {
        //array of records to check
        let isRecord = true;
        for (let i in _exercises[exerciseID].record) {
            if (round(_exercises[exerciseID].record[i].weight) >= round(weight) && round(_exercises[exerciseID].record[i].reps) >= round(reps)) {
                isRecord = false;
                break;
            }
        }
        if (isRecord) {
            let indexToRemove = [];
            for (let i = _exercises[exerciseID].record.length - 1; i >= 0; i--) {//add indexes back to forth so splice does not fuck up the order
                if (round(_exercises[exerciseID].record[i].weight) <= round(weight) && round(_exercises[exerciseID].record[i].reps) <= round(reps))
                    _exercises[exerciseID].record.splice(i, 1);;
            }

            _exercises[exerciseID].record.push(new record(weight, reps, todayDate, singleExerciseIndex, setId));
            saveExercises();
            return true;
        }
    }
    return false;
}