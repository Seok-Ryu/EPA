define(["framework/Model"], function (Model) {
    var EnrolledItemListModel = function () {
        Model.call(this);
        this.initialize();
    };
    EnrolledItemListModel.prototype = Object.create(Model.prototype);

    EnrolledItemListModel.prototype.initialize = function() {
        Model.prototype.initialize.apply(this);
        this.buttonGroup = null;
        this.currentPageIndex = null;
        this.totalPage = null;
        this.eventId = null;
        this.subscriberEnrollDetailList = null;
    };

    EnrolledItemListModel.prototype.setButtonGroup = function(buttonGroup) {
       this.buttonGroup = buttonGroup;
    };

    EnrolledItemListModel.prototype.getButtonGroup = function() {
        return this.buttonGroup;
    };

    EnrolledItemListModel.prototype.setCurrentPageIndex = function(currentPageIndex) {
        this.currentPageIndex = currentPageIndex;
    };

    EnrolledItemListModel.prototype.getCurrentPageIndex = function() {
        return this.currentPageIndex;
    };

    EnrolledItemListModel.prototype.setTotalPage = function(totalPage) {
        this.totalPage = totalPage;
    };

    EnrolledItemListModel.prototype.getTotalPage = function() {
        return this.totalPage;
    };

    EnrolledItemListModel.prototype.setEventId = function(eventId) {
        this.eventId = eventId;
    };

    EnrolledItemListModel.prototype.getEventId = function() {
        return this.eventId;
    };

    EnrolledItemListModel.prototype.setSubscriberEnrollDetailList = function (subscriberEnrollDetailList) {
        this.subscriberEnrollDetailList = subscriberEnrollDetailList;
    };

    EnrolledItemListModel.prototype.getSubscriberEnrollDetailList = function () {
        return this.subscriberEnrollDetailList;
    }

    return EnrolledItemListModel;
});