define(["framework/Model"], function(Model){
    var ConfirmCollectPhoneNumberModel = function() {
        Model.call(this);
        this.initialize();
    };

    ConfirmCollectPhoneNumberModel.prototype = Object.create(Model.prototype);

    ConfirmCollectPhoneNumberModel.prototype.initialize = function () {
        Model.prototype.initialize.apply(this);
        this.title = "";
        this.headDescriptionText = "";
        this.bottomDescriptionText = "";
        this.phoneNumber = "";
        this.buttonGroup = null;
    };

    ConfirmCollectPhoneNumberModel.prototype.setTitle = function(title) {
        this.title = title;
    };

    ConfirmCollectPhoneNumberModel.prototype.getTitle = function() {
        return this.title;
    };

    ConfirmCollectPhoneNumberModel.prototype.setHeadDescriptionText = function(headDescriptionText) {
        this.headDescriptionText = headDescriptionText;
    };

    ConfirmCollectPhoneNumberModel.prototype.getHeadDescriptionText = function() {
        return this.headDescriptionText;
    };

    ConfirmCollectPhoneNumberModel.prototype.setBottomDescriptionText = function(bottomDescriptionText) {
        this.bottomDescriptionText = bottomDescriptionText;
    };

    ConfirmCollectPhoneNumberModel.prototype.getBottomDescriptionText = function() {
        return this.bottomDescriptionText;
    };

    ConfirmCollectPhoneNumberModel.prototype.setPhoneNumber = function(phoneNumber) {
        this.phoneNumber = phoneNumber;
    };

    ConfirmCollectPhoneNumberModel.prototype.getPhoneNumber = function() {
        return this.phoneNumber;
    };

    ConfirmCollectPhoneNumberModel.prototype.setButtonGroup = function(buttonGroup) {
        this.buttonGroup = buttonGroup;
    };

    ConfirmCollectPhoneNumberModel.prototype.getButtonGroup = function() {
        return this.buttonGroup;
    };

    return ConfirmCollectPhoneNumberModel;
});