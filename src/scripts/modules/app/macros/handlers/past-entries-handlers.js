import getCurrentTime from '../../../common/get-current-time';
import updateBarWidths from '../update-bar-widths';
import getPastHistorySerings from '../get-past-history-servings';
import loadDailyServings from '../load-daily-servings';

const updatePastEntriesBarsAndEntries = date => {
    let {currentServings, totalMacros} = getPastHistorySerings(date.keyFromDate);
    updateBarWidths("#pastEntries",currentServings, totalMacros);
    loadDailyServings(".pastEntries__container", currentServings, date.displayDate);
}

export default () => {
    $(document).on("click", "#menuHistoryServings .menu-left", () => {
        let date = getCurrentTime(-1, $("#dayEntriesShownFor").data("date"));
        $("#dayEntriesShownFor").html(date.displayDate).data("date", date.literal);
        if ($("#menuHistoryServings .menu-right").hasClass("hidden")) {
            let currentDate = getCurrentTime(-1); //yesterday date not current
            if (date.date < currentDate.date)
                $("#menuHistoryServings .menu-right").removeClass("hidden");
        }
        updatePastEntriesBarsAndEntries(date);
    });

    $(document).on("click", "#menuHistoryServings .menu-right", function () {
        if (!$(this).hasClass("hidden")) {
            let date = getCurrentTime(+1, $("#dayEntriesShownFor").data("date"));
            $("#dayEntriesShownFor").html(date.displayDate).data("date", date.literal);
            let currentDate = getCurrentTime(-1); //yesterday date not current
            if (date.date >= currentDate.date)
                $(this).addClass("hidden");

            updatePastEntriesBarsAndEntries(date);
        }
    });

    $(document).on('click', '#showPastEntriesForDay', function (){
        let container = $(".pastEntries__container");
        container.toggleClass("active");
        $(this).attr('data-text', `${container.hasClass("active") ? "Hide" : "Show"} Entries`);
    });
}