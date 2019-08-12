import global from '../../global-variables';
import { round, isEmpty } from '../../common/utilities';
import getTime from '../../common/get-current-time';
export default function(entriesContainer = ".dailyEntries__container", singleDayServing = global.singleDayServing, msg = "No servings have been added for today yet") {
    $(entriesContainer).empty();
    if (!isEmpty(singleDayServing) && singleDayServing.getServings().length > 0) {
        for (let j = singleDayServing.getServings().length - 1; j >= 0; j--) {
            let item = singleDayServing.getServings()[j];
            let hideLast = (j == 0 ? "" : "hidden");
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
            let singleServingEntryDiv = `<div class="singleServingLoadedEntry">
            <div><p>${item.itemName}</p></div><div><p><span>${getTime(0, item.time).displayTime}</span><span class="fa fa-angle-up"></span></p></div>
            <div class="innerContents">
            <div>
                <p>You had ${item.servingQuantity} servings of ${item.servingSize}g</p>
                <div>
                    <p>Calories: ${calories}</p>
                    <ul>
                        <li><p>Fats: <span>${fats}g</span></p></li>
                        <li><p>Carbs: <span>${carbs}g</span></p></li>
                        <li><p>Protein: <span>${proteins}g</span></p></li>
		            </ul>
                </div><div><div class='saveEntry' data-values='${JSON.stringify(tmpObj)}'>
                        <span class='fa fa-heart'></span>
                    </div>
                    `+ (entriesContainer == ".dailyEntries__container" ? `
                    <div class='removeEntry' data-item-id='${entriesContainer == ".dailyEntries__container" ? j : ""}'>
                        <span class="fa fa-trash-alt"></span>
                    </div>` : "") + `
                </div>
            </div>
            <div></div>
            </div>
            <div></div>
            <div class="${hideLast}"></div>
            </div>`;
            $(entriesContainer).append(singleServingEntryDiv);
        }
    } else {
        //$(entriesContainer).append(`<p>${msg}.</p>`);
        $(entriesContainer).append(`<div class="dailyEntries__entry">
            <div class='formatedRow'>
                <p>Pizza</p>
                <p>20:55</p>
                <i class="fas fa-angle-up"></i>
            </div>
            <div class="dailyEntries__entry__details">
                <p>stuff</p>
            </div>
        </div>`);
    }
}