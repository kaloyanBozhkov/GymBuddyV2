import updateOldWorkoutSection from '../update-old-workout-section';
import getTime from '../../../common/get-current-time';

export default () => {
    $(document).on("click", "#menuHistoryWorkouts #menu-left", function () {
        console.log("date", $("#dayWorkoutsShownFor").data("date"));
        var date = getTime(1, $("#dayWorkoutsShownFor").data("date"));
        $("#dayWorkoutsShownFor").html(date.displayDate).data("date", date);
        if ($("#menuHistoryWorkouts #menu-right").hasClass("hidden")) {
            var currentDate = getTime(1); //yesterday date not current
            if (date.date < currentDate.date)
                $("#menuHistoryWorkouts #menu-right").removeClass("hidden");
        }
    
        updateOldWorkoutSection(date);
    });
    
    $(document).on("click", "#menuHistoryWorkouts #menu-right", function () {
        if (!$(this).hasClass("hidden")) {
            var date = getTime(1, $("#dayWorkoutsShownFor").data("date"))
            $("#dayWorkoutsShownFor").html(date.displayDate).data("date", date);
            var currentDate = getTime(1); //yesterday date not current
            if (date.date >= currentDate.date)
                $(this).addClass("hidden");
    
            updateOldWorkoutSection(date);
        }
    });
}