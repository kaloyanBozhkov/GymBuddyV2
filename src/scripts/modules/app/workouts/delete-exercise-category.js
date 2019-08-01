//deleted category from exercise categories, and removes all workouts ever added with that category
import global from '../../global-variables';
import save from '../../common/save';

export default exerciseIDToDelete => {
    if (Object.keys(global.historyWorkouts).length > 0) {
        //from all the previous workouts ever, remove from each daily array of workouts the exercise that was deleted. Delete the entire workout of the day if no other exercises are on that day.
        var notFound = true;
        while (notFound) {
            notFound = false;
            for (let singleExerciseArray of global.historyWorkouts) {
                for (let singleExercise of singleExerciseArray.obj) {
                    if (singleExercise.exerciseID == exerciseIDToDelete) {
                        singleExerciseArray.obj.splice(singleExerciseArray.obj.indexOf(singleExercise), 1);
                        notFound = true;
                    }
                }
                if (singleExerciseArray.obj.length == 0)
                    delete global.historyWorkouts[singleExerciseArray.relativeKey];
            }
        }
        save.historyWorkouts();
    }

    delete global.exercises[exerciseIDToDelete];
    save.exercises();
}