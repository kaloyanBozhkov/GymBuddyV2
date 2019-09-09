import {camelCaseInput} from '../../common/utilities';
export default (optionElementClass, optionContainer, self, runSecondPart = false) => {
    let searchValue;
    (function setSearchToCamelCase(){
        searchValue = camelCaseInput(self.val());//using JS intead of CSS cause JS is cooler <3
        self.val(searchValue);
    })();
    (function showHideElementsSerchedThrough(){
        if (searchValue.trim().length == 0) {
            $(optionElementClass + ".hidden").removeClass("hidden");
        } else {
            $(optionElementClass).each(function () {
                let vals = $(this).data("values");
                if (vals.hasOwnProperty("title") && ~vals.title.toLowerCase().indexOf(searchValue.toLowerCase()))
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