import alertMsg from '../common/alert-msg';
import global from '../../global-variables';
export default () => {
    let favoriteItemElements = global.favoriteServings.length == 0 ? "" : global.favoriteServings.reduce((htmlElements, favItem, key) => [...htmlElements,
    `<div class='favoriteEntry formatedRow' data-values='${JSON.stringify({...favItem, key})}' data-id='${key + 1}'>
    <div><p>${favItem.title}</p></div>
    <div class='deleteFavorite' data-index='${key}'><span class="fa fa-trash-alt"></span></div>
    </div>`], []).join("");
    let class1 = global.favoriteServings.length == 0 ? "noFavorites" : "";
    alertMsg("importFavoriteServing", true, ["CLASS1", "OPTIONS"], [class1, favoriteItemElements]);
}