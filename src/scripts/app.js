'use strict'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import global from './modules/global-variables';
import commonHandlersInitializer from './modules/app/common/handlers-initializer';
import macrosHandlersInitializer from './modules/app/macros/handlers-initializer';
import workoutsHandlersInitializer from './modules/app/workouts/handlers-initializer';

$(document).ready(function () {
    global.load.loadEverything();
    //REMOVE WHEN FINISHED. USED TO HIDE CONTENT BEFORE JS IS READY TO TAKE OVER
    $("body").attr("style", "");
});

commonHandlersInitializer();
macrosHandlersInitializer();
workoutsHandlersInitializer();