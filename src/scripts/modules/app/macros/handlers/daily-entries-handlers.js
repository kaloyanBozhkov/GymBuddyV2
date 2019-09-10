//all handlers under today's entries section
import global from '../../../global-variables';
import FavoriteItem from '../../../macros/favorite-item';
import save from '../../../common/save';
import alertMsg from '../../common/alert-msg';
import errorMsg from '../../common/error';
import updateBarWidths from '../update-bar-widths';
import closeAlert from '../../common/close-alert';
import { round } from '../../../common/utilities';

export default () => {
    $(document).on("click", ".dailyEntries__entry", function () {
        $(this).toggleClass("active");
    });

    $(document).on("click", ".saveEntry", function () {
        alertMsg("addFavorites", true, ["VALUETITLE", "VALUEFATS", "VALUECARBS", "VALUEPROTEINS", "VALUEGRAMS"], [$(this).data("values").title, $(this).data("values").fats, $(this).data("values").carbs, $(this).data("values").proteins, $(this).data("values").grams]);
    });
    
    $(document).on("click", "#saveItemToFavorites", function () {
        let grams = $("#gramsCount > input").val().trim();
        let itemName = $("#itemName").val().trim();
        if (grams > 0 && itemName.length > 0) {
            let [f, c, p] = ["fats", "carbs", "proteins"].reduce((acc, i) => [...acc, $(`#${i}Count > input`).val()], []);
            global.favoriteServings.push(new FavoriteItem(f, c, p, itemName, grams));
            save.favoriteServings();
            closeAlert();
        } else {
            errorMsg($(this).data("errorMsg"));
        }
    });
    
    $(document).on("click", ".removeEntry", function () {
        var itemId = $(this).data("itemId");
        alertMsg("miniAlert", true, ["TOPIDHERE", "MESSAGEID", "MSG", "IDOFYESBTN", "IDOFNOBTN", "YESMESG", "NOMESG"], ["deleteFoodEntry", "titleForDelete", "Remove <span>" + global.singleDayServing.getServings()[itemId].itemName + "</span> from today's servings?", "removeEntryFromServings", "cancel", "Delete", "Cancel"], [{ attrName: "index", attrValue: itemId }]);
    });
    
    $(document).on("click", "#removeEntryFromServings", function () {
        let indexToRemove = $("#alertBg").data("index");
        let item = global.singleDayServing.getServings()[indexToRemove];
        let carbs = round(parseFloat(item.carbs) * parseFloat(item.servingQuantity));
        let fats = round(parseFloat(item.fats) * parseFloat(item.servingQuantity));
        let proteins = round(parseFloat(item.proteins) * parseFloat(item.servingQuantity));
        global.currentMacros.proteins -= proteins;
        global.currentMacros.carbs -= carbs;
        global.currentMacros.fats -= fats;
        global.singleDayServing.proteins -= proteins;
        global.singleDayServing.carbs -= carbs;
        global.singleDayServing.fats -= fats;
        let newServingsArray = global.singleDayServing.getServings().filter(x => x != item);
        global.singleDayServing.setServings(newServingsArray, true);
        global.historyServings[global.singleDayServing.keyFromDate].setServings(newServingsArray, true);
        save.currentMacros();
        save.singleDayServing();
        save.historyServings();
        updateBarWidths();
        closeAlert();
    });
}