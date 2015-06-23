define(function() {
    var RelatedEvent = function (jsonObject) {
        this.jsonObject = jsonObject;
    };

    RelatedEvent.prototype.getEventId = function () {
        return this.jsonObject.eventId;
    };

    RelatedEvent.prototype.getTitle = function () {
        return this.jsonObject.title;
    };

    RelatedEvent.prototype.getDescription = function () {
        return this.jsonObject.description;
    };

    RelatedEvent.prototype.getEventType = function () {
        return this.jsonObject.eventType;
    };

    RelatedEvent.prototype.isAutoEnroll = function () {
        return this.jsonObject.isAutoEnroll;
    };

    RelatedEvent.prototype.getDisplayStartTime = function () {
        return this.jsonObject.displayStartTime;
    };

    RelatedEvent.prototype.getDisplayEndTime = function () {
        return this.jsonObject.displayEndTime;
    };

    RelatedEvent.prototype.getActionStartTime = function () {
        return this.jsonObject.actionStartTime;
    };

    RelatedEvent.prototype.getActionEndTime = function () {
        return this.jsonObject.actionEndTime;
    };

    RelatedEvent.prototype.getStatus = function () {
        return this.jsonObject.status;
    };

    RelatedEvent.prototype.getEnrollStatus = function () {
        return this.jsonObject.enrollStatus;
    };

    return RelatedEvent;
});
