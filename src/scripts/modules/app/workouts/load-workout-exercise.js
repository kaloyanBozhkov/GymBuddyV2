import alertMsg from '../common/alert-msg';
import global from '../../global-variables';
export default () => {
        let exerciseElements = global.exercises.length == 0 ? "" : global.exercises.reduce((htmlElements, exerciseEntry) => htmlElements + (({title, exercises}, i) =>
        `<div class='exerciseCategory' data-category-title='${title}' data-exercise-search='${exercises.reduce((exerciseNames, {title}) => `${exerciseNames} ${title}`, '')}'>
        <div class='expandCategory'><p>${title}</p><div><i class="fas fa-angle-up"></i></div></div>
        <div class='wrapper'>` + exercises.reduce((htmlElementToReturn, {title, categoryId}, exerciseId) => htmlElementToReturn + `<div class='exerciseEntry formatedRow' data-values='${JSON.stringify({title, categoryId, exerciseId})}' data-id='${++exerciseId}'>
        <div><p>${title}</p></div>
        <div class='deleteExercise' data-index='${exerciseId}' data-category-key='${categoryId}'><span class="fa fa-trash-alt"></span></div>
        </div>`, "") + '</div></div>')(exerciseEntry), '');
        let class1 = global.exercises.length == 0 ? "nothingSaved" : "";
        alertMsg("addExercise", true, ["CLASS1", "OPTIONS"], [class1, exerciseElements]);
}