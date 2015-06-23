define(["framework/Model"], function (Model) {
    var EventDetailModel = function () {
        Model.call(this);
        this.initialize();
    }
    EventDetailModel.prototype = Object.create(Model.prototype);

    EventDetailModel.prototype.initialize = function () {
        Model.prototype.initialize.apply(this);
        this.eventId = null;
        this.assetId = null;
        this.enrollReservationInfo = null;
        this.event = null;
        this.buttonGroup = null;
        this.isShowWinnerValue = false;
        this.entryPoint = null;
        this.eventStatusValue = null;
        this.eventActionTargetList = null;
        this.relatedEventList = null;
        this.subscriberEnrollDetailList = null;
        this.sourceView = null;
        this.collectPurpose = null;
        this.phoneNumber = null;
        this.relatedEventOpenType = null;

    }

    EventDetailModel.prototype.setEventId = function (eventId) {
        this.eventId = eventId;
    }

    EventDetailModel.prototype.getEventId = function () {
        return this.eventId;
    }

    EventDetailModel.prototype.setAssetId = function (assetId) {
        this.assetId = assetId;
    }

    EventDetailModel.prototype.getAssetId = function () {
        return this.assetId;
    }

    EventDetailModel.prototype.setEvent = function (event) {
        this.event = event;
    }

    EventDetailModel.prototype.getEvent = function () {
        return this.event;
    }

    EventDetailModel.prototype.setEnrollReservationInfo = function (enrollReservationInfo) {
        this.enrollReservationInfo = enrollReservationInfo;
    }

    EventDetailModel.prototype.getEnrollReservationInfo = function () {
        return this.enrollReservationInfo;
    }

    EventDetailModel.prototype.setButtonGroup = function(buttonGroup) {
        this.buttonGroup = buttonGroup;
    };
    EventDetailModel.prototype.getButtonGroup = function() {
        return this.buttonGroup;
    };

    EventDetailModel.prototype.setShowWinner = function (isShowWinner) {
        this.isShowWinnerValue = isShowWinner;
    }

    EventDetailModel.prototype.isShowWinner = function () {
        return this.isShowWinnerValue;
    }

    EventDetailModel.prototype.setEventStatusValue = function (eventStatusValue) {
        this.eventStatusValue = eventStatusValue;
    }

    EventDetailModel.prototype.getEventStatusValue = function () {
        return this.eventStatusValue;
    }

    EventDetailModel.prototype.setEntryPoint = function (entryPoint) {
        this.entryPoint = entryPoint;
    }

    EventDetailModel.prototype.getEntryPoint = function () {
        return this.entryPoint;
    }

    EventDetailModel.prototype.setEventActionTargetList = function (eventActionTargetList) {
        this.eventActionTargetList = eventActionTargetList;
    }

    EventDetailModel.prototype.getEventActionTargetList = function () {
        return this.eventActionTargetList;
    }

    EventDetailModel.prototype.setRelatedEventList = function (relatedEventList){
        this.relatedEventList = relatedEventList;
    }

    EventDetailModel.prototype.getRelatedEventList = function () {
        return this.relatedEventList;
    }

    EventDetailModel.prototype.setSubscriberEnrollDetailList = function (subscriberEnrollDetailList) {
        this.subscriberEnrollDetailList = subscriberEnrollDetailList;
    }

    EventDetailModel.prototype.getSubscriberEnrollDetailList = function () {
        return this.subscriberEnrollDetailList;
    }

    EventDetailModel.prototype.setSourceView = function (sourceView) {
        this.sourceView = sourceView;
    }

    EventDetailModel.prototype.getSourceView = function () {
        return this.sourceView;
    }

    EventDetailModel.prototype.setCollectPurpose = function (collectPurpose) {
        this.collectPurpose = collectPurpose;
    }

    EventDetailModel.prototype.getCollectPurpose = function () {
        return this.collectPurpose;
    }

    EventDetailModel.prototype.setPhoneNumber = function (phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    EventDetailModel.prototype.getPhoneNumber = function () {
        return this.phoneNumber;
    }

    EventDetailModel.prototype.setRelatedEventOpenType = function (relatedEventOpenType) {
        this.relatedEventOpenType = relatedEventOpenType;
    }

    EventDetailModel.prototype.getRelatedEventOpenType = function () {
        return this.relatedEventOpenType;
    }



    return EventDetailModel;
});