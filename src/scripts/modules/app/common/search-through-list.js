import {camelCaseInput} from '../../common/utilities';
export default function (optionElementClass, optionContainer){
    let searchValue;
    (function setSearchToCamelCase(searchBar){
        searchValue = camelCaseInput(searchBar.val());//using JS intead of CSS cause JS is cooler <3
        searchBar.val(searchValue);
    })($(this));
    (function showHideElementsSerchedThrough(){
        if (searchValue.trim().length == 0) {
            $(optionElementClass + ".hidden").removeClass("hidden");
        } else {
            $(optionElementClass).each(function () {
                let vals = $(this).data("values");
                let key = $(this).data("id");
                if (key == searchValue || vals.hasOwnProperty("title") && ~vals.title.toLowerCase().indexOf(searchValue.toLowerCase()))
                    $(this).removeClass("hidden");
                else
                    $(this).addClass("hidden");
            });
        }
    })();
    (function showHideNothingToDisplayNoEntriesFoundMessages(){
        if ($(optionElementClass).length == 0){
            $(optionContainer).removeClass("noSearchResult");
            $(optionContainer).addClass("noFavorites");
        }else if($(optionElementClass + ":not(.hidden)").length == 0){
            $(optionContainer).removeClass("noFavorites");
            $(optionContainer).addClass("noSearchResult");
        }else{
            $(optionContainer).removeClass("noFavorites");
            $(optionContainer).removeClass("noSearchResult");
        }
    })();
}