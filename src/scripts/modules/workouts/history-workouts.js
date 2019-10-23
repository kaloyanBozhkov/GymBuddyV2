import getTime from "../common/get-current-time";
import SingleExercise from "./single-exercise";

export default class HistoryWorkouts {
    constructor(historyWorkoutsParsedObject = {}){
        this.setWorkouts(historyWorkoutsParsedObject);//sets single exercises to have access to class methods since they're coming from JSON
        this.setupBlankWorkoutForToday();
    }

    addSingleExercise(singleExercise, workoutDate = getTime().keyFromDate){
        this[workoutDate] = [...this[workoutDate], singleExercise];
    }

    getWorkout(dateToGet = getTime().keyFromDate){
        return this[dateToGet].length == 0 ? null : this[dateToGet].reduce((acc, i) => [...acc, (({categoryId, exerciseId, sets, date}) => { 
            return new SingleExercise(categoryId, exerciseId, sets, date);//add all methods of single exercise class to the current obj since its coming from JSON 
         })(i)], []);
    }

    setWorkouts(historyWorkouts){
        Object.keys(historyWorkouts).map(key => this[key] = historyWorkouts[key].reduce((workouts, {categoryId, exerciseId, sets, date}) => [new SingleExercise(categoryId, exerciseId, sets, date), ...workouts], []));
    }

    setupBlankWorkoutForToday(){
        let {keyFromDate} = getTime();
        if(!Object.hasOwnProperty.call(this, keyFromDate))
            this[keyFromDate] = [];
    }

    toJSON(){
        let historyWorkoutsWithoutBlankWorkout = Object.assign(Object.create(null), this);
        let {keyFromDate} = getTime();
        if(historyWorkoutsWithoutBlankWorkout[keyFromDate] == [])//only for current day will it ever be empty an workout array
            delete historyWorkoutsWithoutBlankWorkout[keyFromDate];

        return historyWorkoutsWithoutBlankWorkout;
    }
}