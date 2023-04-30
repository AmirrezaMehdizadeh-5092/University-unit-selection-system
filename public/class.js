function open_class(id) {
    if ($(id).css("visibility", "hidden")) {
        $(id).css("visibility", "visible");
    }
}
function close_class(id) {
    if ($(id).css("visibility", "visible")) {
        $(id).css("visibility", "hidden");
    }
}