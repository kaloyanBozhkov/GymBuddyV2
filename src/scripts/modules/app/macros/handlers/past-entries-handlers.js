import getCurrentTime from '../../../common/get-current-time';
import updateBarWidths from '../update-bar-widths';
import getPastHistorySerings from '../get-past-history-servings';
import loadDailyServings from '../load-daily-servings';

const updatePastEntriesBarsAndEntries = date => {
    let {currentServings, totalMacros} = getPastHistorySerings(date.keyFromDate);
    updateBarWidths("#pastEntries",currentServings, totalMacros);    
    loadDailyServings(".pastEntries", currentServings, date.displayDate);
    entriesForDayToggler(false);
}

const entriesForDayToggler = (toggle = true) => {
    let container = $(".pastEntries__container");
    if(toggle)
        container.toggleClass("active");
    else
        container.removeClass("active");

    $("#showPastEntriesForDay").attr('data-text', `${container.hasClass("active") ? "Hide" : "Show"} Entries`);
}

export default () => {
    $(document).on("click", "#menuHistoryServings .menu-left", () => {
        let date = getCurrentTime(-1, $("#dayEntriesShownFor").data("date"));
        $("#dayEntriesShownFor").html(date.displayDate).data("date", date.literal);
        if ($("#menuHistoryServings .menu-right").hasClass("invisible")) {
            let currentDate = getCurrentTime(-1); //yesterday date not current
            if (date.date < currentDate.date)
                $("#menuHistoryServings .menu-right").removeClass("invisible");
        }
        updatePastEntriesBarsAndEntries(date);
    });

    $(document).on("click", "#menuHistoryServings .menu-right:not(.invisible)", function () {
            let date = getCurrentTime(+1, $("#dayEntriesShownFor").data("date"));
            $("#dayEntriesShownFor").html(date.displayDate).data("date", date.literal);
            let currentDate = getCurrentTime(-1); //yesterday date not current
            if (date.date >= currentDate.date)
                $(this).addClass("invisible");

            updatePastEntriesBarsAndEntries(date);
    });

    $(document).on('click', '#showPastEntriesForDay', entriesForDayToggler);

   //Handler for entry click toggle inner container's active is on DailyEntries
   //Handler for save button click on active entry is on DailyEntries
}