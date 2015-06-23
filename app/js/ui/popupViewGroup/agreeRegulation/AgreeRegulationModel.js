define(["framework/Model"], function (Model) {
    var AgreeRegulationModel = function () {
        Model.call(this);
        this.initialize();
    };

    AgreeRegulationModel.prototype = Object.create(Model.prototype);

    AgreeRegulationModel.prototype.init = function () {
        Model.prototype.init.apply(this);
        this.title = "";
        this.headDescriptionText = "";
        this.bottomDescriptionText = "";
        this.buttonGroup = null;
    };

    AgreeRegulationModel.prototype.setTitle = function(title) {
        this.title = title;
    };

    AgreeRegulationModel.prototype.getTitle = function() {
        return this.title;
    };

    AgreeRegulationModel.prototype.setHeadDescriptionText = function(headDescriptionText) {
        this.headDescriptionText = headDescriptionText;
    };

    AgreeRegulationModel.prototype.getHeadDescriptionText = function() {
        return this.headDescriptionText;
    };

    AgreeRegulationModel.prototype.setBottomDescriptionText = function(bottomDescriptionText) {
        this.bottomDescriptionText = bottomDescriptionText;
    };

    AgreeRegulationModel.prototype.getBottomDescriptionText = function() {
        return this.bottomDescriptionText;
    };

    AgreeRegulationModel.prototype.setButtonGroup = function(buttonGroup) {
        this.buttonGroup = buttonGroup;
    };

    AgreeRegulationModel.prototype.getButtonGroup = function() {
        return this.buttonGroup;
    };

    return AgreeRegulationModel;
});