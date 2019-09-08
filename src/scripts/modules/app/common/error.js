export default msg => {
    $("body").prepend(`
        <div id="errorMsg">
            <div>
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div>
                <p>
                ${msg}
                </p>
            </div>
        </div>
    `);
    $("body").addClass("errorMsgShowing");
}