import getTime from '../common/get-current-time';
export default class singleExercise {
    constructor(categoryId, exerciseId, existingSets = [], date = getTime()){
        this.exerciseId = exerciseId;
        this.categoryId = categoryId;
        this.sets = existingSets;
        this.date = typeof date == 'string' ? getTime(0, date) : date;
    }

    toJSON(){
        return {
            categoryId: this.categoryId,
            exerciseId: this.exerciseId,
            sets: this.sets,
            date: this.date.keyFromDate
        }
    }

    addSet(weight, reps, note = ""){ 
        this.sets.push({
            note,
            weight,
            reps
        });
    }

    getTotalVolume(){
        return this.sets.reduce((acc, {reps, weight}) => acc += reps * weight, 0);
    }
}
