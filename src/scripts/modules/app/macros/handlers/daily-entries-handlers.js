//all handlers under today's entries section
import global from '../../../global-variables';
import FavoriteItem from '../../../macros/favorite-item';
import save from '../../../common/save';
import alertMsg from '../../common/alert-msg';
import errorMsg from '../../common/error';
import updateBarWidths from '../update-bar-widths';
import closeAlert from '../../common/close-alert';
import BaseMacros from '../../../macros/base-macros';

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
        let itemId = $(this).data("itemId");
        alertMsg("confirmOperation", true, 
        ["TITLE", "MSG", "CONFIRMBUTTONID","CANCELBUTTONID"], 
        ["Confirm Removal", 
        `Do you wish to procede with removing '<span>${global.singleDayServing.servings[itemId].itemName}</span>' from today's servings?`,
        "removeEntryFromServings", 
        "cancel"], [{ attrName: "index", attrValue: itemId }]);
    });
    
    $(document).on("click", "#removeEntryFromServings", function () {
        let indexToRemove = $("#alertBg").data("index");
        let itemToRemove = global.singleDayServing.servings[indexToRemove];
        let [fats, carbs, proteins] = BaseMacros.returnTotalMacros(itemToRemove.fats, itemToRemove.carbs, itemToRemove.proteins, itemToRemove.servingQuantity);
        global.currentMacros.proteins -= proteins;
        global.currentMacros.carbs -= carbs;
        global.currentMacros.fats -= fats;
        global.singleDayServing.proteins -= proteins;
        global.singleDayServing.carbs -= carbs;
        global.singleDayServing.fats -= fats;
        global.singleDayServing.servings = global.singleDayServing.servings.filter(x => x != itemToRemove);
        global.historyServings[global.singleDayServing.keyFromDate].servings = global.singleDayServing.servings;
        save.currentMacros();
        save.singleDayServing();
        save.historyServings();
        updateBarWidths();
        closeAlert();
    });
}