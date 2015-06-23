define(function() {
    var EventViewTarget = function (jsonObject) {
        this.jsonObject = jsonObject;
    };

    EventViewTarget.prototype.getTargetType = function () {
        return this.jsonObject.targetType;
    };

    EventViewTarget.prototype.getTargetId = function () {
        return this.jsonObject.targetId;
    };

    EventViewTarget.prototype.getEventList = function () {
        return this.jsonObject.eventList; // Event[];
    };


    return EventViewTarget;
});
