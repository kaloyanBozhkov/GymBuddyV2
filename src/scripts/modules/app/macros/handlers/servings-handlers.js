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
const updateTotalMacrosAndTotalCaloriesWidgetsWhenInputsChanged = () => {
    let fcpq = fields.slice(0, fields.length-1).reduce((acc, field) => [...acc, $(`#${field} input`).val()],[]);
    let [calsFats, calsCarbs, calsProteins, totalCals] = SingleServing.returnCaloricStats(...fcpq);
    $(".foodTracker__totalMacros .fats span").html(calsFats);
    $(".foodTracker__totalMacros .carbs span").html(calsCarbs);
    $(".foodTracker__totalMacros .proteins span").html(calsProteins);
    (function setAndToggleTotalCaloriesWidget(){
        $("#servingCalories").html(totalCals);
        if(totalCals > 0){
            $("#foodTracker").addClass("active");
        }else if($("#foodTracker").hasClass("active")){
            $("#foodTracker").removeClass("active");
        }
    })();
}
export default () => {
    $(document).on("focusin", "#foodName", function () {
        $(this).attr("placeholder", "");
    });

    $(document).on("focusout", "#foodName", function () {
        $(this).attr("placeholder", "Type Food Name Here");
    });

    $(document).on("input focusout", fields.reduce((selectorsArr, el) => [...selectorsArr, `#${el} input`], []).join(),  updateTotalMacrosAndTotalCaloriesWidgetsWhenInputsChanged);

    $(document).on("click", "#addServing", function() {
        let fats, carbs, proteins, quantity, servingSize, name;
        (function getAllInputFieldsValuesForAddServing(){
            [fats, carbs, proteins, quantity, servingSize] = fields.reduce((acc, field) => [...acc, $(`#${field} input`).val()],[]);
            name = $("#foodName").val().trim();
            name = name.length > 0 ? name : "Unnamed Entry";
        })();
        if (quantity > 0) {
            global.currentMacros.addMacros(...SingleServing.returnTotalMacros(fats,carbs,proteins,quantity))
            global.singleDayServing.addServing(new SingleServing(fats, carbs, proteins, getCurrentTime().literal, name, servingSize, quantity));
            global.historyServings[getCurrentTime().keyFromDate] = global.singleDayServing.toJSON();
            save.currentMacros();
            save.singleDayServing();
            save.historyServings();
            (function updateTodaysCaloriesBarsAndTodaysEntriesItems(){
                    updateBarWidths("#caloriesCounter", global.currentMacros, global.totalMacros);
                    loadDailyServings(".dailyEntries");
            })();
            (function resetAddServingInputFieldsAfterUse(){
                $("#foodName").val("");
                fields.map(field => $(`#${field} input`).val(0));
            })();
            updateTotalMacrosAndTotalCaloriesWidgetsWhenInputsChanged();
        } else {
            (function showErrorFieldForAddServing(self){
                errorMsg($(self).data("errorMsg"));
            })(this);
        }
    });

    //FAVORITES HANDLERS
   
    $(document).on("click", "#loadServing", loadFavoriteServing);
    
    $(document).on("input", "#favoriteName", function(){
        searchThroughList.call(this, ".favoriteEntry","#favoriteSelect > div");
    });
    
    $(document).on("click", ".favoriteEntry > div:not(.deleteFavorite)", function () {
        let {title, grams, fats, carbs, proteins} = $(this).parent().data("values");
        $("#foodName").val(title);
        $("#singleFoodServingSize > input").val(grams);
        $("#singleFoodFats > input").val(fats);
        $("#singleFoodCarbs > input").val(carbs);
        $("#singleFoodProteins > input").val(proteins);
        $("#singleFoodQuantity > input").val(1);//set default serving size to 1, for imported food
        closeAlert();
        updateTotalMacrosAndTotalCaloriesWidgetsWhenInputsChanged();
    });

    $(document).on("click", ".deleteFavorite", function () {
        let indexToRemove = $(this).data("index");
        alertMsg("confirmOperation", true, 
        ["TITLE", "MSG", "CONFIRMBUTTONID","CANCELBUTTONID"], 
        ["Confirm Operation", 
        `Do you really wish to proceed with deleting '<span>${global.favoriteServings[indexToRemove].title}</span>' from favorites?`,
        "deleteFromFavoritesConfirm", 
        "cancelRemoveFromFavorites"], [{ attrName: "index", attrValue: indexToRemove }]);
    });
    
    $(document).on("click", "#deleteFromFavoritesConfirm", () => {
        let indexToRemove = $("#alertBg").data("index");
        global.favoriteServings.splice(indexToRemove, 1);
        save.favoriteServings();
        previousAlertToShow.deleteFavorite();
    });

    $(document).on("click", "#cancelRemoveFromFavorites", previousAlertToShow.deleteFavorite);
    
    //set the on hold events for the edit functionality
    holdToEdit(".favoriteEntry", editFavoriteFood);

    $(document).on("click", "#saveFavoriteFoodChanges", function() {
        let favoriteServing = {
            title:$("#favoriteFoodName").val() || "Unnamed Entry",
            grams:$("#favoriteFoodGrams > input").val(),
            fats:$("#favorieFoodFats > input").val(),
            proteins:$("#favoriteFoodProtein > input").val(),
            carbs:$("#favoriteFoodCarbs > input").val(),
            key: $(this).data("key")
        };
        //flexing the spread operator, IIFE and destructuring incoming func arguments... instead of just favoriteServing.fats.... and so on :D
        global.favoriteServings[favoriteServing.key] = new FavoriteItem(...(({fats, carbs, proteins, title, grams})=>[fats,carbs,proteins,title,grams])(favoriteServing));
        save.favoriteServings();
        previousAlertToShow.deleteFavorite();
    });
    
    $(document).on("click", "#cancelFavoriteFoodChanges", previousAlertToShow.deleteFavorite);

    //hold functions
    function editFavoriteFood(elem) {//func declaration hoisted to top
        const {title, carbs, fats, proteins, grams, key} = $(elem).data("values");
        alertMsg("editFavoriteServing", true, 
        ['FAVORITEFOODNAME', 'GRAMS', 'GRAMSFATS', 'GRAMSCARBS', 'GRAMSPROTEIN', 'KEY'], 
        [title, grams, fats, carbs, proteins, key]);
    }
}

