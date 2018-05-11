module.exports = function createRobot() {
    var empty = "";
    var assigned = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i=0; i < 15; i++) {
        empty += assigned.charAt(Math.floor(Math.random() * assigned.length));

        return empty;
    }
}