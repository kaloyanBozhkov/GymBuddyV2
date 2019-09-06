import alertMsg from '../common/alert-msg';
import global from '../../global-variables';
export default () => {
    let favoriteItemElements = global.favoriteServings.length == 0 ? "" : global.favoriteServings.reduce((htmlElements, favItem, key) => [...htmlElements,
    `<div class='favoriteEntry' data-values='${JSON.stringify({...favItem, key})}'>
    <div><p>${favItem.title}</p></div>
    <p class='deleteFavorite' data-index='${key}'><span class="fa fa-trash-alt"></span></p>
    </div>`], []).join("");
    
    let hidden1 = "hidden";
    let hidden2 = "hidden";
    if (global.favoriteServings.length)
        hidden1 = ""; // no favorite items saved yet error msg on alert
    else 
        hidden2 = ""; // on alert there will be favorite items to filter by, and optionally error msg saying no search results for query

    alertMsg("importFavoriteServing", true, ["HIDDEN1", "HIDDEN2", "OPTIONS"], [hidden1, hidden2, favoriteItemElements]);
}