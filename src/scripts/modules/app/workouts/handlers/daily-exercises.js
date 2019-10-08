import getTime from '../../../common/get-current-time';
import { round } from '../../../common/utilities';
import global from '../../../global-variables';
import save from '../../../common/save';
import addNewExercise from '../add-new-exercise';
import deleteExerciseCategory from '../delete-exercise-category';
import SingleExercise from '../../../workouts/single-exercise';
import loadWorkoutsForToday from '../load-workouts-for-day';
import closeAlert from '../../common/close-alert';
import alertMsgToAppend from '../../common/alert-msg';
import createCategoryRows from '../create-category-rows';
import holdToEdit from '../../common/hold-to-edit';
import Category from '../../../workouts/category';
import Exercise from '../../../workouts/exercise';
import {checkForRecord, updateRecords, setRecords} from '../crud-records-library';
import {deleteExercise, deleteSets} from '../delete-exercise-library';

const previousAlertToShow = {
    createExercise: addNewExercise,
    newCategory: createNewExercise,
    deleteSet: editSet
}

export default () => {
    $(document).on("click", "#addSetToExercise", function () {
        var exerciseID = $("#alertBg").data("exerciseId");
        var singleExerciseIndex = $("#alertBg").data("arrayIndex");
        var todayDate = getTime().keyFromDate;
        var weight = $("#kgCount").val();
        var reps = $("#repCount").val();
        if (weight.length > 0 && parseFloat(weight) > 0 && reps.length > 0 && parseFloat(reps) > 0) {
            $(".errorMsg").slideUp();
            if (weight.indexOf(".") == -1)
                weight = round(weight).toFixed(1);

            window.addSet.apply(global.historyWorkouts[todayDate][singleExerciseIndex], [weight, reps, $("#setAddSet textarea").val().trim()]);
            save.historyWorkouts();
            setRecords(exerciseID, weight, reps, todayDate, singleExerciseIndex, (global.historyWorkouts[todayDate][singleExerciseIndex].set.length - 1));
            closeAlert();
            loadWorkoutsForToday();
        } else {
            $(".errorMsg").slideDown(300);
        }
    });

    $(document).on("click", ".workoutEntry > div", function () {
        var exercise = new SingleExercise($(this).parent().data("values").exerciseID);
        var todayDate = getTime().keyFromDate;
        if (global.historyWorkouts.hasOwnProperty(todayDate)) {
            let exerciseExistsAlready = false;
            for (let singleExercise of global.historyWorkouts[todayDate]) {
                if (singleExercise.exerciseID == exercise.exerciseID) {
                    exerciseExistsAlready = true;
                    break;
                }
            }
            if (!exerciseExistsAlready) {
                global.historyWorkouts[todayDate].push(exercise);
                save.historyWorkouts();
                loadWorkoutsForToday();
                closeAlert();
            }
            else {
                alertMsgToAppend("miniAlert", true, ["TOPIDHERE", "MESSAGEID", "MSG", "IDOFYESBTN", "IDOFNOBTN", "YESMESG", "NOMESG"], ["addExistingExercise", "titleForDelete", "<span>" + global.exercises[exercise.exerciseID].name + "</span> has already been added for today, add again?", "yesAddExerciseAgain", "noDoNotAddExerciseAgain", "Yes", "No"], [{ attrName: "exerciseId", attrValue: exercise.exerciseID }]);
            }
        } else {
            global.historyWorkouts[todayDate] = [exercise];
            save.historyWorkouts();
            loadWorkoutsForToday();
            closeAlert();
        }
    });
    
    $(document).on("click", ".deleteWorkout", function () {
        var exerciseID = $(this).data("exerciseId");
        //continue here
        alertMsgToAppend("miniAlert", true, ["TOPIDHERE", "MESSAGEID", "MSG", "IDOFYESBTN", "IDOFNOBTN", "YESMESG", "NOMESG"], ["deleteFromWorkoutsConfirm", "titleForDelete", "Delete <span>" + global.exercises[exerciseID].name + "</span> from exercises?", "removeFromWorkouts", "cancelRemoveFromWorkouts", "Delete", "Cancel"], [{ attrName: "exerciseId", attrValue: exerciseID }]);
    });
    
    $(document).on("click", "#cancelRemoveFromWorkouts, #noDoNotAddExerciseAgain, #cancelExerciseChanges", function () {
        previousAlertToShow.createExercise();
    });
    
    $(document).on("click", "#yesAddExerciseAgain", function () {
        var exercise = new SingleExercise($("#alertBg").data("exerciseId"));
        var todayDate = getTime().keyFromDate;
        global.historyWorkouts[todayDate].push(exercise);
        $("#deleteFromWorkoutsConfirm").addClass("hidden");
        save.historyWorkouts();
        loadWorkoutsForToday();
        closeAlert();
    });
    
    $(document).on("click", "#removeFromWorkouts", function () {
        var exerciseIDToDelete = $("#alertBg").data("exerciseId");
        deleteExerciseCategory(exerciseIDToDelete);

        $(".workoutEntry").each(function () {
            if ($(this).data("values").exerciseID == exerciseIDToDelete)
                $(this).remove();
        });
    
        if ($(".workoutEntry").length == 0) {
            $("#exerciseNoMsg").removeClass("hidden");
            $("#exerciseSelect").addClass("hidden");
        }
    
        loadWorkoutsForToday();
        previousAlertToShow.createExercise();
    });

    $(document).on("click", "#saveNewExercise", function () {
        var exerciseName = $("#exerciseName").val().trim();
        if (exerciseName.length > 0) {
            $(".errorMsg").slideUp();
            var newId = exerciseName.length;
            while (true) {
                newId++;
                if (!global.exercises.hasOwnProperty(newId))
                    break;
            }
            var notes = $("#description").val().trim();
            var categoryId = $("input[name='category'][type='radio']:checked").val();
            global.exercises[newId] = new Exercise(newId, exerciseName, notes, categoryId);
            save.exercises();
            previousAlertToShow.createExercise();
        } else {
            $(".errorMsg").slideDown(300);
        }
    });

    
    $(document).on("click", "#cancelNewExercise", function () {
        previousAlertToShow.createExercise();
    });

    $(document).on("click", "#cancelNewCategory, #cancelCategoryChanges, #cancelDeleteCategory", function () {
        previousAlertToShow.newCategory();
    });

    $(document).on("click", "#createNewExercise", function () {
        createNewExercise();
    })

    
    $(document).on("click", "#addNewCategory", function () {
        alertMsgToAppend("multiPurposeAlert", true, ["TITLEAREA", "TITLEHERE", "PLACEHOLDERTITLE", "VALUETITLE", "SECONDHERE", "PLACEHOLDERNOTES", "VALUENOTES", "ERRORMSG", "SAVECHANGESBUTTON", "YESBTN", "CANCELCHANGESBUTTON", "NOBTN", "CLASS1", "CLASS2"], ["New Category", "Title", "Category Name", "", "Notes", "Optional", "", "The category must have a title before continuing.", "saveNewCategory", "Save Category", "cancelNewCategory", "Cancel", "", ""]);
    });

    $(document).on("click", "#saveNewCategory", function () {
        var categoryTitle = $("#inputFirst").val().trim();
        if (categoryTitle.length > 0) {
            $(".errorMsg").slideUp();
            var newId = categoryTitle.length;
            while (true) {
                newId++;
                if (!global.exerciseCategories.hasOwnProperty(newId))
                    break;
            }
            var notes = $("#inputSecond").val().trim();
            global.exerciseCategories[newId] = new Category(categoryTitle, (notes.length == 0 ? "-" : notes));
            save.categories();
            previousAlertToShow.newCategory();
        } else {
            $(".errorMsg").slideDown(300);
        }
    });

    $(document).on("input keydown focusout blur", "td.position-relative > input", function () {
        if ($(this).val().trim().length == 0) {
            $(this).parent().removeClass("hasValue");
        } else {
            $(this).parent().addClass("hasValue");
        }
    });
    
    $(document).on("click", ".optionCategory", function () {
        $(this).children().children().children("input[type='radio']").prop("checked", true);
    });

    holdToEdit(".optionCategory[data-editing-enabled='true']",  editOptionCategory);

    holdToEdit('.workoutEntry', editWorkoutEntry);
    
    holdToEdit('.set', editSet);

    $(document).on("click", "#deleteCategoryBtn", function () {
        var categoryObj = $(this).data("category");
        alertMsgToAppend("miniAlert", true, ["TOPIDHERE", "MESSAGEID", "MSG", "IDOFYESBTN", "IDOFNOBTN", "YESMESG", "NOMESG"], ["deleteFromWorkoutsConfirm", "titleForDelete", "Delete <span>" + categoryObj.obj.title + "</span> from exercise categories?", "yesDeleteCategory", "cancelDeleteCategory", "Delete", "Cancel"], [{ attrName: "categoryKey", attrValue: categoryObj.relativeKey }]);
    });
    
    $(document).on("click", "#yesDeleteCategory", function () {
        var key = $("#alertBg").data("categoryKey");
        delete global.exerciseCategories[key];
        save.categories();
        previousAlertToShow.newCategory();
    });
        
    $(document).on("click", "#saveCategoryChanges", function () {
        var title = $("#inputFirst").val().trim();
        var notes = $("#inputSecond").val().trim();
        var categoryObj = $("#alertBg").data("categoryObj");
        if (title.length == 0) {
            $(".errorMsg").slideDown(300);
        } else {
            $(".errMsg").slideUp();
            global.exerciseCategories[categoryObj.relativeKey] = new Category(title, notes);
            save.categories();
            previousAlertToShow.newCategory();
        }
    });

    $(document).on("click", "#saveExerciseChanges", function () {
        var title = $("#inputFirst").val().trim();
        var notes = $("#inputSecond").val().trim();
        var exerciseObj = $("#alertBg").data("exerciseObj");
        if (title.length == 0) {
            $(".errorMsg").slideDown(300);
        } else {
            $(".errMsg").slideUp();
            global.exercises[exerciseObj.exerciseID].comment = notes;
            global.exercises[exerciseObj.exerciseID].name = title;
            global.exercises[exerciseObj.exerciseID].categoryID = $("input[type='radio'][name='category']:checked").val();
            save.exercises();
            previousAlertToShow.createExercise();
        }
    });
        
    $(document).on("click", ".addSetBtn", function () {
        var exerciseID = $(this).data("id");
        alertMsgToAppend("addSet", true, ["VALUETITLE"], ["Add Set"], [{ attrName: "exerciseId", attrValue: exerciseID }, { attrName: "arrayIndex", attrValue: $(this).data("arrayIndex") }]);
    });

    $(document).on("click", ".btnMinus, .btnPlus", function () {
        var inputSibling = $(this).siblings("input");
        var input = inputSibling.val();

        if (input.length == 0) {
            input = 0;
        } else {
            input = parseFloat(input);
        }

        if ($(this).hasClass("btnMinus")) {//minus
            if (inputSibling.attr("id") == "kgCount") {
                if (input > 2.5) {
                    input -= 2.5;
                } else {
                    input = 0;
                }
                input = input.toFixed(2);
                if (input.lastIndexOf("0") == input.length - 1)
                    input = parseFloat(input).toFixed(1);

            } else {
                if (input > 1) {
                    input--;
                } else {
                    input = 0;
                }
                input = parseInt(input);
            }
        } else {
            if (inputSibling.attr("id") == "kgCount") {
                input += 2.5;
                input = input.toFixed(2);
                if (input.lastIndexOf("0") == input.length - 1)
                    input = parseFloat(input).toFixed(1);
            } else {
                input++;
                input = parseInt(input);
            }
        }

        inputSibling.val(input);
        if (!inputSibling.parent().hasClass("hasValue"))
            inputSibling.parent().addClass("hasValue");
    });

    $(document).on("input", "#repCount", function () {
        $(this).val(parseInt($(this).val()));
    });

    $(document).on("click", ".set[data-has-note='true']", function () {
        alertMsgToAppend("multiPurposeAlert", true, ["TITLEAREA", "TABLEMULTIPURPOSE", "<!--ADDITIONAL HTML-->", "SAVECHANGESBUTTON", "YESBTN", "CANCELCHANGESBUTTON", "NOBTN"],
            ["Edit Comment", "hidden", "<textarea class='width-full margin-top-5'>" + $(this).data("note") + "</textarea>", "saveNoteChanges", "Save", "cancelNoteChanges", "Cancel"], [{ attrName: "setDetails", attrValue: $(this).data("setDetails") }]);
    });

        
    $(document).on("click", "#saveNoteChanges", function () {
        var setDetails = $("#alertBg").data("setDetails");
        var newNote = $("#alertBg textarea").val().trim();
        global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].note = newNote;
        save.historyWorkouts();
        if (newNote.length > 0) {
            $(".set[data-set-details='" + JSON.stringify(setDetails, Object.keys(setDetails).sort()) + "']").data("note", newNote); //JSON could not stringify following property order as declared, so force it so follow alphabetical order of properties
        } else {
            $(".set[data-set-details='" + JSON.stringify(setDetails, Object.keys(setDetails).sort()) + "']").attr("data-note", "").attr("data-has-note", false); //this way a unique identifier is created from the details object and can be used to easily query the DOM
        }
        closeAlert();
    });

        
    $(document).on("click", "#saveEditedSet", function () {
        var setDetails = $("#alertBg").data("setDetails");
        var setFromDOM = $(".set[data-set-details='" + JSON.stringify(setDetails, Object.keys(setDetails).sort()) + "']");
        var changed = false;
        var notesChanged = false;
        if (global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].weight != $("input#kgCount").val().trim()) {
            changed = true;
            global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].weight = $("input#kgCount").val().trim();
            setFromDOM.children("td:nth-child(2)").children("span").first().html(global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].weight);
        }

        if (global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].reps != $("input#repCount").val().trim()) {
            changed = true;
            global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].reps = $("input#repCount").val().trim();
            setFromDOM.children("td:nth-child(3)").children("span").first().html(global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].reps);
        }


        if (global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].note != $("#alertBg textarea").val().trim()) {
            notesChanged = true;
            global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].note = $("#alertBg textarea").val().trim();
            setFromDOM.attr("data-has-note", (global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].note.length > 0 ? true : false)).attr("data-note", global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].note);
        }

        if (changed || notesChanged)
            save.historyWorkouts();

        if (changed) {
            //if the edited set was a record set, then delete it from the records of that exercise
            checkForRecord(global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].exerciseID, setDetails.date, setDetails.exerciseIndex, setDetails.setIndex, true);

            //once deleted update all other record sets for that exercise
            updateRecords(global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].exerciseID);

            loadWorkoutsForToday();
        }
        closeAlert();
    });

        
    $(document).on("click", "#cancelNoteChanges", function () {
        closeAlert();
    });

    $(document).on("click", "#deleteSetBtn", function () {
        alertMsgToAppend("miniAlert", true, ["MSG", "IDOFYESBTN", "IDOFNOBTN", "YESMESG", "NOMESG"],
            ["Are you sure you want to delete the set?", "confirmDeleteSetBtn", "cancelDeleteSet", "Delete", "Cancel"], [{ attrName: "setDetails", attrValue: $(this).data("setDetails") }]);
    });

    $(document).on("click", "#cancelDeleteSet", function () {
        previousAlertToShow.deleteSet($("#alertBg").data("setDetails"));
    });

    $(document).on("click", "#confirmDeleteSetBtn", function () {
        deleteSets([$("#alertBg").data("setDetails")]);
        loadWorkoutsForToday();
        closeAlert();
    });

    $(document).on("click", "#deleteExerciseBtn", function () {
        alertMsgToAppend("miniAlert", true, ["MSG", "IDOFYESBTN", "IDOFNOBTN", "YESMESG", "NOMESG"],
            ["Are you sure you want to delete these records?", "confirmDeleteExerciseBtn", "cancelDeleteExercise", "Delete", "Cancel"], [{ attrName: "exerciseDetails", attrValue: $(this).data("exerciseDetails") }]);
    });
    
    $(document).on("click", "#confirmDeleteExerciseBtn", function () {
        var exerciseDetails = $("#alertBg").data("exerciseDetails");
        deleteExercise(exerciseDetails);
        loadWorkoutsForToday();
        closeAlert();
    });
}

