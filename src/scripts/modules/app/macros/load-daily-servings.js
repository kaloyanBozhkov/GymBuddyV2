import global from '../../global-variables';
import { round, isEmpty } from '../../common/utilities';
import getTime from '../../common/get-current-time';
import BaseMacros from '../../macros/base-macros';

export default (containerSelector = ".dailyEntries", singleDayServing = global.singleDayServing, msgDate) => {
    let container = containerSelector.substr(1);
    $(containerSelector).empty();
    console.log(singleDayServing);
    if (!isEmpty(singleDayServing) && singleDayServing.servings.length > 0) {
        for (let j = singleDayServing.servings.length - 1; j >= 0; j--) {
            let item = singleDayServing.servings[j];
            let tmpObj = {
                title: item.itemName,
                proteins: round(item.proteins / item.servingQuantity),
                fats: round(item.fats / item.servingQuantity),
                carbs: round(item.carbs / item.servingQuantity),
                grams: item.servingSize
            }
            let singleServingEntryDiv = `<div class="${container}__entry">
                <div class='formatedRow'>
                    <p>${item.itemName}</p>
                    <p>${getTime(0, item.time).displayTime}</p>
                    <i class="fas fa-angle-up"></i>
                </div>
                <div class="${container}__entry__details">
                    <p>You had ${item.servingQuantity} serving${item.servingQuantity > 1 ? "s" : ""} of ${item.servingSize}g:</p>
                    <div class="${container}__entry__details__content">
                        <div class="${container}__entry__details__content__tracker">
                            <p>${BaseMacros.returnTotalCalories(item.fats, item.carbs, item.proteins)}</p>
                            <div>
                                <p class='fats'>${item.fats}</p>
                                <p class='carbs'>${item.carbs}</p>
                                <p class='proteins'>${item.proteins}</p>
                            </div>
                        </div>
                        <div class="${container}__entry__details__content__actions">
                            <div class='saveEntry' data-values='${JSON.stringify(tmpObj)}'>
                                <i class='fa fa-heart'></i>
                            </div>
                            ${(containerSelector == ".dailyEntries" ? `
                            <div class='removeEntry' data-item-id='${containerSelector == ".dailyEntries" ? j : ""}'>
                                <i class="fa fa-trash-alt"></i>
                            </div>` : "")}
                        </div>
                    </div>
                </div>
            </div>`;
            $(`${containerSelector}__container`).append(singleServingEntryDiv);
        }
    } else {
        $(`${containerSelector}__container`).append(`<p>No servings have been added for ${msgDate ? msgDate : "today yet"}.</p>`);
    }
    console.log(`Finished ${container} loadDailyServings`);
}