function open_teacher(id) {
    if ($(id).css("visibility", "hidden")) {
        $(id).css("visibility", "visible");
    }
}
function close_teacher(id) {
    if ($(id).css("visibility", "visible")) {
        $(id).css("visibility", "hidden");
    }
}