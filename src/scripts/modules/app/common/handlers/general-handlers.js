//for any input with title-like requirements
import { camelCaseInput, round } from '../../../common/utilities';
export default () => {
    $(document).on("input", ".camelCaseInput", function () {
        $(this).val(camelCaseInput($(this).val()));
    });

    $(document).on("input", ".validateNumeric", function () {
        $(this).val($(this).val().replace(",", ".").trim().match(/^\d*\.?\d*$/));
        let isGramsField = $(this).hasClass("validateNumeric--grams");
        let isPercentField = $(this).hasClass("validateNumeric--percentages");
        let thisValue = $(this).val().trim();
        if (thisValue == ".")
            $(this).val("0.");

        if(isGramsField && thisValue > 9999)
            $(this).val(9999);
        else if(!isGramsField && !isPercentField && thisValue > 500)
            $(this).val(500);
        else if(isPercentField && thisValue > 100)
            $(this).val(100);
    });

    $(document).on("focusout mouseleave", ".validateNumeric", function(){
        let isPercentField = $(this).hasClass("validateNumeric--percentages");
        let thisValue = round($(this).val().replace("%","").trim()) || 0;
        $(this).val(thisValue);
        if (thisValue == "")
            $(this).val(`0${isPercentField ? "%" : ""}`);
        else if (isPercentField && thisValue >= 0 )
            $(this).val(`${thisValue}%`);
    });

    $(document).on("focusin mouseenter click", ".validateNumeric", function(){
        let isPercentField = $(this).hasClass("validateNumeric--percentages");
        let thisValue = $(this).val().trim();
        if (isPercentField)
            $(this).val(thisValue.replace(/\%/g, ""));
        
        thisValue = $(this).val().trim();
        if(thisValue == 0)
            $(this).val("");
    });

}
