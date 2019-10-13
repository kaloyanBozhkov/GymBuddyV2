import {camelCaseInput} from '../../common/utilities';

const checkAndToggleVisibility = function(searchValue){
    let {values, id} = $(this).data();
    if (id == searchValue || values.hasOwnProperty('title') && ~values.title.toLowerCase().indexOf(searchValue.toLowerCase()))
        $(this).removeClass('hidden');
    else
        $(this).addClass('hidden');
}

export default function (optionElementClass, optionContainer, withCategorySearch = false){
    let searchValue;
    (function setSearchToCamelCase(searchBar){
        searchValue = camelCaseInput(searchBar.val());//using JS intead of CSS cause JS is cooler <3
        searchBar.val(searchValue);
    })($(this));
    (function showHideElementsSerchedThrough(){
        if (searchValue.trim().length == 0) {
            let entryOrCategoryDiv = $(optionElementClass);
            entryOrCategoryDiv.removeClass('hidden');
            if(withCategorySearch){
                entryOrCategoryDiv.removeClass('active');
                entryOrCategoryDiv.children('.wrapper').children().removeClass('hidden');
            }
        } else {
            let exerciseCategories = $(optionElementClass);
            exerciseCategories.each(function(){
                if(withCategorySearch){
                    let {categoryTitle, exerciseSearch} = $(this).data();
                    $(this).addClass('hidden').removeClass('active');
                    $(this).children('.wrapper').children().addClass('hidden');
                    if(~categoryTitle.toLowerCase().indexOf(searchValue.toLowerCase())){
                        $(this).removeClass('hidden').addClass('active');
                        $(this).children('.wrapper').children().removeClass('hidden');
                    }else if(~exerciseSearch.toLowerCase().indexOf(searchValue.toLowerCase())){
                        $(this).removeClass('hidden').addClass('active');
                        $(this).children('.wrapper').children().each(function(){
                            checkAndToggleVisibility.call(this, searchValue);
                        });
                    }
                }else{
                    checkAndToggleVisibility.call(this, searchValue);
                }
            });
        }
    })();
    (function showHideNothingToDisplayNoEntriesFoundMessages(){
        if ($(optionElementClass).length == 0){
            $(optionContainer).removeClass('noSearchResult');
            $(optionContainer).addClass('nothingSaved');
        }else if($(optionElementClass + ':not(.hidden)').length == 0){
            $(optionContainer).removeClass('nothingSaved');
            $(optionContainer).addClass('noSearchResult');
        }else{
            $(optionContainer).removeClass('nothingSaved');
            $(optionContainer).removeClass('noSearchResult');
        }
    })();
}
