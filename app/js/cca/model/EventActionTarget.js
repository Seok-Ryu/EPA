define(function() {
    var EventActionTarget = function (jsonObject) {
        this.jsonObject = jsonObject;
    };

    EventActionTarget.prototype.getTargetType = function () {
        return this.jsonObject.targetType;
    };

    EventActionTarget.prototype.getTargetId = function () {
        return this.jsonObject.targetId;
    };

    EventActionTarget.prototype.getTitle = function () {
        return this.jsonObject.title;
    };

    EventActionTarget.prototype.getPrice = function () {
        return this.jsonObject.price;
    };

    EventActionTarget.prototype.getRedirectCategoryId = function () {
        return this.jsonObject.redirectCategoryId;
    };

    EventActionTarget.prototype.getRedirectAssetId = function () {
        return this.jsonObject.redirectAssetId;
    };

    EventActionTarget.prototype.getProductType = function () {
        return this.jsonObject.productType;
    };

    return EventActionTarget;
});
