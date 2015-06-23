define(function() {
    var SubscriberWinInfo = function(jsonObject) {
        this.jsonObject = jsonObject;
    };

    SubscriberWinInfo.prototype.isCollectPhoneNumberForPrize = function(){
        return this.jsonObject.isCollectPhoneNumberForPrize;
    };

    SubscriberWinInfo.prototype.getPrizeType = function(){
        return this.jsonObject.prizeType;
    };

    SubscriberWinInfo.prototype.getPrizeDetail = function(){
        return this.jsonObject.prizeDetail;
    };

    SubscriberWinInfo.prototype.getWinConfirmStatus = function(){
        return this.jsonObject.winConfirmStatus;
    };

    SubscriberWinInfo.prototype.getPrizeReceiptStatus = function(){
        return this.jsonObject.prizeReceiptStatus;
    };

    SubscriberWinInfo.prototype.getPhone = function(){
        return this.jsonObject.phone;
    };

    SubscriberWinInfo.prototype.getCouponInfo = function(){
        return this.jsonObject.couponInfo;
    };

    return SubscriberWinInfo;
});