//for any input with title-like requirements
import { camelCaseInput, round } from '../../../common/utilities';

const replaceInvalidNumericCharacters = str => str.replace(",", ".").replace(/[^0-9.]/g, "");

export default () => {
    $(document).on("input", ".camelCaseInput", function () {
        $(this).val(camelCaseInput($(this).val()));
    });

    $(document).on('input focusout', '.validateNumeric--integer', function(){
        $(this).val(parseInt(+$(this).val()));
    });

    $(document).on('input focusout', '.validateNumeric--grams', function(){
        if($(this).val() > 500)
            $(this).val(500);
    });

    $(document).on('input', '.validateNumeric--percentage', function(){
        let val = replaceInvalidNumericCharacters($(this).val());
        $(this).val(val > 100 ? 100 : val);
    });

    $(document).on('focusout', '.validateNumeric--percentage', function(){
        $(this).val(`${parseInt(+$(this).val().replace("%",""))}%`);
    });

    $(document).on('focusin click', '.validateNumeric--percentage', function(){
        $(this).val(+$(this).val().replace(/\%/g, ""));
    });

    $(document).on("input", ".validateNumeric", function () {
        let val = replaceInvalidNumericCharacters($(this).val());
        $(this).val(val == "." ? "0." : val.match(/.{0,}\..{0,}\.$/g) ? val.substr(0, val.length - 1) : val > 9999 ? 9999 : val);
    });

    $(document).on("focusout", ".validateNumeric", function(){
        $(this).val(+(round($(this).val()) || 0));
    });

    $(document).on("focusin click", ".validateNumeric", function(){
        let val = $(this).val();
        $(this).val(val === "0" || val === "" ? "" : val);
    });

}
