define(["framework/Model"], function (Model) {
    var EventListModel = function () {
        Model.call(this);
        this.initialize();
    }

    EventListModel.prototype = Object.create(Model.prototype);

    EventListModel.prototype.initialize = function () {
        Model.prototype.initialize.apply(this);
        this.focusedPortalMenuId = null;
        this.focusedPortalMenuType = null;
        this.totalCount = 0;
    }

    EventListModel.prototype.setFocusedPortalMenuId = function (focusedPortalMenuId) {
        this.focusedPortalMenuId = focusedPortalMenuId;
    }

    EventListModel.prototype.getFocusedPortalMenuId = function () {
        return this.focusedPortalMenuId;
    }

    EventListModel.prototype.setFocusedPortalMenuType = function (focusedPortalMenuType) {
        this.focusedPortalMenuType = focusedPortalMenuType;
    }

    EventListModel.prototype.getFocusedPortalMenuType = function () {
        return this.focusedPortalMenuType;
    }

    EventListModel.prototype.setTotalCount = function (totalCount) {
        this.totalCount = totalCount;
    }

    EventListModel.prototype.getTotalCount = function () {
        return this.totalCount;
    }

    EventListModel.prototype.setFocusedPortalListSize = function (focusedPortalListSize) {
        this.focusedPortalListSize = focusedPortalListSize;
    }

    EventListModel.prototype.getFocusedPortalListSize = function () {
        return this.focusedPortalListSize;
    }


    return EventListModel;
});