function createNewExercise() {
    alertMsgToAppend("createExercise", true, ["<!--CATEGORYOPTIONS-->"], [createCategoryRows()]);
}

function editOptionCategory(e) {
    let categoryObj = $(e).data("category");
    console.log("categoryObj editOptionCategory", categoryObj);
    let hasValue = "";
    if (categoryObj.obj.description.trim().length > 1)
        hasValue = "hasValue";

    let deleteBtn = `<span id='deleteCategoryBtn' class='glyphicon glyphicon-trash' data-category='` + JSON.stringify(categoryObj) + `'></span>`;

    alertMsgToAppend("multiPurposeAlert", true, ["TITLEAREA", "TITLEHERE", "PLACEHOLDERTITLE", "VALUETITLE", "SECONDHERE", "PLACEHOLDERNOTES", "VALUENOTES", "ERRORMSG", "SAVECHANGESBUTTON", "YESBTN", "CANCELCHANGESBUTTON", "NOBTN", "CLASS1", "CLASS2", "<!--ADDITIONAL HTML-->"], ["Edit Category", "Title", "Category Name", categoryObj.obj.title, "Notes", "Optional", categoryObj.obj.description, "The category must have a valid title.", "saveCategoryChanges", "Save", "cancelCategoryChanges", "Cancel", "hasValue", hasValue, deleteBtn], [{ attrName: "categoryObj", attrValue: categoryObj }]);
}

