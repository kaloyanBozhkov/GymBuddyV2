import addNewExercise from '../add-new-exercise';

export default () => {
    $(document).on("click", "#addWorkoutBtn", addNewExercise);
    
}