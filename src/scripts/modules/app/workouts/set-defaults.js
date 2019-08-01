import global from '../../global-variables';
import Exercise from '../../workouts/exercise';
import save from '../../common/save'
export function setDefaultExercises(){
    console.log("set default exercises");
    global.exercises = {
        0: new Exercise(0, "Flat Dumbell Bench Press", "Lying on bench, use barbell to press and workout your chest.", 3)
    }
    save.exercises();
}

export function setDefaultExerciseCategories(){
    console.log("set default exercise categories");
    global.exerciseCategories = {
        0: { title: "Shoulders", description: "These are the exercises related to the shoulders." },
        1: { title: "Triceps", description: "These are the exercises related to the triceps." },
        2: { title: "Biceps", description: "These are the exercises related to the biceps." },
        3: { title: "Chest", description: "These are the exercises related to the chest." },
        4: { title: "Back", description: "These are the exercises related to the back." },
        5: { title: "Legs", description: "These are the exercises related to the legs." },
        6: { title: "Abs", description: "These are the exercises related to the abs." }
    };
    save.categories();
}