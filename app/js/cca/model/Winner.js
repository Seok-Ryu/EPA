define(function() {
    var Winner = function (jsonObject) {
        this.jsonObject = jsonObject;
    };

    Winner.prototype.getName = function () {
        return this.jsonObject.name;
    };

    Winner.prototype.getPhone = function () {
        return this.jsonObject.phone;
    };

    Winner.prototype.getPrize = function () {
        return this.jsonObject.prize;
    };

    return Winner;
});
