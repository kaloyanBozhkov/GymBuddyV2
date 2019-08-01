//for any input with title-like requirements
import { camelCaseInput } from '../../../common/utilities';
export default () => {
    $(document).on("input", ".camelCaseInput", function () {
        $(this).val(camelCaseInput($(this).val()));
    });

    $(document).on("mouseenter touchstart", ".menu-left, .menu-right", function () {
        $(this).addClass("btnHover");
    });
    
    $(document).on("mouseleave touchend", ".menu-left, .menu-right", function () {
        $(this).removeClass("btnHover");
    });
}
