import global from '../../global-variables';
import { round, replaceArrays, isEmpty } from '../../common/utilities';
import getTime from '../../common/get-current-time';
export default function(entriesContainer = "#entriesContainer", singleDayServing = global.singleDayServing, msg = "No servings have been added for today yet") {
    $(entriesContainer).empty();
    if (!isEmpty(singleDayServing) && singleDayServing.getServings().length > 0) {
        var singleServingEntryDiv = `<div class="singleServingLoadedEntry">
            <div><p>FOODNAME</p></div><div><p><span>TIME</span><span class="fa fa-angle-up"></span></p></div>
            <div class="innerContents">
            <div>
                <p>You had SERV servings of GRMSg</p>
                <div>
                    <p>Calories: CALS</p>
                    <ul>
                        <li><p>Fats: <span>FATSg</span></p></li>
                        <li><p>Carbs: <span>CARBSg</span></p></li>
                        <li><p>Protein: <span>PROTEINSg</span></p></li>
		            </ul>
                </div><div><div class='saveEntry' data-values='DATAVALUES'>
                        <span class='fa fa-heart'></span>
                    </div>
                    `+ (entriesContainer == "#entriesContainer" ? `
                    <div class='removeEntry' data-item-id='ATTRID'>
                        <span class="fa fa-trash-alt"></span>
                    </div>` : "") + `
                </div>
            </div>
            <div></div>
            </div>
            <div></div>
            <div class="HIDELAST"></div>
            </div>`;
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
            let valuesToReplace = ["FOODNAME", "TIME", "HIDELAST", "FATS", "CARBS", "PROTEINS", "CALS", "SERV", "GRMS", "ATTRNAME", "DATAVALUES"];
            let valuesToReplaceWith = [item.itemName, getTime(0, item.time).displayTime, hideLast, fats, carbs, proteins, calories, item.servingQuantity, item.servingSize, item.itemName, JSON.stringify(tmpObj)];
            if (entriesContainer == "#entriesContainer") {
                valuesToReplace.push("ATTRID");
                valuesToReplaceWith.push(j);
            }
            $(entriesContainer).append(replaceArrays(singleServingEntryDiv, valuesToReplace, valuesToReplaceWith));
        }
    } else {
        //$(entriesContainer).append(`<p>${msg}.</p>`);
        $(entriesContainer).append(`<div class="entriesContainer__entry">
            <div class='formatedRow'>
                <p>Pizza</p>
                <p>20:55</p>
                <i class="fas fa-angle-up"></i>
            </div>
            <div class="entriesContainer__entry__details">
                <p>stuff</p>
            </div>
        </div>`);
    }
}