import global from '../../../global-variables';
import SingleServing from '../../../macros/serving';
import FavoriteItem from '../../../macros/favorite-item';
import save from '../../../common/save';
import alertMsg from '../../common/alert-msg';
import updateBarWidths from '../update-bar-widths';
import searchThroughList from '../../common/search-through-list';
import closeAlert from '../../common/close-alert';
import holdToEdit from '../../common/hold-to-edit';
import { round } from '../../../common/utilities';
import loadServing from '../load-serving';
import getCurrentTime from '../../../common/get-current-time';

const previousAlertToShow = {
    deleteFavorite: loadServing
}

export default () => {
    $(document).on("focusin", "#foodName", function () {
        $(this).attr("placeholder", "");
    });

    $(document).on("focusout", "#foodName", function () {
        $(this).attr("placeholder", "Type Food Name Here");
    });

    $(document).on("click", "#addServing", function () {
        let fields = ["singleFoodFats", "singleFoodCarbs", "singleFoodProteins", "singleFoodServingSize", "singleFoodQuantity"];
        let [fats, carbs, proteins, servingSize, quantity] = fields.reduce((acc, field) => [...acc, $(`#${field} input`).val().trim()],[]);
        let name = $("#foodName").val().trim();
        name = name.length > 0 ? name : "Unnamed Entry";
        if (quantity > 0) {
            global.currentMacros.fats += round(parseFloat(fats) * quantity);
            global.currentMacros.carbs += round(parseFloat(carbs) * quantity);
            global.currentMacros.proteins += round(parseFloat(proteins) * quantity);
            save.currentMacros();
            global.singleDayServing.addServing(new SingleServing(fats, carbs, proteins, null, name, servingSize, quantity));
            save.singleDayServing();
            global.historyServings[getCurrentTime().keyFromDate] = global.singleDayServing;
            save.historyServings();
            updateBarWidths("#caloriesCounter", global.currentMacros, global.totalMacros);
            $("#foodName").val("");
            fields.map(field => $(`#${field} input`).val(0));
        } else {
            $("#foodTracker__container .errorMsg").addClass("active");
        }
    });

    //FAVORITES HANDLERS
    //set the on hold events for the edit functionality
    holdToEdit(".favoriteEntry", editFavoriteFood);
   
    $(document).on("click", "#saveFavoriteFoodChanges", function () {
        var title = $("#itemName").val().trim();
        var grams = $("#gramsCount").val().trim();
        var fats = $("#fatsCount").val().trim();
        var proteins = $("#proteinsCount").val().trim();
        var carbs = $("#carbsCount").val().trim();
        var favoriteFoodObj = $("#alertBg").data("favoriteFoodObj");
        if (title.length > 0 && grams.length > 0 && fats.length > 0 && proteins.length > 0 && carbs.length > 0) {
            global.favoriteItems[favoriteFoodObj.key] = new FavoriteItem(fats, carbs, proteins, title, grams);
            save.favoriteItems();
            previousAlertToShow.deleteFavorite();
        } else {
            errorMsg("You must fill in all the fields before proceeding.");
        }
    });
    
    $(document).on("click", "#cancelFavoriteFoodChanges", function () {
        previousAlertToShow.deleteFavorite();
    });
    
    $(document).on("click", ".deleteFavorite", function () {
        var indexToRemove = $(this).data("index");
        alertMsg("miniAlert", true, ["TOPIDHERE", "MESSAGEID", "MSG", "IDOFYESBTN", "IDOFNOBTN", "YESMESG", "NOMESG"], ["deleteFromWorkoutsConfirm", "titleForDelete", "Delete <span>" + global.favoriteItems[indexToRemove].title + "</span> from favorites?", "removeFromFavorites", "cancelRemoveFromFavorites", "Delete", "Cancel"], [{ attrName: "index", attrValue: indexToRemove }]);
    });
    
    $(document).on("click", "#cancelRemoveFromFavorites", function () {
        previousAlertToShow.deleteFavorite();
    });
    
    $(document).on("click", "#removeFromFavorites", function () {
        var indexToRemove = $("#alertBg").data("index");
        global.favoriteItems.splice(indexToRemove, 1);
        save.favoriteItems();
        previousAlertToShow.deleteFavorite();
    });
    
    $(document).on("click", ".favoriteEntry > div", function () {
        var parent = $(this).parent();
        $("#singleFoodServingSize > input").val(parent.data("values").grams);
        $("#singleFoodFats > input").val(parent.data("values").fats);
        $("#singleFoodCarbs > input").val(parent.data("values").carbs);
        $("#singleFoodProteins > input").val(parent.data("values").proteins);
        $("#foodName").val(parent.data("values").title);
        closeAlert();
    });
    
    $(document).on("click", "#loadServing", function () {
        loadServing();
    });
    
    $(document).on("input", "#favoriteName", function () {
        searchThroughList(".favoriteEntry", "#favoriteSelect", $(this));
    });

    //hold functions
    function editFavoriteFood(elem) {
        var favoriteFoodObj = $(elem).data("values");
        var favoriteDiv = "<div>" + global.msgBox["addFavorites"].replace("VALUETITLE", favoriteFoodObj.title).replace("VALUEGRAMS", favoriteFoodObj.grams).replace("VALUEFATS", favoriteFoodObj.fats).replace("VALUECARBS", favoriteFoodObj.carbs).replace("VALUEPROTEINS", favoriteFoodObj.proteins) + "<div>";
        favoriteDiv = $.parseHTML(favoriteDiv);
        favoriteDiv = $(favoriteDiv).find("div.width-full.inputStyling.tableStyling").html();
        alertMsg("multiPurposeAlert", true, ["TITLEAREA", "TITLEHERE", "PLACEHOLDERTITLE", "VALUETITLE", "SECONDHERE", "PLACEHOLDERNOTES", "VALUENOTES", "ERRORMSG", "SAVECHANGESBUTTON", "YESBTN", "CANCELCHANGESBUTTON", "NOBTN", "CLASS1", "CLASS2", "<!--ADDITIONAL HTML-->", "TABLEMULTIPURPOSE"], ["Edit Favorite Food", "", "", "", "", "", "", "You must fill in all the fields before proceeding.", "saveFavoriteFoodChanges", "Save", "cancelFavoriteFoodChanges", "Cancel", "", "", favoriteDiv, "hidden"], [{ attrName: "favoriteFoodObj", attrValue: favoriteFoodObj }]);
    }
}

