import global from '../../../global-variables';
import SingleServing from '../../../macros/serving';
import FavoriteItem from '../../../macros/favorite-item';
import save from '../../../common/save';
import alertMsg from '../../common/alert-msg';
import errorMsg from '../../common/error';
import updateBarWidths from '../update-bar-widths';
import loadDailyServings from '../load-daily-servings';
import searchThroughList from '../../common/search-through-list';
import closeAlert from '../../common/close-alert';
import holdToEdit from '../../common/hold-to-edit';
import loadFavoriteServing from '../load-favorite-serving';
import getCurrentTime from '../../../common/get-current-time';

const previousAlertToShow = {
    deleteFavorite: loadFavoriteServing
}

const fields = ["singleFoodFats", "singleFoodCarbs", "singleFoodProteins", "singleFoodQuantity", "singleFoodServingSize"];

export default () => {
    $(document).on("focusin", "#foodName", function () {
        $(this).attr("placeholder", "");
    });

    $(document).on("focusout", "#foodName", function () {
        $(this).attr("placeholder", "Type Food Name Here");
    });

    $(document).on("input focusout", fields.reduce((selectorsArr, el) => [...selectorsArr, `#${el} input`], []).join(), ()=>{
        (function updateTotalMacrosWidgetWhenInputsChanged(){
            let fcpq = fields.slice(0, fields.length-1).reduce((acc, field) => [...acc, $(`#${field} input`).val()],[]);
            let [calsFats, calsCarbs, calsProteins, totalCals] = SingleServing.returnCaloricStats(...fcpq);
            $(".foodTracker__totalMacros .fats span").html(calsFats);
            $(".foodTracker__totalMacros .carbs span").html(calsCarbs);
            $(".foodTracker__totalMacros .proteins span").html(calsProteins);
            $("#servingCalories").html(totalCals);
            if(totalCals > 0){
                $("#foodTracker").addClass("active");
            }else if($("#foodTracker").hasClass("active")){
                $("#foodTracker").removeClass("active");
            }
        })();
    });

    $(document).on("click", "#addServing", () => {
        let fats, carbs, proteins, quantity, servingSize, name;
        (function getAllInputFieldsValuesForAddServing(){
            [fats, carbs, proteins, quantity, servingSize] = fields.reduce((acc, field) => [...acc, $(`#${field} input`).val()],[]);
            name = $("#foodName").val().trim();
            name = name.length > 0 ? name : "Unnamed Entry";
        })();
        if (quantity > 0) {
            (function addCaloriesToCurrentMacros(){
                    let [f,c,p] = SingleServing.returnCaloricStats(fats,carbs,proteins,quantity, true);
                    global.currentMacros.fats +=f;
                    global.currentMacros.carbs +=c;
                    global.currentMacros.proteins +=p;
                    save.currentMacros();
            })();
            (function createSingleDayServingFromNewlyAddedServingAndSaveItAlsoAddItToHistoryServingsAndSave(){
                    global.singleDayServing.addServing(new SingleServing(fats, carbs, proteins, null, name, servingSize, quantity));
                    save.singleDayServing();
                    global.historyServings[getCurrentTime().keyFromDate] = global.singleDayServing;
                    save.historyServings();
            })();
            (function updateTodaysCaloriesBarsAndTodaysEntriesItems(){
                    updateBarWidths("#caloriesCounter", global.currentMacros, global.totalMacros);
                    loadDailyServings(".dailyEntries");
            })();
            (function resetAddServingInputFieldsAfterUse(){
                $("#foodName").val("");
                fields.map(field => $(`#${field} input`).val(0));
            })();
        } else {
            (function showErrorFieldForAddServing(self){
                errorMsg($(self).data("errorMsg"));
            })(this);
        }
    });

    //FAVORITES HANDLERS
   
    $(document).on("click", "#loadServing", () => {
        loadFavoriteServing();
    });
    
    $(document).on("input", "#favoriteName", function () {
        searchThroughList(".favoriteEntry", "#favoriteSelect", $(this));
    });
    
    $(document).on("click", ".deleteFavorite", function () {
        debugger;
        let indexToRemove = $(this).data("index");
        alertMsg("confirmOperation", true, 
        ["TITLE", "MSG", "CONFIRMBUTTONID","CANCELBUTTONID"], 
        ["Confirm Operation", 
        `Delete <span>${global.favoriteServings[indexToRemove].title}</span> from favorites?`,
        "deleteFromFavoritesConfirm", 
        "cancelRemoveFromFavorites"], [{ attrName: "index", attrValue: indexToRemove }]);
    });
    
    $(document).on("click", "#deleteFromFavoritesConfirm", () => {
        let indexToRemove = $("#alertBg").data("index");
        global.favoriteServings.splice(indexToRemove, 1);
        save.favoriteServings();
        previousAlertToShow.deleteFavorite();
    });
    
    $(document).on("click", "#cancelRemoveFromFavorites", () => {
        previousAlertToShow.deleteFavorite();
    });
    //set the on hold events for the edit functionality
    holdToEdit(".favoriteEntry", editFavoriteFood);



    $(document).on("click", "#saveFavoriteFoodChanges", () => {
        var title = $("#itemName").val().trim();
        var grams = $("#gramsCount").val().trim();
        var fats = $("#fatsCount").val().trim();
        var proteins = $("#proteinsCount").val().trim();
        var carbs = $("#carbsCount").val().trim();
        var favoriteFoodObj = $("#alertBg").data("favoriteFoodObj");
        if (title.length > 0 && grams.length > 0 && fats.length > 0 && proteins.length > 0 && carbs.length > 0) {
            global.favoriteServings[favoriteFoodObj.key] = new FavoriteItem(fats, carbs, proteins, title, grams);
            save.favoriteServings();
            previousAlertToShow.deleteFavorite();
        } else {
            errorMsg("You must fill in all the fields before proceeding.");
        }
    });
    
    $(document).on("click", "#cancelFavoriteFoodChanges", () => {
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


    //hold functions
    function editFavoriteFood(elem) {
        var favoriteFoodObj = $(elem).data("values");
        var favoriteDiv = "<div>" + global.msgBox["addFavorites"].replace("VALUETITLE", favoriteFoodObj.title).replace("VALUEGRAMS", favoriteFoodObj.grams).replace("VALUEFATS", favoriteFoodObj.fats).replace("VALUECARBS", favoriteFoodObj.carbs).replace("VALUEPROTEINS", favoriteFoodObj.proteins) + "<div>";
        favoriteDiv = $.parseHTML(favoriteDiv);
        favoriteDiv = $(favoriteDiv).find("div.width-full.inputStyling.tableStyling").html();
        alertMsg("multiPurposeAlert", true, ["TITLEAREA", "TITLEHERE", "PLACEHOLDERTITLE", "VALUETITLE", "SECONDHERE", "PLACEHOLDERNOTES", "VALUENOTES", "ERRORMSG", "SAVECHANGESBUTTON", "YESBTN", "CANCELCHANGESBUTTON", "NOBTN", "CLASS1", "CLASS2", "<!--ADDITIONAL HTML-->", "TABLEMULTIPURPOSE"], ["Edit Favorite Food", "", "", "", "", "", "", "You must fill in all the fields before proceeding.", "saveFavoriteFoodChanges", "Save", "cancelFavoriteFoodChanges", "Cancel", "", "", favoriteDiv, "hidden"], [{ attrName: "favoriteFoodObj", attrValue: favoriteFoodObj }]);
    }
}

