define(["framework/Model"], function (Model) {
    var PortalMenuListModel = function () {
        Model.call(this);
        this.initialize();
    }
    PortalMenuListModel.prototype = Object.create(Model.prototype);

    PortalMenuListModel.prototype.initialize = function () {
        Model.prototype.initialize.apply(this);
    }

    return PortalMenuListModel;
});