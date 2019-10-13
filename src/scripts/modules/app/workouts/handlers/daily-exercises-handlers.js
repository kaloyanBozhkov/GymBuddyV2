import addNewExercise from '../add-new-exercise';
import searchThroughList from '../../common/search-through-list';
export default () => {
    $(document).on("click", "#addWorkoutBtn", addNewExercise);
    
    $(document).on("input", "#exerciseName", function(){
        searchThroughList.call(this, ".exerciseCategory","#exerciseSelect > div", true);
    });
    
    $(document).on("click", ".expandCategory", function(){
        $(this).parent().toggleClass('active');
    });
    
}