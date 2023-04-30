function open_student(id) {
    if ($(id).css("visibility", "hidden")) {
        $(id).css("visibility", "visible");
    }
}
function close_student(id) {
    if ($(id).css("visibility", "visible")) {
        $(id).css("visibility", "hidden");
    }
}