function editWorkoutEntry(e) {
    let exerciseObj = $(e).data("values");
    console.log("exerciseObj editWorkoutEntry", exerciseObj);
    let hasValue = "";
    if (exerciseObj.comment.trim().length > 1)
        hasValue = "hasValue";

    let categoryOptions = `<h3>Category:</h3>
    <div class="categoryTable">
        <table class="width-full">
            <tbody>
                `+ createCategoryRows(true, exerciseObj.categoryID, false) + `
            </tbody>
        </table>
    </div>`;

    alertMsgToAppend("multiPurposeAlert", true, ["TITLEAREA", "TITLEHERE", "PLACEHOLDERTITLE", "VALUETITLE", "SECONDHERE", "PLACEHOLDERNOTES", "VALUENOTES", "ERRORMSG", "SAVECHANGESBUTTON", "YESBTN", "CANCELCHANGESBUTTON", "NOBTN", "CLASS1", "CLASS2", "<!--ADDITIONAL HTML-->"], ["Edit Exercise", "Title", "Exercise Name", exerciseObj.name, "Notes", "Optional", exerciseObj.comment, "The exercise must have a valid title.", "saveExerciseChanges", "Save", "cancelExerciseChanges", "Cancel", "hasValue", hasValue, categoryOptions], [{ attrName: "exerciseObj", attrValue: exerciseObj }]);
}

//$("#alertBg").data("setDetails")
function editSet(e, passedSetDetails = null) {
    let setDetails;
    if(passedSetDetails)
        setDetails = passedSetDetails;
    else
        setDetails = $(e).data("setDetails");

    alertMsgToAppend("addSet", true, ["VALUETITLE", '"0.0"', 'value="0"', '</textarea>', "Add Set", "addSetToExercise", "<!--OPTIONALHTML-->"],
        ["Edit Set", '"' + global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].weight + '"', 'value="' + global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].reps + '"', global.historyWorkouts[setDetails.date][setDetails.exerciseIndex].set[setDetails.setIndex].note + "</textarea>", "Save Set", "saveEditedSet", `<span id="deleteSetBtn" class="glyphicon glyphicon-trash" data-set-details='` + JSON.stringify(setDetails) + `'></span>`],
        [{ attrName: "setDetails", attrValue: setDetails }]);
}