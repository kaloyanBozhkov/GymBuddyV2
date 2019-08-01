import {camelCaseInput} from '../../common/utilities';
export default (optionElementClass, optionContainer, dis, runSecondPart = false) => {
    let searchValue = camelCaseInput(dis.val());
    dis.val(searchValue);
    if (searchValue.trim().length == 0) {
        $(optionElementClass + ".hidden").removeClass("hidden");
    } else {
        $(optionElementClass).each(function () {
            let vals = $(this).data("values");
            if (vals.hasOwnProperty("title") && ~vals.title.toLowerCase().indexOf(searchValue.toLowerCase())) {
                $(this).removeClass("hidden");
            } else {
                $(this).addClass("hidden");
            }
        });
    }
    if ($(optionElementClass + ":not(.hidden)").length == 0) {
        $(optionContainer + " > p").removeClass("hidden");
        $(optionContainer).addClass("noEditNote");
    } else {
        $(optionContainer + " > p").addClass("hidden");
        $(optionContainer).removeClass("noEditNote");
    }

    //hides category headers altogether if nothing under them, and fixes margin on last category, for workouts search
    if (runSecondPart) {
        $(optionContainer + " > div").each(function () {
            if ($(this).children("div.hidden").length == $(this).children("div").length) {
                $(this).addClass("hidden");
            } else {
                $(this).removeClass("hidden");
            }
        });
        $(optionContainer + " > .last").removeClass("last");
        $(optionContainer + " > div:not(.hidden)").last().addClass("last");
    }
}