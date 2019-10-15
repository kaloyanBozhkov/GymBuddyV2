import addNewExercise from '../load-workout-exercise';
import searchThroughList from '../../common/search-through-list';
import global from '../../../global-variables';
import singleExercise from '../../../workouts/single-exercise';
import save from '../../../common/save';
import loadWorkoutsForDay from '../load-workouts-for-day';
import closeAlert from '../../common/close-alert';
export default () => {
    $(document).on("click", "#addWorkoutBtn", addNewExercise);
    
    $(document).on("input", "#exerciseName", function(){
        searchThroughList.call(this, ".exerciseCategory","#exerciseSelect > div", true);
    });
    
    $(document).on("click", ".expandCategory", function(){
        $(this).parent().toggleClass('active');
    });

    $(document).on('click', '.exerciseEntry', function(){
        let {categoryId, exerciseId} = $(this).data('values');
        global.dailyWorkout.exercises.push(new singleExercise(categoryId, exerciseId));
        loadWorkoutsForDay();
        save.dailyWorkout();
        closeAlert();
    });
}