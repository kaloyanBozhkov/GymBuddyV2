import global from '../../global-variables';
import { round, isEmpty } from '../../common/utilities';
import getTime from '../../common/get-current-time';
export default (container = ".dailyEntries", singleDayServing = global.singleDayServing, msgDate) => {
    $(container).empty();
    console.log(singleDayServing);
    if (!isEmpty(singleDayServing) && singleDayServing.getServings().length > 0) {
        for (let j = singleDayServing.getServings().length - 1; j >= 0; j--) {
            let item = singleDayServing.getServings()[j];
            let calories = round(singleDayServing.calculateCalories.call(item) * parseFloat(item.servingQuantity)); //serving inside servings array of SingleDayServing may not have calculateCalories inherited from BaseMacro if it is loaded through JSON. SingleDayServing WILL have it, since on load it is re-set.
            let proteins = round(parseFloat(item.proteins) * parseFloat(item.servingQuantity));
            let carbs = round(parseFloat(item.carbs) * parseFloat(item.servingQuantity));
            let fats = round(parseFloat(item.fats) * parseFloat(item.servingQuantity));
            let tmpObj = {
                title: item.itemName,
                proteins: round(proteins / item.servingQuantity),
                fats: round(fats / item.servingQuantity),
                carbs: round(carbs / item.servingQuantity),
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
                            <p>${calories}</p>
                            <div>
                                <p class='fats'>${fats}</p>
                                <p class='carbs'>${carbs}</p>
                                <p class='proteins'>${proteins}</p>
                            </div>
                        </div>
                        <div class="${container}__entry__details__content__actions">
                            <div class='saveEntry' data-values='${JSON.stringify(tmpObj)}'>
                                <i class='fa fa-heart'></i>
                            </div>
                            ${(container == ".dailyEntries" ? `
                            <div class='removeEntry' data-item-id='${container == ".dailyEntries" ? j : ""}'>
                                <i class="fa fa-trash-alt"></i>
                            </div>` : "")}
                        </div>
                    </div>
                </div>
            </div>`;
            $(`${container}__container`).append(singleServingEntryDiv);
        }
    } else {
        $(`${container}__container`).append(`<p>No servings have been added for ${msgDate ? msgDate : "today yet"}.</p>`);
    }
    console.log(`Finished ${container} loadDailyServings`);
}