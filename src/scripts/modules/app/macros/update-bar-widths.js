import loadDailyServings from './load-daily-servings';
import {calculatePercentage} from '../../common/utilities';

export default (container, currentServ, totalMacros) => {
    $(`${container} #currentFats`).html(currentServ.fats);
    $(`${container} #currentCarbs`).html(currentServ.carbs);
    $(`${container} #currentProteins`).html(currentServ.proteins);
    $(`${container} #totalFats`).html(totalMacros.fats);
    $(`${container} #totalCarbs`).html(totalMacros.carbs);
    $(`${container} #totalProteins`).html(totalMacros.proteins);
    $(`${container} #currentCalories`).html(currentServ.calculateCalories());
    $(`${container} #totalCalories`).html(totalMacros.calculateCalories());

    let barFatsWidth = calculatePercentage(currentServ.fats, totalMacros.fats);
    let barCarbsWidth = calculatePercentage(currentServ.carbs, totalMacros.carbs);
    let barProteinsWidth = calculatePercentage(currentServ.proteins, totalMacros.proteins);

    $(`${container} #barFats > div`).width(`${barFatsWidth}%`);
    $(`${container} #barCarbs > div`).width(`${barCarbsWidth}%`);
    $(`${container} #barProteins > div`).width(`${barProteinsWidth}%`);
    $(`${container} #barFats > div`).data("progress", barFatsWidth);
    $(`${container} #barCarbs > div`).data("progress", barCarbsWidth);
    $(`${container} #barProteins > div`).data("progress", barProteinsWidth);

    if (totalMacros.fats < currentServ.fats)
        $(`${container} #warningFats`).removeClass("hidden");
    else 
        $(`${container} #warningFats`).addClass("hidden");
    
    if (totalMacros.carbs < currentServ.carbs)
        $(`${container} #warningCarbs`).removeClass("hidden");
    else
        $(`${container} #warningCarbs`).addClass("hidden");
    
    if (totalMacros.proteins < currentServ.proteins)
        $(`${container} #warningProteins`).removeClass("hidden");
    else
        $(`${container} #warningProteins`).addClass("hidden");
        
    console.log(`Finished ${container} updateBarWidths`);
}

