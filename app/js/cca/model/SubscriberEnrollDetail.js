define(function() {
    var SubscriberEnrollDetail = function (jsonObject) {
        this.jsonObject = jsonObject;
    };

    SubscriberEnrollDetail.prototype.getTargetType = function(){
        return this.jsonObject.targetType;
    };

    SubscriberEnrollDetail.prototype.getAssetId = function(){
        return this.jsonObject.assetId;
    };

    SubscriberEnrollDetail.prototype.getProductId = function(){
        return this.jsonObject.productId;
    };

    SubscriberEnrollDetail.prototype.getGoodId = function(){
        return this.jsonObject.goodId;
    };

    SubscriberEnrollDetail.prototype.getTargetName = function(){
        return this.jsonObject.targetName;
    };

    SubscriberEnrollDetail.prototype.getEnrollTime = function(){
        return this.jsonObject.enrollTime;
    };

    SubscriberEnrollDetail.prototype.getPrice = function(){
        return this.jsonObject.price;
    };


    return SubscriberEnrollDetail;
});