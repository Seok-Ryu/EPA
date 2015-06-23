define(["framework/Model"], function (Model) {
    var AlertDialogModel = function () {
        Model.call(this);
        this.initialize();
    }
    AlertDialogModel.prototype = Object.create(Model.prototype);

    AlertDialogModel.prototype.initialize = function () {
        Model.prototype.initialize.apply(this);
        this.popupValue = "";
        this.buttonGroup = null;
    }

    AlertDialogModel.prototype.setButtonGroup = function(buttonGroup) {
        this.buttonGroup = buttonGroup;
    }
    AlertDialogModel.prototype.getButtonGroup = function() {

        return this.buttonGroup;
    }

    AlertDialogModel.prototype.setPopupValue = function (popupValue) {
        this.popupValue = popupValue;
    }

    AlertDialogModel.prototype.getPopupValue = function () {
        return this.popupValue;
    }

    return AlertDialogModel;
});