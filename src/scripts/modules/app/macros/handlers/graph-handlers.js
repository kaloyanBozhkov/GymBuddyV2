import BaseMacros from '../../../macros/base-macros';
import getTime from '../../../common/get-current-time';
import updateBarWidths from '../../macros/update-bar-widths';
import loadDailyServings from '../../macros/load-daily-servings';
const entriesForDayContainerToggler = (toggle = true) => {
    let container = $(".caloricDistribution__detailsContainer__container");
    if(toggle)
        container.toggleClass("active");
    else
        container.removeClass("active");

    $("#showGraphEntriesForDay").attr('data-text', `${container.hasClass("active") ? "Hide" : "Show"} Entries`);
}

const toggleCaloricDistributionScreen = showGraphDetails => {
    if(showGraphDetails){
        $(".caloricDistribution__mainContainer").removeClass("active");
        $(".caloricDistribution__detailsContainer").addClass("active");
    }else{
        entriesForDayContainerToggler(false);
        $(".caloricDistribution__mainContainer").addClass("active");
        $(".caloricDistribution__detailsContainer").removeClass("active");
    }
}

const setDate = date => $(".caloricDistribution__detailsContainer__displayDateLabel").html(date);
const setCalories = (curr, tot) => {
    $(".caloricDistribution__detailsContainer__currentCalories").html(curr);
    $(".caloricDistribution__detailsContainer__totalCalories").html(tot);
}

export default () => {
    $(document).on("click", ".graphContainer__content li:not([data-total-calories='0']) > div", function(){
        let li = $(this).parent();
        let singleDayServing = li.data("servings");
        let totalMacros = li.data("totalMacros");
        let {fats, carbs, proteins, time} = singleDayServing;
        time = getTime(0, time);

        setDate(time.displayDate);
        setCalories(BaseMacros.returnTotalCalories(fats, carbs, proteins), BaseMacros.returnTotalCalories(totalMacros.fats, totalMacros.carbs, totalMacros.proteins));
        updateBarWidths(".caloricDistribution__detailsContainer__mainContainer", {fats, carbs, proteins}, totalMacros);
        $('#showGraphEntriesForDay').data('singleDayServing', singleDayServing);
        loadDailyServings(".caloricDistribution__detailsContainer", $(this).data("singleDayServing"));
        toggleCaloricDistributionScreen(true);
    });

    $(document).on("click", ".caloricDistribution__detailsContainer__header .menu-back", () => toggleCaloricDistributionScreen(false));

    $(document).on('click', '#showGraphEntriesForDay', entriesForDayContainerToggler);

   //Handler for entry click toggle inner container's active is on DailyEntries
   //Handler for save button click on active entry is on DailyEntries
}