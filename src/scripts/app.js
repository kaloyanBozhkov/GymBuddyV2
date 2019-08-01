'use strict'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import global from './modules/global-variables';

$(document).ready(function () {
    global.load.bulkLoader();
    console.log("Finished loading!");
});

// import './modules/app/common/handlers';
// import './modules/app/macros/handlers';

import commonHandlersInitializer from './modules/app/common/handlers-initializer';
import macrosHandlersInitializer from './modules/app/macros/handlers-initializer';
import workoutsHandlersInitializer from './modules/app/workouts/handlers-initializer';
commonHandlersInitializer();
macrosHandlersInitializer();
workoutsHandlersInitializer();