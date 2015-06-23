define(["framework/Model"], function (Model) {
    var CollectPhoneNumberModel = function () {
        Model.call(this);
        this.initialize();
    };

    CollectPhoneNumberModel.prototype = Object.create(Model.prototype);

    CollectPhoneNumberModel.prototype.initialize = function () {
        Model.prototype.initialize.apply(this);
        this.title = "";
        this.descriptionText = "";
        this.inputField = null;
        this.inputFieldList = null;
        this.inputFieldListIndex = 0;
        this.buttonGroup = null;
    };

    CollectPhoneNumberModel.prototype.setTitle = function(title) {
        this.title = title;
    };

    CollectPhoneNumberModel.prototype.getTitle = function() {
        return this.title;
    };

    CollectPhoneNumberModel.prototype.setDescriptionText = function(descriptionText) {
        this.descriptionText = descriptionText;
    };

    CollectPhoneNumberModel.prototype.getDescriptionText = function() {
        return this.descriptionText;
    };

    CollectPhoneNumberModel.prototype.setInputField = function(inputField) {
        this.inputField = inputField;
    };

    CollectPhoneNumberModel.prototype.getInputField = function() {
        return this.inputField;
    };

    CollectPhoneNumberModel.prototype.setButtonGroup = function(buttonGroup) {
        this.buttonGroup = buttonGroup;
    };

    CollectPhoneNumberModel.prototype.getButtonGroup = function() {
        return this.buttonGroup;
    };

    CollectPhoneNumberModel.prototype.setInputFieldList = function(inputFieldList) {
        this.inputFieldList = inputFieldList;
    };

    CollectPhoneNumberModel.prototype.getInputFieldList = function() {
        return this.inputFieldList;
    };

    CollectPhoneNumberModel.prototype.setInputFieldListIndex = function(index) {
        this.inputFieldListIndex = index;
    };

    CollectPhoneNumberModel.prototype.getInputFieldListIndex = function() {
        return this.inputFieldListIndex;
    };

    return CollectPhoneNumberModel;
});