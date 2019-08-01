export default class Record{
    constructor(weight, reps, date, singleExerciseIndex, setId){
        this.reps = reps;
        this.weight = weight;
        this.where = {
            exerciseIndex: singleExerciseIndex,
            setId: setId,
            date: date
        };
    }
}