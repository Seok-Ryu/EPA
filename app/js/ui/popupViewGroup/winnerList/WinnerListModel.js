define(["framework/Model"], function(Model) {
    var WinnerListModel = function() {
        Model.call(this);
        this.initialize();
    };
    WinnerListModel.prototype = Object.create(Model.prototype);

    WinnerListModel.prototype.initialize = function() {
        Model.prototype.initialize.apply(this);
        this.buttonGroup = null;
        this.currentPageIndex = null;
        this.nextPageIndex = null;
        this.eventId = null;
    };

    WinnerListModel.prototype.setButtonGroup = function(buttonGroup) {
        this.buttonGroup = buttonGroup;
    };

    WinnerListModel.prototype.getButtonGroup = function() {
        return this.buttonGroup;
    };

    WinnerListModel.prototype.setCurrentPageIndex = function(currentPageIndex) {
        this.currentPageIndex = currentPageIndex;
    };

    WinnerListModel.prototype.getCurrentPageIndex = function() {
        return this.currentPageIndex;
    };

    WinnerListModel.prototype.setNextPageIndex = function(nextPageIndex) {
        this.nextPageIndex = nextPageIndex;
    };

    WinnerListModel.prototype.getNextPageIndex = function() {
        return this.nextPageIndex;
    };

    WinnerListModel.prototype.setTotalPage = function(totalPage) {
        this.totalPage = totalPage;
    };

    WinnerListModel.prototype.getTotalPage = function() {
        return this.totalPage;
    };

    WinnerListModel.prototype.setEventId = function(eventId) {
        this.eventId = eventId;
    };

    WinnerListModel.prototype.getEventId = function() {
        return this.eventId;
    };

    return WinnerListModel;
});
