define(["ui/menuViewGroup/eventList/EventListModel"], function (Model) {
    var MyEventListModel = function () {
        Model.call(this);
        this.initialize();
    }

    MyEventListModel.prototype = Object.create(Model.prototype);

    MyEventListModel.prototype.initialize = function () {
        Model.prototype.initialize.apply(this);
        this.isWithActiveValue = false;
    }

    MyEventListModel.prototype.setIsWithActive = function (isWithActive) {
        this.isWithActiveValue = isWithActive;
    }

    MyEventListModel.prototype.isWithActive = function () {
        return this.isWithActiveValue;
    }

    return MyEventListModel;
});