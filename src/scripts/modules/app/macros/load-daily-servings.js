import global from '../../global-variables';
import getTime from '../../common/get-current-time';
import BaseMacros from '../../macros/base-macros';

const createEntryRowsForServing = ({fats, carbs, proteins, itemName, servingSize,servingQuantity, time}, container, containerSelector, j) => {
    let [tf, tc, tp] = BaseMacros.returnTotalMacros(fats, carbs, proteins, servingQuantity)
    return `<div class="${container}__entry">
    <div class='formatedRow formatedRow--withoutMargin' data-id='${j + 1}'>
        <p>${itemName}</p>
        <p>${getTime(0, time).displayTime}</p>
        <i class="fas fa-angle-up"></i>
    </div>
    <div class="${container}__entry__details">
        <p>You had ${servingQuantity} serving${servingQuantity > 1 ? "s" : ""} of ${servingSize}g:</p>
        <div class="${container}__entry__details__content">
            <div class="${container}__entry__details__content__tracker">
                <p>${BaseMacros.returnTotalCalories(tf, tc, tp)}</p>
                <div>
                    <p class='fats'>${tf}</p>
                    <p class='carbs'>${tc}</p>
                    <p class='proteins'>${tp}</p>
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
}
export default (containerSelector = ".dailyEntries", singleDayServing = global.singleDayServing, msgDate) => {
    let container = containerSelector.substr(1);
    let singleServingEntryDiv = singleDayServing.servings.length == 0 ? 
                                `<p data-when='${msgDate ? `on ${msgDate}` : "for today yet"}'>No servings have been added</p>` : 
                                singleDayServing.servings.reduceRight((acc, s, j) => [...acc, createEntryRowsForServing(s, container, containerSelector, j)], []).join("");
    container = $(`${containerSelector}__container`);
    setTimeout(()=>{
        container.empty().append(singleServingEntryDiv);//one DOM API update call!
    }, container.hasClass("active") ? 450 : 0);//if its open, wait for it to hide and then update (for Past Entries)
    console.log(`Finished ${container.attr("class")} loadDailyServings`);
}
