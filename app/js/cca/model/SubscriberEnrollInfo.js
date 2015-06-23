define(function() {
    var SubscriberEnrollInfo = function(jsonObject) {
        this.jsonObject = jsonObject;
    };

    SubscriberEnrollInfo.prototype.getTotalEnrollCount = function(){
        return this.jsonObject.totalEnrollCount;
    };

    SubscriberEnrollInfo.prototype.getTotalEnrollPrice = function(){
        return this.jsonObject.totalEnrollPrice;
    };

    SubscriberEnrollInfo.prototype.getEnrollStatus = function(){
        return this.jsonObject.enrollStatus;
    };

    SubscriberEnrollInfo.prototype.getLastEnrollTime = function(){
        return this.jsonObject.lastEnrollTime;
    };

    SubscriberEnrollInfo.prototype.isWinner = function(){
        return this.jsonObject.isWinner;
    };

    return SubscriberEnrollInfo;
});