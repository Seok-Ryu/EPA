define(["framework/Model"],
    function(Model) {
        var AvailableItemListToEnrollModel = function() {

            Model.call(this);
            this.initialize();

        };

        AvailableItemListToEnrollModel.prototype = Object.create(Model.prototype);

        AvailableItemListToEnrollModel.prototype.initialize = function () {
            Model.prototype.initialize.apply(this);
            this.buttonGroup = null;
            this.currentFocusedStatement = null;
            this.eventId = null;
            this.eventTitle = null;
            this.eventActionTargetList = null;
        }

        AvailableItemListToEnrollModel.prototype.setButtonGroup = function(buttonGroup) {
            this.buttonGroup = buttonGroup;
        };
        AvailableItemListToEnrollModel.prototype.getButtonGroup = function() {
            return this.buttonGroup;
        };

        AvailableItemListToEnrollModel.prototype.setCurrentFocusedStatement = function(statement){
            this.currentFocusedStatement = statement;
        };
        AvailableItemListToEnrollModel.prototype.getCurrentFocusedStatement = function() {
            return this.currentFocusedStatement;
        };

        AvailableItemListToEnrollModel.prototype.setEventId = function(eventId){
            this.eventId = eventId;
        };
        AvailableItemListToEnrollModel.prototype.getEventId = function() {
            return this.eventId;
        };

        AvailableItemListToEnrollModel.prototype.setEventTitle= function(eventTitle){
            this.eventTitle = eventTitle;
        };
        AvailableItemListToEnrollModel.prototype.getEventTitle = function() {
            return this.eventTitle;
        };

        AvailableItemListToEnrollModel.prototype.setEventActionTargetList= function(eventActionTargetList){
            this.eventActionTargetList = eventActionTargetList;
        };
        AvailableItemListToEnrollModel.prototype.getEventActionTargetList = function() {
            return this.eventActionTargetList;
        };



        return AvailableItemListToEnrollModel;
    });
