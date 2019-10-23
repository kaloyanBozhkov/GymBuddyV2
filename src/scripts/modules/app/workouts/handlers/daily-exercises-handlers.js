import addNewExercise from '../load-workout-exercise';
import addSet from '../add-set';
import searchThroughList from '../../common/search-through-list';
import global from '../../../global-variables';
import SingleExercise from '../../../workouts/single-exercise';
import save from '../../../common/save';
import loadWorkoutsForDay from '../load-workouts-for-day';
import closeAlert from '../../common/close-alert';
import holdToEdit from '../../common/hold-to-edit';

const performArithmeticIncrementOrDecrement = (input, addition = true, which) => {
    if(input){
        let val = +input.val();
        if(which == "weight")
            val = addition ? val+2.5 : val-2.5 < 0 ? 0 : val-2.5
        else if(which == "reps")
            val = addition ? ++val : val - 1 < 0 ? 0 : --val;

        input.val(val);
    }
}

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

    $(document).on('mouseleave touchend touchmove', '.exerciseEntry', function(){
        $(this).addClass("waitingToFinishAnimation");
        setTimeout(()=>{$(this).removeClass("waitingToFinishAnimation")}, 250);
    })

    $(document).on('click', '.card--workout .addButton', addSet);

    $(document).on('click', '#cancelAddSet', closeAlert);

    $(document).on('click', '#addSet .increment', ({currentTarget}) => {
        let middleDiv = $(currentTarget.previousElementSibling);
        performArithmeticIncrementOrDecrement(middleDiv.children('input'), true, middleDiv.data('what'));
    });

    $(document).on('click', '#addSet .decrement', ({currentTarget}) => {
        let middleDiv = $(currentTarget.nextElementSibling);
        performArithmeticIncrementOrDecrement(middleDiv.children('input'), false, middleDiv.data('what'));
    });

    holdToEdit(".card--workout", elem => {
        console.log(elem);
    });
}