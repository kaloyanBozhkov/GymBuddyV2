export default elem => {
    $(document).on("mouseenter touchstart", elem, e => {
        e.currentTarget.classList.add("hovered");
    });
    $(document).on("touchend mouseleave touchmove", elem, e => {
        e.currentTarget.classList.remove("hovered");
    });
};