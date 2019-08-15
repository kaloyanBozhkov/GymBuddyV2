import getCurrentTime from '../../../common/get-current-time';
import updateBarWidths from '../update-bar-widths';
import getPastHistorySerings from '../get-past-history-servings';

export default () => {
    $(document).on("click", "#menuHistoryServings .menu-left", function () {
        var date = getCurrentTime(0, $("#dayEntriesShownFor").data("date"));
        $("#dayEntriesShownFor").html(date.displayDate).data("date", date);
        if ($("#menuHistoryServings .menu-right").hasClass("hidden")) {
            var currentDate = getCurrentTime(-1); //yesterday date not current
            if (date.date < currentDate.date)
                $("#menuHistoryServings .menu-right").removeClass("hidden");
        }
        updateBarWidths(".previousEntries__container",...getPastHistorySerings(date));
    });

    $(document).on("click", "#menuHistoryServings .menu-right", function () {
        if (!$(this).hasClass("hidden")) {
            var date = getCurrentTime(-1, $("#dayEntriesShownFor").data("date"));
            $("#dayEntriesShownFor").html(getDisplayDate(date)).data("date", date);
            var currentDate = getCurrentTime(-1); //yesterday date not current
            if (date.date >= currentDate.date)
                $(this).addClass("hidden");
        updateBarWidths(".previousEntries__container",...getPastHistorySerings(date));
        }
    });
}