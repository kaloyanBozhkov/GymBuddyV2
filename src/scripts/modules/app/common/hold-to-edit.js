import global from '../../global-variables';
export default (elem, fn) => {
    $(document).on("mousedown touchstart", elem, e => {
        global.holdTimer = {
            selectedTimer: setTimeout(()=> {
                e.currentTarget.classList.add("selected");
                navigator.vibrate(20);
            }, 200),//show selection shadow when not a click
            editTimer: window.setTimeout(() => { //arrow function in ES6 does not follow normal function scope rules, it goes to its parent's scope for its this 
                navigator.vibrate(50);
                fn(e.currentTarget); 
            }, 1000)
        };
    });
    $(document).on("mouseup touchend mouseleave touchmove", elem, e => {
        e.currentTarget.classList.remove("selected");
        if (global.holdTimer) {
            window.clearTimeout(global.holdTimer.selectedTimer);
            window.clearTimeout(global.holdTimer.editTimer);
            global.holdTimer = null;
        }
    });
};