define(function() {
	var Event = function(jsonObject) {
		this.jsonObject = jsonObject;
	};

	Event.prototype.getEventID = function(){
		return this.jsonObject.eventId;
	};

    Event.prototype.getTitle = function(){
        return this.jsonObject.title;
    };

    Event.prototype.getDescription = function(){
        return this.jsonObject.description;
    };

    Event.prototype.getEventType = function(){
        return this.jsonObject.eventType;
    };

    Event.prototype.isAutoEnroll = function(){
        return this.jsonObject.isAutoEnroll;
    };

    Event.prototype.getDisplayStartTime = function(){
        return this.jsonObject.displayStartTime;
    };

    Event.prototype.getDisplayEndTime = function(){
        return this.jsonObject.displayEndTime;
    };

    Event.prototype.getActionStartTime = function(){
        return this.jsonObject.actionStartTime;
    };

    Event.prototype.getActionEndTime = function(){
        return this.jsonObject.actionEndTime;
    };

    Event.prototype.getStatus = function(){
        return this.jsonObject.status;
    };

    Event.prototype.getCreationTime = function(){
        return this.jsonObject.creationTime;
    };

    Event.prototype.getLastModifyTime = function(){
        return this.jsonObject.lastModifyTime;
    };

    Event.prototype.getImageUrl = function(){
        return this.jsonObject.imageUrl;
    };

    Event.prototype.getCloseBtnRedirectCategoryId = function(){
        return this.jsonObject.closeBtnRedirectCategoryId;
    };

    Event.prototype.getEnrollActionType = function(){
        return this.jsonObject.enrollActionType;
    };

    Event.prototype.getEnrollCompleteCount = function(){
        return this.jsonObject.enrollCompleteCount;
    };

    Event.prototype.getEnrollCompletePrice = function(){
        return this.jsonObject.enrollCompletePrice;
    };

    Event.prototype.isCollectPhoneNumberForEnroll = function(){
        return this.jsonObject.isCollectPhoneNumberForEnroll;
    };

    Event.prototype.getDrawReservationTime = function(){
        return this.jsonObject.drawReservationTime;
    };

    Event.prototype.getDrawExecutionTime = function(){
        return this.jsonObject.drawExecutionTime;
    };

    Event.prototype.getWinnerAnnouncedTime = function(){
        return this.jsonObject.winnerAnnouncedTime;
    };

    Event.prototype.getSubscriberEnrollInfo = function(){
        return this.jsonObject.subscriberEnrollInfo; //  SubscriberEnrollInfo
    };

    Event.prototype.getSubscriberWinInfo = function(){
        return this.jsonObject.subscriberWinInfo; //SubscriberWinInfo
    };

	return Event;
});