import global from '../../global-variables';
import getTime from '../../common/get-current-time';
// import { round } from '../../common/utilities';

const toggleWorkoutsForTodayDisplay = state => {
    if(state){
        $('.workoutsForToday__container').empty().removeClass('hidden');
        $('.workoutsForToday__noExercisesMsg').addClass('hidden');
    } else {
        $('.workoutsForToday__container').empty().addClass('hidden');
        $('.workoutsForToday__noExercisesMsg').removeClass('hidden');
    }   
}

const createExerciseSets = exercise => {
    if(exercise.sets.length == 0)
        return `<div class='exercise__noSetsMsg'>No sets added yet.</div>`;

    return exercise.sets.reduce((html, {note,weight,reps}, i) => html += `<div class='exercise__set' data-note="${note}" data-record="${exercise.getRecordStatus(i)}">
    <i class="fas fa-comment-dots"></i>
    <i class="fas fa-trophy"></i>
    </div>`, '');
}

const createControls = exercise => `<div class='exercise__controls'>
<div><div class='labelDisplayWithTitle' data-value='${exercise.getTotalVolume()} kg' data-title='TOTAL VOLUME'></div></div>
<div><div class='addButton addButton--golden' data-exercise='${JSON.stringify(exercise)}'><i class="fas fa-plus"></i></div></div>
</div>`;

const createExercises = exercises => exercises.reduce((html, exercise) => html += `
<div class="card card--workout exercise" data-title="${exercise.getTitle()}">
    ${createExerciseSets(exercise)}
    ${createControls(exercise)}
</div>
`, '');


const addWorkoutElements = workoutsForToday => {
 if(workoutsForToday)
    $(".workoutsForToday__container").append(createExercises(workoutsForToday));
}


export default () => {
    let workoutsForToday = global.historyWorkouts.getWorkout();
    toggleWorkoutsForTodayDisplay(workoutsForToday);
    addWorkoutElements(workoutsForToday);
}