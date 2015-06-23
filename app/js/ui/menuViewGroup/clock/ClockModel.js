define(["framework/Model"], function (Model) {
    var ClockModel = function () {
        Model.call(this);

    }
    ClockModel.prototype = Object.create(Model.prototype);

    ClockModel.prototype.initialize = function () {
        Model.prototype.initialize.apply(this);
    }

    return ClockModel;
});