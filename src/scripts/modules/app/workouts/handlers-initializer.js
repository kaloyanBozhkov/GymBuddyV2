import dailyExercises from './handlers/daily-exercises';
import historyWorkouts from './handlers/history-workouts';

export default () => {
    dailyExercises();
    historyWorkouts();
    console.log("Handlers for workouts section loaded!");
}