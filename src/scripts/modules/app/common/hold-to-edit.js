import global from '../../global-variables';
export default (elem, fn) => {
    $(document).on("mousedown touchstart", elem, e => {
        global.holdTimer = window.setTimeout(() => { //arrow function in ES6 does not follow normal function scope rules, it goes to its parent's scope for its this
           fn(e.currentTarget); 
        }, 1000);
    });
    $(document).on("mouseup touchend", elem, () => {
        if (global.holdTimer) {
            window.clearTimeout(global.holdTimer);
            global.holdTimer = null;
        }
    });
};