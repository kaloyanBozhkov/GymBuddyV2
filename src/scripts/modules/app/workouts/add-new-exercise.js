import alertMsgToAppend from '../common/alert-msg';
import global from '../../global-variables';
export default () => {
        //show msgbox for new workout
        var options = (Object.keys(global.exercises).length == 0 ? "" : (function () {
            var o = "";
            for (let category of global.exerciseCategories) {
                let tmpHtml = `<div data-category-name='` + category.obj.title + `'>`;
                let foundExerciseForCategory = false;
                for (let property of global.exercises) {
                    if (property.obj.categoryID == category.relativeKey) {
                        tmpHtml += `<div class='workoutEntry' data-values='` + JSON.stringify(property.obj) + `'>
                        <div><p>` + property.obj.name + `
                        </p></div><p class='deleteWorkout' data-exercise-id='`+ property.obj.exerciseID + `'><span class='glyphicon glyphicon-trash'></span></p>
                        </div>`;
                        foundExerciseForCategory = true;
                    }
                }
    
                if (foundExerciseForCategory)
                    o += tmpHtml + `</div>`;
            }
            return o;
        }));
        var hidden1 = "hidden";
        var hidden2 = "hidden";
        if (Object.keys(global.exercises).length == 0) {
            hidden2 = "";
        } else {
            hidden1 = "";
        }
        alertMsgToAppend("addNewExercise", true, ["HIDDEN1", "HIDDEN2", "OPTIONS"], [hidden1, hidden2, options]);
}