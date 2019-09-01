import global from '../../global-variables';
import closeAlert from './close-alert';

export default (fileToAppend, smoothSwitch = true, replaceWhat = [], replaceWith = [], attributes = []) => { //attributes is array of objects with attrName = value
    if (!smoothSwitch && $("#alertBg").length > 0)
        closeAlert();

    if ($("#alertBg").length == 0) //show both normally
        smoothSwitch = false;

    let content = `<div id='displayMessage'>${global.msgBox[fileToAppend]}</div>`;

    if (replaceWhat.length > 0 && replaceWith.length > 0 && replaceWhat.length == replaceWith.length)
        content = replaceWhat.reduce((str, item, index) => str.replace(item, replaceWith[index]), content);

    if (!smoothSwitch) {
        $("body").prepend(`<div id='alertBg'>${content}</div>`);
        $("#alertBg").animate({
            "opacity": "1"
        }, 100);
    } else {
        $("#displayMessage").animate({
            "opacity": "0"
        }, 100, function () {
            $("#alertBg").empty().prepend(content);
        });
    }
    attributes.map(item => $("#alertBg").data(item["attrName"], item["attrValue"]));
}

//handlers on general-handlers.js
