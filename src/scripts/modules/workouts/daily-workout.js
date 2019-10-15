import getTime from '../common/get-current-time';
export default class DailyWorkout {
    constructor(date = getTime(), exercises = []){
        this.date = date;
        this.exercises = exercises;
    }

    toJSON(){
        return {
            date: this.date.keyFromDate,
            exercises: this.exercises
        }
    }

    addExercises(...exercises){
        this.exercises = [...exercises, ...this.exercises];
    }
}