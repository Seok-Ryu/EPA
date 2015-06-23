define(["cca/type/EventType", "cca/type/EventStatusType", "cca/type/EnrollStatusType", "cca/customType/EntryType", "cca/type/PrizeType",
        "cca/EventStatusValues", "helper/UIHelper", "helper/DateHelper", "cca/type/WinConfirmStatus", "cca/type/PrizeReceiptStatus", "cca/type/EnrollActionType"],
    function (EventType, EventStatusType, EnrollStatusType, EntryType, PrizeType,
              EventStatusValues, UIHelper, DateHelper, WinConfirmStatus, PrizeReceiptStatus, EnrollActionType) {
        var TotalEventStateManager = {
            event : null,
            isShowWinner : false,
            enrollReservationInfo : null,
            entryPoint : null,
            eventStatusValue : null

        };

        TotalEventStateManager.initialize = function () {
            this.event = null;
            this.isShowWinner = false;
            this.enrollReservationInfo = null;
            this.entryPoint = null;
            this.eventStatusValue = null;
        }
        TotalEventStateManager.setInformation = function (event, enrollReservationInfo, isShowWinner, entryPoint) {
            this.event = event;
            this.isShowWinner = isShowWinner;
            this.enrollReservationInfo = enrollReservationInfo;
            this.entryPoint = entryPoint;
        }
        TotalEventStateManager.getEventStatusValue = function () {
            return this.eventStatusValue;
        }
        TotalEventStateManager.setEventStatusValue = function () {
            if (isFromPlay()) {
                if (isAchieveEvent()) {
                    processAchieveEventFromPlay();
                } else {
                    processNonAchieveEventFromPlay();
                }
            } else {
                if (isAchieveEvent()) {
                    processAchieveEventFromOthers();
                } else {
                    processNonAchieveEventFromOthers();
                }
            }
        }

        function setEventStatusValue(eventStatusValues) {
            TotalEventStateManager.eventStatusValue = eventStatusValues;
        }

        function processNonAchieveEventFromOthers() {
            if (isBeforeEnrollEvent()) {
                if (isFinishedEvent()) {
                    processFinishedEvent();
                } else {
                    setEventStatusValue(EventStatusValues.BEFORE_ENROLL);
                }
            } else {
                processNonAchieveEventFromPlay();
            }
        }

        function processAchieveEventFromOthers() {
            if (isBeforeEnrollEvent()) {
                if (isFinishedEvent()) {
                    processFinishedEvent();
                } else {
                    setEventStatusValue(EventStatusValues.BEFORE_ENROLL);
                }
            } else {
                processAchieveEventFromPlay();
            }
        }

        function processNonAchieveEventFromPlay() {
            if (isBeforeEnrollEvent()) {
                if (isFinishedEvent()) {
                    processFinishedEvent();
                } else if (isCollectPhoneNumberForEnroll()) {
                    setEventStatusValue(EventStatusValues.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO);
                } else {
                    setEventStatusValue(EventStatusValues.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO);
                }

            } else if (isInEnrollEvent()) {
                //경품응모는 자동/수동 이벤트가있다. 다만 2번 스테이트는 없을듯, 응모하자마자 피니시가 될듯
            } else if (isFinishedEnrollEvent()) {
                processFinishedEnrollEvent();
            } else {
                //State Ready, 현재 사용안함
            }
        }

        function processAchieveEventFromPlay() {
            if (isBeforeEnrollEvent()) {
                if (isFinishedEvent()) {
                    processFinishedEvent();
                } else if (isCollectPhoneNumberForEnroll()) {
                    setEventStatusValue(EventStatusValues.READY_ENROLL_WITH_PRIVATE_INFO);
                } else {
                    setEventStatusValue(EventStatusValues.READY_ENROLL_WITHOUT_PRIVATE_INFO);
                }
            } else if (isInEnrollEvent()) {
                if (isFinishedEvent()) {
                    processFinishedEvent();
                } else {
                    setEventStatusValue(EventStatusValues.IN_ENROLL);
                }
            } else if (isFinishedEnrollEvent()) {
                processFinishedEnrollEvent();
            } else {
                //State Ready, 현재 사용안함
            }
        }

        function processFinishedEnrollEvent() {
            if (isBeforeDrawTime()) {
                setEventStatusValue(EventStatusValues.FINISHED_ENROLL_BEFORE_DRAW_TIME);
            } else {
                processAfterDrawTimeEvent();
            }
        }

        function processAfterDrawTimeEvent() {
            if (isWinner()) {
                processWinnerByPrizeCase();
            } else {
                setEventStatusValue(EventStatusValues.FINISHED_ENROLL_FOR_LOSER_TO_DRAW);
            }
            //processWinnerButtonCase();
        }

        function processWinnerByPrizeCase() {
            if (isTVCoinPrize()) {
                setEventStatusValue(EventStatusValues.FINISHED_ENROLL_FOR_TVCOIN_PRIZE);
            } else if (isCouponPrize()) {
                setEventStatusValue(EventStatusValues.FINISHED_ENROLL_FOR_COUPON_PRIZE);
            } else if (isManualPrize()) {
                if (isCollectPhoneNumberForPrize()) {
                    if(isConfirmForReceiptPrize()) {
                        setEventStatusValue(EventStatusValues.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO);
                    } else {
                        setEventStatusValue(EventStatusValues.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO);
                    }
                } else {
                    setEventStatusValue(EventStatusValues.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO);
                }
            }
        }


        function processFinishedEvent() {
            if (isLackedPrize()) {
                setEventStatusValue(EventStatusValues.LACKED_PRIZE);
            } else if (isForcedClose()) {
                setEventStatusValue(EventStatusValues.FORCED_CLOSE);
            } else {
                setEventStatusValue(EventStatusValues.EXPIRED_CLOSE);
            }
        }

        function isNeedShowWinnerListButton() {
            return TotalEventStateManager.isShowWinner;
        }

        function isConfirmForReceiptPrize() {
            var subscriberWinInfo = TotalEventStateManager.event.getSubscriberWinInfo();
            if (subscriberWinInfo) {
                return PrizeReceiptStatus.RECEIPT_CONFIRM == subscriberWinInfo.getPrizeReceiptStatus();
            } else {
                return false;
            }
        }

        function isCanceledForReceiptPrize() {
            var subscriberWinInfo = TotalEventStateManager.event.getSubscriberWinInfo();
            if (subscriberWinInfo) {
                return PrizeReceiptStatus.RECEIPT_CANCEL == subscriberWinInfo.getPrizeReceiptStatus();
            } else {
                return false;
            }
        }

        function isConfirmForWinStatus() {
            var subscriberWinInfo = TotalEventStateManager.event.getSubscriberWinInfo();
            if (subscriberWinInfo) {
                return WinConfirmStatus.CONFIRM == subscriberWinInfo.getWinConfirmStatus();
            } else {
                return false;
            }
        }


        function isWinner() {
            var subscriberEnrollInfo = TotalEventStateManager.event.getSubscriberEnrollInfo();
            if(subscriberEnrollInfo) {
                return subscriberEnrollInfo.isWinner();
            } else {
                return false;
            }

        }

        function isTVCoinPrize() {
            var subscriberWinInfo = TotalEventStateManager.event.getSubscriberWinInfo();
            if(subscriberWinInfo) {
                return PrizeType.TV_COIN == subscriberWinInfo.getPrizeType();
            } else {
                return false;
            }
        }

        function isCouponPrize() {
            var subscriberWinInfo = TotalEventStateManager.event.getSubscriberWinInfo();
            if(subscriberWinInfo) {
                return PrizeType.COUPON == subscriberWinInfo.getPrizeType();
            } else {
                return false;
            }
        }

        function isManualPrize() {
            var subscriberWinInfo = TotalEventStateManager.event.getSubscriberWinInfo();
            if(subscriberWinInfo) {
                return PrizeType.MANUAL == subscriberWinInfo.getPrizeType();
            } else {
                return false;
            }
        }


        function isLackedPrize() {
            var eventStatus = TotalEventStateManager.event.getStatus();
            return EventStatusType.LACKED_PRIZE == eventStatus;
        }

        function isForcedClose() {
            var eventStatus = TotalEventStateManager.event.getStatus();
            return EventStatusType.FORCED_CLOSE == eventStatus;
        }


        function isPayBackEvent() {
            var eventType = TotalEventStateManager.event.getEventType();
            return EventType.PAYBACK_EVENT == eventType;
        }

        function isStampEvent() {
            var eventType = TotalEventStateManager.event.getEventType();
            return EventType.STAMP_EVENT == eventType;
        }

        function isPrizeEvent() {
            var eventType = TotalEventStateManager.event.getEventType();
            return EventType.PRIZE_EVENT == eventType;
        }

        function isBonusContentEvent() {
            var eventType = TotalEventStateManager.event.getEventType();
            return EventType.BONUS_CONTENT_EVENT == eventType;
        }

        function isAchieveEvent() {
            var eventType = TotalEventStateManager.event.getEventType();
            return EventType.PRIZE_EVENT != eventType;
        }

        function isBeforeEnrollEvent() {
            var subscriberEnrollInfo = TotalEventStateManager.event.getSubscriberEnrollInfo();
            if(subscriberEnrollInfo) {
                var enrollStatus = subscriberEnrollInfo.getEnrollStatus();
                return EnrollStatusType.BEFORE_ENROLL == enrollStatus;
            } else {
                return true;
            }
        }

        function isFinishedEnrollEvent() {
            var subscriberEnrollInfo = TotalEventStateManager.event.getSubscriberEnrollInfo();
            if(subscriberEnrollInfo) {
                var enrollStatus = subscriberEnrollInfo.getEnrollStatus();
                return EnrollStatusType.FINISHED_ENROLL == enrollStatus;
            } else {
                return false;
            }
        }

        function isInEnrollEvent() {
            var subscriberEnrollInfo = TotalEventStateManager.event.getSubscriberEnrollInfo();
            if(subscriberEnrollInfo) {
                var enrollStatus = subscriberEnrollInfo.getEnrollStatus();
                return EnrollStatusType.IN_ENROLL == enrollStatus;
            } else {
                return false;
            }
        }


        function hasEnrollReservationInfo() {
            return enrollReservationInfo != null;
        }
        function isFromPlay() {
            return EntryType.PLAY == TotalEventStateManager.entryPoint;
        }

        function isBeforeDrawTime() {
            return UIHelper.isBeforeDrawTime(TotalEventStateManager.event);
        }

        function isPurchaseActionEvent() {
            return EnrollActionType.PURCHASE_TYPE == TotalEventStateManager.event.getEnrollActionType();
        }

        function isCollectPhoneNumberForEnroll() {
            return TotalEventStateManager.event.isCollectPhoneNumberForEnroll();
        }

        function isCollectPhoneNumberForPrize() {
            return TotalEventStateManager.event.getSubscriberWinInfo().isCollectPhoneNumberForPrize();
        }

        function isFinishedEvent() {
            return UIHelper.isFinishedEvent(TotalEventStateManager.event);
        }

        function isNeedShowDrawTime() {
            return (isFinishedEnrollEvent() && isBeforeDrawTime());
        }

        function getWinnerAnnouncedTime() {
            return TotalEventStateManager.event.getWinnerAnnouncedTime();
        }

        function isNeedConfirmWinState() {
            return isFinishedEnrollEvent() && !isBeforeDrawTime() && !isConfirmForWinStatus();

        }

        function isNeedShowCouponTitle() {
            return isWinner() && (isCouponPrize() || isTVCoinPrize());
        }

        function getCouponTitle() {
            var subscriberWinInfo = TotalEventStateManager.event.getSubscriberWinInfo();
            if(subscriberWinInfo) {
                var couponInfo = subscriberWinInfo.getCouponInfo();
                return couponInfo.split("|")[0];
            } else {
                return "";
            }
        }

        function isNeedShowPrizeTitle() {
            return isWinner() && isManualPrize();
        }

        function getPrizeTitle() {
            var subscriberWinInfo = TotalEventStateManager.event.getSubscriberWinInfo();
            if(subscriberWinInfo) {
                return subscriberWinInfo.getPrizeDetail();
            } else {
                return "";
            }
        }

        function isNeedShowAchieve() {
            return (isInEnrollEvent() | isFinishedEnrollEvent()) && (isStampEvent() | isPayBackEvent() | isBonusContentEvent());
        }

        function getDrawReservationTime() {
            var drawReservationTime = TotalEventStateManager.event.getDrawReservationTime();
            if(drawReservationTime == null || drawReservationTime.length <= 0) {
                drawReservationTime = "";
            }
            return drawReservationTime;
        }

        TotalEventStateManager.isCollectPhoneNumberForEnroll = function() {
            return isCollectPhoneNumberForEnroll();
        }

        TotalEventStateManager.isCollectPhoneNumberForPrize = function() {
            return isCollectPhoneNumberForPrize();
        }

        TotalEventStateManager.isFinishedEvent = function() {
            return isFinishedEvent();
        }

        TotalEventStateManager.isLackedPrize = function() {
            return isLackedPrize();
        }

        TotalEventStateManager.isForcedClose = function() {
            return isForcedClose();
        }

        TotalEventStateManager.isConfirmForReceiptPrize = function() {
            return isConfirmForReceiptPrize();
        }

        TotalEventStateManager.isCanceledForReceiptPrize = function() {
            return isCanceledForReceiptPrize();
        }

        TotalEventStateManager.isConfirmForWinStatus = function() {
            return isConfirmForWinStatus();
        }

        TotalEventStateManager.isNeedShowWinnerListButton = function() {
            return isNeedShowWinnerListButton();
        }

        TotalEventStateManager.isPurchaseActionEvent = function() {
            return isPurchaseActionEvent();
        }

        TotalEventStateManager.isNeedShowDrawTime = function() {
            return isNeedShowDrawTime();
        }

        TotalEventStateManager.getWinnerAnnouncedTime = function() {
            return getWinnerAnnouncedTime();
        }

        TotalEventStateManager.getDrawReservationTime = function() {
            return getDrawReservationTime();
        }

        TotalEventStateManager.isNeedConfirmWinState = function() {
            return isNeedConfirmWinState();
        }

        TotalEventStateManager.isNeedShowCouponTitle = function() {
            return isNeedShowCouponTitle()
        }

        TotalEventStateManager.getCouponTitle = function() {
            return getCouponTitle()
        }

        TotalEventStateManager.isNeedShowPrizeTitle = function() {
            return isNeedShowPrizeTitle()
        }

        TotalEventStateManager.getPrizeTitle = function() {
            return getPrizeTitle()
        }

        TotalEventStateManager.isNeedShowAchieve = function() {
            return isNeedShowAchieve()
        }

        TotalEventStateManager.getEnrollCompleteCount = function() {
            return TotalEventStateManager.event.getEnrollCompleteCount();
        }

        TotalEventStateManager.getTotalEnrollCount = function() {
            var subscriberEnrollInfo = TotalEventStateManager.event.getSubscriberEnrollInfo()
            if(subscriberEnrollInfo) {
                return subscriberEnrollInfo.getTotalEnrollCount();
            } else {
                return 0;
            }
        }
        TotalEventStateManager.getEnrollCompletePrice = function() {
            return TotalEventStateManager.event.getEnrollCompletePrice();

        }

        TotalEventStateManager.getTotalEnrollPrice = function() {
            var subscriberEnrollInfo = TotalEventStateManager.event.getSubscriberEnrollInfo()
            if(subscriberEnrollInfo) {
                return subscriberEnrollInfo.getTotalEnrollPrice();
            } else {
                return 0;
            }
        }

        TotalEventStateManager.isPayBackEvent = function() {
            return isPayBackEvent();
        }

        TotalEventStateManager.isStampEvent = function() {
            return isStampEvent();
        }

        TotalEventStateManager.isBonusContentEvent = function() {
            return isBonusContentEvent();
        }

        return TotalEventStateManager;
    });