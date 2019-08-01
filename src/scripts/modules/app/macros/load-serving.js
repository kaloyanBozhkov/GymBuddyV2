import global from '../../global-variables';
import alertMsg from '../common/alert-msg';
export default function() {
    let options = (global.favoriteItems.length == 0 ? "" : (function () {
        var o = "";
        for (let j in global.favoriteItems) {
            let tmpObj = {
                title: global.favoriteItems[j].title,
                carbs: global.favoriteItems[j].carbs,
                fats: global.favoriteItems[j].fats,
                proteins: global.favoriteItems[j].proteins,
                grams: global.favoriteItems[j].grams,
                key: j
            };
            o += `<div class='favoriteEntry' data-values='${JSON.stringify(tmpObj)}'>
                 <div><p>${global.favoriteItems[j].title.trim()}</p></div>
                 <p class='deleteFavorite' data-index='${j}'><span class="fa fa-trash-alt"></span></p>
                </div>`;
        }
        return o;
    }));
    let hidden1 = "hidden";
    let hidden2 = "hidden";
    if (global.favoriteItems.length)
        hidden1 = "";
    else 
        hidden2 = "";

    alertMsg("importFromFavorites", true, ["HIDDEN1", "HIDDEN2", "OPTIONS"], [hidden1, hidden2, options]);
}

