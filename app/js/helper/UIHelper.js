/**
 * 데이터를 변형하거나 시나리오를 풀어야 하는 부분에서 사용
 */
define(["cca/type/EnrollStatusType", "cca/type/EventStatusType", "helper/DateHelper"],
    function (EnrollStatusType, EventStatusType, DateHelper) {
        var UIHelper = {};

        UIHelper.addThousandSeparatorCommas = function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        UIHelper.hyphenPhoneNumber = function(phoneNumber) {
           return phoneNumber.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]*)([0-9]{4})/,"$1-$2-$3");
        }

        UIHelper.getEventStateClassName = function(event) {
            <!-- 응모완료:enter, 참여중:join, 종료:end, 당첨:win, 마감임박:notify 중 택일-->
            var eventStateClassName = "";

            var subscriberEnrollInfo = event.getSubscriberEnrollInfo();
            if(subscriberEnrollInfo) {
                if(subscriberEnrollInfo.isWinner()) {
                    eventStateClassName = "win";
                } else if(UIHelper.isFinishedEvent(event)) {
                    eventStateClassName = "end";
                } else if(UIHelper.isDeadLineEvent(event)) {
                    eventStateClassName = "notify";
                } else {
                    var enrollStatus = subscriberEnrollInfo.getEnrollStatus();

                    switch (enrollStatus) {
                        case EnrollStatusType.READY_ENROLL:
                        case EnrollStatusType.IN_ENROLL:
                            eventStateClassName = "join";
                            break;
                        case EnrollStatusType.FINISHED_ENROLL:
                            /*if(UIHelper.isBeforeDrawTime(event)) {
                                eventStateClassName = "enter";
                            } else {
                                eventStateClassName = "nowin";
                            }*/
                            eventStateClassName = "enter";
                            break;
                    }
                }
            } else {
                if(UIHelper.isFinishedEvent(event)) {
                    eventStateClassName = "end";
                } else if(UIHelper.isDeadLineEvent(event)) {
                    eventStateClassName = "notify";
                }
            }

            return eventStateClassName;
        }

        UIHelper.isDeadLineEvent = function (event) {
            if(EventStatusType.IN_DEADLINE == event.getStatus()) {
                if(event.getSubscriberEnrollInfo()) {
                    return EnrollStatusType.FINISHED_ENROLL != event.getSubscriberEnrollInfo().getEnrollStatus()
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        UIHelper.isBeforeDrawTime = function (event) {
            var drawReservationTime = event.getDrawReservationTime();
            if(drawReservationTime == null || drawReservationTime.length <= 0) {
                //@Comment 즉시 추첨일 경우 필드값이 없음.
                return false;
            } else {
                //@Comment 지나간 시간이면 true 를 반환하여 reverse
                return !(DateHelper.isPassedTime(drawReservationTime));
            }
        }

        UIHelper.isFinishedEvent = function (event) {

            var eventStatus = event.getStatus();
            var actionEndTime = event.getActionEndTime();

            if(EventStatusType.LACKED_PRIZE == eventStatus || EventStatusType.FORCED_CLOSE == eventStatus) {
                if(UIHelper.isFinishedEnrollEvent(event)) {
                    return false;
                } else {
                    return true;
                }
            } else if(DateHelper.isPassedTime(actionEndTime)) {
                if(UIHelper.isFinishedEnrollEvent(event)) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        UIHelper.isFinishedEnrollEvent = function (event) {
            var subscriberEnrollInfo = event.getSubscriberEnrollInfo();
            if(subscriberEnrollInfo) {
                var enrollStatus = subscriberEnrollInfo.getEnrollStatus();
                if(EnrollStatusType.FINISHED_ENROLL == enrollStatus) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

            /**
         * list에서 해당 type의 product 를 return
         * @param productList
         * @param type
         * @returns {*}
         */
        UIHelper.getProduct = function(productList, type) {
            var product = null;
            for ( var i = 0; i < productList.length; i++) {
                if (productList[i].getProductType() == type) {
                    product = productList[i];
                    break;
                }
            }
            return product;
        }


        UIHelper.transformHourMinuteTimeToMinuteTime = function (time) {
            var hourMinute = time.split(":");
            return hourMinute[0]*60 + hourMinute[1]*1;
        }


        return UIHelper;
});