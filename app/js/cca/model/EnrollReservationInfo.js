define(function() {
    var EnrollReservationInfo = function(jsonObject) {
        this.jsonObject = jsonObject;
    };

    EnrollReservationInfo.prototype.getServiceId = function(){
        return this.jsonObject.serviceId;
    };

    EnrollReservationInfo.prototype.getServiceDomain = function(){
        return this.jsonObject.serviceDomain;
    };

    EnrollReservationInfo.prototype.getAssetId = function(){
        return this.jsonObject.assetId;
    };

    EnrollReservationInfo.prototype.getPurchaseId = function(){
        return this.jsonObject.purchaseId;
    };

    EnrollReservationInfo.prototype.getPurchaseDomain = function(){
        return this.jsonObject.purchaseDomain;
    };

    EnrollReservationInfo.prototype.getProductId = function(){
        return this.jsonObject.productId;
    };

    EnrollReservationInfo.prototype.getGoodId = function(){
        return this.jsonObject.goodId;
    };

    EnrollReservationInfo.prototype.getProductType = function(){
        return this.jsonObject.productType;
    };

    EnrollReservationInfo.prototype.isUsedFreeCoupon = function(){
        return this.jsonObject.isUsedFreeCoupon;
    };

    EnrollReservationInfo.prototype.getPrice = function(){
        return this.jsonObject.price;
    };

    return EnrollReservationInfo;
});


