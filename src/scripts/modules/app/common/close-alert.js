export default function() {
    $("#alertBg").animate({
        "opacity": "0"
    }, 100, function () {
        setTimeout(function () {
            $("#alertBg").remove();
        }, 150);
    });
}