import getTime from '../../common/get-current-time';
import global from '../../global-variables';
export default date => {
    var displayDate = getTime(date).displayDate;
    $("#dayWorkoutsShownFor").html(displayDate).data("date", date);
    if (global.historyWorkouts.length > 0) {
        alert("ok CHANGE SHIT FAM!");
    }
}