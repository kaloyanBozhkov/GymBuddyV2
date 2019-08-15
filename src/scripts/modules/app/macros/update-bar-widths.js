import loadDailyServings from './load-daily-servings';
import {calculatePercentage} from '../../common/utilities';

export default (container, currentObj, totalObj) => {
    $(`${container} #currentFats`).html(currentObj.fats);
    $(`${container} #currentCarbs`).html(currentObj.carbs);
    $(`${container} #currentProteins`).html(currentObj.proteins);
    $(`${container} #totalFats`).html(totalObj.fats);
    $(`${container} #totalCarbs`).html(totalObj.carbs);
    $(`${container} #totalProteins`).html(totalObj.proteins);
    $(`${container} #currentCalories`).html(currentObj.calculateCalories());
    $(`${container} #totalCalories`).html(totalObj.calculateCalories());

    let barFatsWidth = calculatePercentage(currentObj.fats, totalObj.fats);
    let barCarbsWidth = calculatePercentage(currentObj.carbs, totalObj.carbs);
    let barProteinsWidth = calculatePercentage(currentObj.proteins, totalObj.proteins);

    $(`${container} #barFats > div`).width(`${barFatsWidth}%`);
    $(`${container} #barCarbs > div`).width(`${barCarbsWidth}%`);
    $(`${container} #barProteins > div`).width(`${barProteinsWidth}%`);
    $(`${container} #barFats > div`).data("progress", barFatsWidth);
    $(`${container} #barCarbs > div`).data("progress", barCarbsWidth);
    $(`${container} #barProteins > div`).data("progress", barProteinsWidth);

    if (totalObj.fats < currentObj.fats)
        $(`${container} #warningFats`).removeClass("hidden");
    else 
        $(`${container} #warningFats`).addClass("hidden");
    
    if (totalObj.carbs < currentObj.carbs)
        $(`${container} #warningCarbs`).removeClass("hidden");
    else
        $(`${container} #warningCarbs`).addClass("hidden");
    
    if (totalObj.proteins < currentObj.proteins)
        $(`${container} #warningProteins`).removeClass("hidden");
    else
        $(`${container} #warningProteins`).addClass("hidden");
    


    loadDailyServings();
}

