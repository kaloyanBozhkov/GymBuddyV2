import global from '../../global-variables';
import Exercise from '../../workouts/exercise';
import Category from '../../workouts/category';
import save from '../../common/save';
export default () => {
    global.exercises = [
        new Category("Shoulders", "Shoulder exercises", [
            new Exercise(0, "Arnold Dumbell Press", "", 0),
            new Exercise(1, "Front Dumbell Raise", "", 0),
            new Exercise(2, "Hammer Strength Shoulder Press", "", 0),
            new Exercise(3, "Laterall Dumbell Raise", "", 0),
            new Exercise(4, "Overhead Press", "", 0),
            new Exercise(5, "Rear Delt Dumbell Raise", "", 0),
            new Exercise(6, "Seated Dumbell Lateral Raise", "", 0),
            new Exercise(7, "Seated Machine Overhead Press", "", 0)
        ]),
        new Category("Triceps", "Triceps exercises", [
            new Exercise(0, "Cable Overhead Triceps Extension", "", 1),
            new Exercise(1, "Close Grip Barbell Bench Press", "", 1),
            new Exercise(2, "Dumbell Overhead Triceps Extension", "", 1),
            new Exercise(3, "Dumbell Side Triceps", "", 1),
            new Exercise(4, "Rope Pushdown", "", 1),
            new Exercise(5, "Seated Machine Triceps", "", 1),
            new Exercise(6, "V-Bar Cables Push Down", "", 1),
            new Exercise(7, "Parallel Bar Triceps Dips", "", 1),
            new Exercise(8, "EZ-Bar Skullcrusher", "", 1)
        ]),
        new Category("Biceps", "Biceps exercises", [
            new Exercise(0, "Barbell Curl", "", 2),
            new Exercise(1, "Cable Curl", "", 2),
            new Exercise(2, "Dumbell Curl", "", 2),
            new Exercise(3, "Dumbell Hammer Curl", "", 2),
            new Exercise(4, "Dumbell Preacher Curl", "", 2),
            new Exercise(5, "EZ-Bar Curl", "", 2),
            new Exercise(6, "Seated EZ-Bar Curl", "", 2),
            new Exercise(7, "Spider Curls", "", 2),
            new Exercise(8, "Spider Hammers", "", 2),
            new Exercise(9, "Seated Machine Curl", "", 2)
        ]),
        new Category("Chest", "Chest exercises", [
            new Exercise(0, "Flat Dumbell Bench Press", "", 3),
            new Exercise(1, "Cables Chest", "", 3),
            new Exercise(2, "Chest Press Machine", "", 3),
            new Exercise(3, "Decline Barbell Bench Press", "", 3),
            new Exercise(4, "Decline Dumbell Bench press", "", 3),
            new Exercise(5, "Decline Dumbell Fly", "", 3),
            new Exercise(6, "Flat Barbell Bench Press", "", 3),
            new Exercise(7, "Flat Dumbell Bench press", "", 3),
            new Exercise(8, "Flat Dumbell Fly", "", 3),
            new Exercise(9, "Incline Barbell Bench Press", "", 3),
            new Exercise(10, "Incline Dumbell Bench press", "", 3),
            new Exercise(11, "Incline Dumbell Fly", "", 3),
            new Exercise(12, "Decline Pushup", "", 3),
            new Exercise(13, "Incline Pushup", "", 3),
            new Exercise(14, "Pushup", "", 3)
        ]),
        new Category("Back", "Back exercises", [
            new Exercise(0, "Barbell Row", "", 4),
            new Exercise(1, "Barbell Shrug", "", 4),
            new Exercise(2, "Pull Up", "", 4),
            new Exercise(3, "Deadlift", "", 4),
            new Exercise(4, "Dumbell Row", "", 4),
            new Exercise(5, "Lat Pulldown", "", 4),
            new Exercise(6, "Muscle Up", "", 4),
            new Exercise(7, "Seated Cable Row", "", 4),
            new Exercise(8, "Seated Machine Row", "", 4),
            new Exercise(9, "T-Bar Row", "", 4)
        ]),
        new Category("Legs", "Legs exercises", [
            new Exercise(0, "Barbell Calf Raise", "", 5),
            new Exercise(1, "Barbell Front Squat", "", 5),
            new Exercise(2, "Barbell Glute Bridge", "", 5),
            new Exercise(3, "Barbell Squat", "", 5),
            new Exercise(4, "Glute-Ham Raise", "", 5),
            new Exercise(5, "Leg Extension Machine", "", 5),
            new Exercise(6, "Leg Press", "", 5),
            new Exercise(6, "Dumbell Lunges", "", 5),
            new Exercise(7, "Romanian Deadlift", "", 5),
            new Exercise(8, "Seated Calf Riase Machine", "", 5),
            new Exercise(9, "Seated Leg Curl Machine", "", 5),
            new Exercise(10, "Standing Calf Raise Machine", "", 5)
        ]),
        new Category("Abs", "Abs exercises", [
            new Exercise(0, "Cable Crunch", "", 6),
            new Exercise(1, "Crunch Machine", "", 6),
            new Exercise(2, "Dragon Flag", "", 6),
            new Exercise(3, "Hanging Knee Raise", "", 6),
            new Exercise(4, "Hanging Leg Raise", "", 6),
            new Exercise(5, "Plank", "", 6),
            new Exercise(6, "Side Plank", "", 6)
        ])
    ];
    save.exercises();
}