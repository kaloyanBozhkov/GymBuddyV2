export default class singleExercise {
    constructor(exerciseId){
        this.exerciseID = exerciseId;
        this.addSet = addSet;
        this.set = [];
    }
}

function addSet(weight, reps, note = "") { //many for each exercise
    this.set.push({
        note: note,
        weight: weight,
        reps: reps
    });
}