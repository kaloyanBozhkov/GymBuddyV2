import addNewExercise from '../load-workout-exercise';
import searchThroughList from '../../common/search-through-list';
import global from '../../../global-variables';
import SingleExercise from '../../../workouts/single-exercise';
import save from '../../../common/save';
import loadWorkoutsForDay from '../load-workouts-for-day';
import closeAlert from '../../common/close-alert';
import holdToEdit from '../../common/hold-to-edit';
export default () => {
    $(document).on("click", "#addWorkoutBtn .addButton", addNewExercise);
    
    $(document).on("input", "#exerciseName", function(){
        searchThroughList.call(this, ".exerciseCategory","#exerciseSelect > div", true);
    });
    
    $(document).on("click", ".expandCategory", function(){
        $(this).parent().toggleClass('active');
    });

    $(document).on('click', '.exerciseEntry', function(){
        let {categoryId, exerciseId} = $(this).data('values');
        global.historyWorkouts.addSingleExercise(new SingleExercise(categoryId, exerciseId));
        loadWorkoutsForDay();
        save.historyWorkouts();
        closeAlert();
    });

    $(document).on('click', '.card--workout', function(){

    })

    holdToEdit(".card--workout", elem => {
        console.log(elem);
    });
}