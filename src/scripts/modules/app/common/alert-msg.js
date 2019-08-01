import global from '../../global-variables';
import closeAlert from './close-alert';

export default (fileToAppend, smoothSwitch = true, replaceWhat = [], replaceWith = [], attributes = []) => { //attributes is array of objects with attrName = value
    if (!smoothSwitch && $("#alertBg").length > 0)
        closeAlert();

    if ($("#alertBg").length == 0) //show both normally
        smoothSwitch = false;

    var content = `<div id='displayMessage' class='silver-bg jet-fg coolBorder'>${global.msgBox[fileToAppend]}</div>`;

    if (replaceWhat.length > 0 && replaceWith.length > 0 && replaceWhat.length == replaceWith.length)
        for (let i = 0; i < replaceWhat.length; i++)
            content = content.replace(replaceWhat[i], replaceWith[i]);

    if (!smoothSwitch) {
        $("body").prepend(`<div id='alertBg' class='transition-all-0-5 both-full noselect'><div class='parent both-full'><div class='child width-full'>${content}</div></div></div>`);
        $("#alertBg").animate({
            "opacity": "1"
        }, 100);
    } else {
        $("#displayMessage").animate({
            "opacity": "0"
        }, 100, function () {
            $("#displayMessage").remove();

            $("#alertBg > div > div").prepend(content.replace("class", "style='opacity:0;' class"));
            $("#displayMessage").animate({
                "opacity": "1"
            }, 100);
        });
    }
    attributes.forEach(item => {
        $("#alertBg").data(item["attrName"], item["attrValue"]);
    });
}

//handlers on general-handlers.js
