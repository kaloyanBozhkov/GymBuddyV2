import global from '../../../global-variables';
import SingleServing from '../../../macros/serving';
import FavoriteItem from '../../../macros/favorite-item';
import save from '../../../common/save';
import alertMsg from '../../common/alert-msg';
import errorMsg from '../../common/errorMsg';
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
    //Add Serving
    //CHECK BELOW
    $(document).on("focusin", "#foodName", function () {
        $(this).attr("placeholder", "");
    });

    $(document).on("focusout", "#foodName", function () {
        $(this).attr("placeholder", "Type Food Name Here");
    });

    $(document).on("input", "#singleFoodCarbs input, #singleFoodProteins input, #singleFoodFats input, #singleFoodServingSize input, input.carbsOrange, input.fatsRed, input.proteinsGreen, input#kgCount", function () {
        $(this).val($(this).val().replace(",", ".").trim().match(/^\d*\.?\d*$/));
        if ($(this).val().trim() == ".")
            $(this).val("0.");
    });

    $(document).on("focusin", "#singleFoodCarbs input, #singleFoodProteins input, #singleFoodFats input, #singleFoodServingSize input, input.carbsOrange, input.fatsRed, input.proteinsGreen, input#repCount", function () {
        if ($(this).val().trim() == "0")
            $(this).val("");
    });

    $(document).on("focusin click", "input#kgCount", function () {
        if ($(this).val().trim() == "0.0")
            $(this).val("");
    });

    $(document).on("focusout", "input#kgCount", function () {
        let val = round($(this).val().trim());
        if (val % 2 == 0)
            val = val.toFixed(1);

        $(this).val(val);
    });

    $(document).on("focusout", "#singleFoodCarbs input, #singleFoodProteins input, #singleFoodFats input, #singleFoodServingSize input, input.carbsOrange, input.fatsRed, input.proteinsGreen, input#repCount", function () {
        if ($(this).val().trim().length <= 0)
            $(this).val("0");

        if ($(this).val().trim().indexOf(".") == 0)
            $(this).val("0" + $(this).val());
    });

    $(document).on("change", "#foodTracker > div > div:not(#singleFoodServingSize) input", function () {
        if ($(this).val() > 500)
            $(this).val(500);
    });

    $(document).on("change", "#foodTracker > div > #singleFoodServingSize input, #displayMessage input", function () {
        if ($(this).val() > 9999)
            $(this).val(9999);
    });

    $(document).on("change", "#foodTracker > input", function () {
        if ($(this).val().length > 100)
            $(this).val($(this).val().substr(0, 99));

    });
    //RECHECK ABOVE

    $(document).on("click", "#addServing", function () {
        var serving = $("#singleFoodServingSize input").val().trim();
        if (global.totalMacros.calculateCalories() > 0) {
            if (serving.length > 0 && serving !== "0") {
                var name = $("#foodName").val().trim().length > 0 ? $("#foodName").val().trim() : "Unnamed";
                alertMsg("setServingSize", true, ["GRAMS", "FOODNAME"], [serving, name], [{attrName: "servingSize", attrValue: serving}]);
            } else {
                errorMsg("You must fill in the serving's values before adding it", "#singleFoodServingSize p");
            }
        } else {
            $("body").scrollTop(0);
            errorMsg("Cannot add a serving since macros have been set yet!", "#caloriesCounter > p:first-of-type");
        }
    });

    $(document).on("click", "#setServingSize", function () { //alertMsg button of add serving by size
        var fats = $("#singleFoodFats input").val().trim();
        var carbs = $("#singleFoodCarbs input").val().trim();
        var proteins = $("#singleFoodProteins input").val().trim();
        var serving = $("#alertBg").data("servingSize");//grams
        var servingQuantity = $("#servingSize").val().trim();//servings
        var name = $("#foodName").val().trim().length > 0 ? $("#foodName").val().trim() : "Unnamed Entry";
        if (servingQuantity.length > 0) {
            global.currentMacros.fats += round(parseFloat(fats) * servingQuantity);
            global.currentMacros.carbs += round(parseFloat(carbs) * servingQuantity);
            global.currentMacros.proteins += round(parseFloat(proteins) * servingQuantity);
            save.currentMacros();
            global.singleDayServing.addServing(new SingleServing(fats, carbs, proteins, null, name, serving, servingQuantity));
            save.singleDayServing();
            global.historyServings[getCurrentTime().keyFromDate] = global.singleDayServing;
            save.historyServings();
            updateBarWidths();
            $("#foodName").val("");
            $("#foodTracker > div input").each(function () {
                $(this).val("0");
            });
            closeAlert();
        } else {
            errorField($("#servingSize").siblings("p:first-of-type"));
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

