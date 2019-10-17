import getTime from '../common/get-current-time';
import global from '../global-variables';
export default class SingleExercise {
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

    getTitle(){
        return global.exercises[this.categoryId].exercises[this.exerciseId].title;
    }

    getDescription(){
        return global.exercises[this.categoryId].exercises[this.exerciseId].description;
    }

    getTotalVolume(){
        return this.sets.reduce((acc, {reps, weight}) => acc += reps * weight, 0);
    }

    getRecordStatus(setIndex){
        let {categoryId, exerciseId, sets} = this;
        let {weights, reps} = sets[setIndex];
        return "";
    }
}
