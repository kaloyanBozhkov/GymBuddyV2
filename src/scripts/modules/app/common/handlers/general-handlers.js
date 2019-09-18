//for any input with title-like requirements
import { camelCaseInput, round } from '../../../common/utilities';
export default () => {
    $(document).on("input", ".camelCaseInput", function () {
        $(this).val(camelCaseInput($(this).val()));
    });

    $(document).on('input focusout', '.validateNumeric--integer', function(){
        $(this).val(parseInt($(this).val()));
    });

    $(document).on('input focusout', '.validateNumeric--grams', function(){
        if($(this).val() > 500)
            $(this).val(500);
    });

    $(document).on('input', '.validateNumeric--percentage', function(){
        if($(this).val() > 100)
            $(this).val(100);
    });

    $(document).on('focusout', '.validateNumeric--percentage', function(){
        $(this).val(`${+parseInt($(this).val().replace("%",""))}%`);
    });

    $(document).on('focusin mouseenter click', '.validateNumeric--percentage', function(){
        $(this).val(+$(this).val().replace(/\%/g, ""));
    });

    $(document).on("input", ".validateNumeric", function () {
        let val = $(this).val().replace(",", ".").trim().match(/^\d*\.?\d*$/);
        $(this).val(val == "." ? "0." : val > 9999 ? 9999 : val);
    });

    $(document).on("focusout", ".validateNumeric", function(){
        $(this).val(+(round($(this).val()) || 0));
    });

    $(document).on("focusin click", ".validateNumeric", function(){
        let val = $(this).val();
        $(this).val(val === "0" || val === "" ? "" : +val);
    });

}
