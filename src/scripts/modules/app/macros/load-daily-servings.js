import global from '../../global-variables';
import { round, isEmpty } from '../../common/utilities';
import getTime from '../../common/get-current-time';
import BaseMacros from '../../macros/base-macros';

const createEntryRowsForServing = ({fats, carbs, proteins, itemName, servingSize,servingQuantity, time}, container, containerSelector, j) => `<div class="${container}__entry">
<div class='formatedRow formatedRow--withoutMargin' data-id='${j + 1}'>
    <p>${itemName}</p>
    <p>${getTime(0, time).displayTime}</p>
    <i class="fas fa-angle-up"></i>
</div>
<div class="${container}__entry__details">
    <p>You had ${servingQuantity} serving${servingQuantity > 1 ? "s" : ""} of ${servingSize}g:</p>
    <div class="${container}__entry__details__content">
        <div class="${container}__entry__details__content__tracker">
            <p>${BaseMacros.returnTotalCalories(...BaseMacros.returnTotalMacros(fats, carbs, proteins, servingQuantity))}</p>
            <div>
                <p class='fats'>${fats}</p>
                <p class='carbs'>${carbs}</p>
                <p class='proteins'>${proteins}</p>
            </div>
        </div>
        <div class="${container}__entry__details__content__actions">
            <div class='saveEntry' data-values='${JSON.stringify({
                itemName,
                proteins,
                fats,
                carbs,
                servingSize
            })}'>
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

export default (containerSelector = ".dailyEntries", singleDayServing = global.singleDayServing, msgDate) => {
    let container = containerSelector.substr(1);

    $(`${containerSelector}__container`).empty();

    let singleServingEntryDiv = singleDayServing.servings.length == 0 ? 
    `<p>No servings have been added for ${msgDate ? msgDate : "today yet"}.</p>` : 
    singleDayServing.servings.reduceRight((acc, s, j) => [...acc, createEntryRowsForServing(s, container, containerSelector, j)] ,[]).join("");

    $(`${containerSelector}__container`).append(singleServingEntryDiv);

    console.log(`Finished ${container} loadDailyServings`);
}
