import getCurrentTime from '../../../common/get-current-time';
import updateBarWidths from '../update-bar-widths';
import getPastHistorySerings from '../get-past-history-servings';

export default () => {
    $(document).on("click", "#menuHistoryServings .menu-left", () => {
        let date = getCurrentTime(-1, $("#dayEntriesShownFor").data("date"));
        $("#dayEntriesShownFor").html(date.displayDate).data("date", date.literal);
        if ($("#menuHistoryServings .menu-right").hasClass("hidden")) {
            let currentDate = getCurrentTime(-1); //yesterday date not current
            if (date.date < currentDate.date)
                $("#menuHistoryServings .menu-right").removeClass("hidden");
        }
        let {currentServings, totalMacros} = getPastHistorySerings(date);
        updateBarWidths(".pastEntries__container",currentServings, totalMacros);
    });

    $(document).on("click", "#menuHistoryServings .menu-right", function () {
        if (!$(this).hasClass("hidden")) {
            let date = getCurrentTime(+1, $("#dayEntriesShownFor").data("date"));
            $("#dayEntriesShownFor").html(date.displayDate).data("date", date.literal);
            let currentDate = getCurrentTime(-1); //yesterday date not current
            if (date.date >= currentDate.date)
                $(this).addClass("hidden");
            let {currentServings, totalMacros} = getPastHistorySerings(date);
            updateBarWidths(".pastEntries__container",currentServings, totalMacros);
        }
    });
}