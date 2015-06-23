define(function() {
    var Notice = function (jsonObject) {
        this.jsonObject = jsonObject;
    };

    Notice.prototype.getNoticeId = function () {
        return this.jsonObject.noticeId;
    };

    Notice.prototype.getTitle = function () {
        return this.jsonObject.title;
    };

    Notice.prototype.getDescription = function () {
        return this.jsonObject.description;
    };

    Notice.prototype.getCreationTime = function () {
        return this.jsonObject.creationTime;
    };

    return Notice;
});
