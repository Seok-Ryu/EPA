
"use strict";
define(
    ['../service/TotalEventStateManager', 'helper/StructureHelper',
        "cca/EventStatusValues", "cca/customType/EntryType", "cca/type/EventType", "cca/type/EventStatusType", "cca/type/EnrollActionType", "cca/type/EnrollStatusType",
        "cca/type/PrizeType", "cca/type/WinConfirmStatus", "cca/type/PrizeReceiptStatus"],
    function(TotalEventStateManager, StructureHelper,
             EventStatusValues, EntryType, EventType, EventStatusType, EnrollActionType, EnrollStatusType, PrizeType, WinConfirmStatus, PrizeReceiptStatus) {

        function getEvent() {
            var event = {
                eventId:"abc",
                title:"1번이벤트",
                description:"1번이벤트라능",
                isAutoEnroll: false,
                imageUrl:"resources/images/detail_iframe.jpg",
                closeBtnRedirectCategoryId:"123456",
                enrollCompleteCount : 10,
                enrollCompletePrice : 50000,


                eventType: testValue.eventType, //경품 = 0, 스탬프 = 1, n+1 = 2, 페이백 = 3
                status : testValue.status, //전 = 10, 중 = 20, 마감임박 = 30, 추첨대기 = 40, 추첨완료, 50, 상품소진 = 51, 발표완료 70, 진행중지 80
                isCollectPhoneNumberForEnroll: testValue.isCollectPhoneNumberForEnroll,
                drawExecutionTime: testValue.drawExecutionTime, //추첨 실행일, 없으면 실시간 추첨
                winnerAnnouncedTime : testValue.winnerAnnouncedTime, // 당첨자 발표일
                actionEndTime: testValue.actionEndTime, // 이벤트 진행종료일
                enrollActionType: testValue.enrollActionType, //구매 =0, 시청 = 1

                subscriberEnrollInfo: {
                    totalEnrollCount: testValue.totalEnrollCount,
                    totalEnrollPrice: testValue.totalEnrollPrice,
                    enrollStatus: testValue.enrollStatus, //미참여 = 0 , 참여의사 = 1, 참여중 = 2, 참여완료 = 9
                    isWinner: testValue.isWinner
                },
                subscriberWinInfo:{
                    prizeType: testValue.prizeType,
                    isCollectPhoneNumberForPrize: testValue.isCollectPhoneNumberForPrize,
                    winConfirmStatus: testValue.winConfirmStatus, //당첨 미확인 = 0, 수령확인 = 1
                    prizeReceiptStatus: testValue.prizeReceiptStatus, // 경품수령미확인 = 0, 수령확인 = 1, 수령취소 = 2;
                    prizeDetail:"상품상세 블라블라",
                    phone:"123-4665-1234"
                }
            };
            //event = JSON.parse(JSON.stringify(event));

            return StructureHelper.createEventStructure({event:event}).event;
        }

        function getEnrollReservationInfo() {
            var enrollReservationInfo = {
                purchaseId:"purchaseid",
                purchaseDomain:"purchaseDomain",
                productId:"productId",
                goodId:"goodId",
                productType:"RVOD",
                isUsedFreeCoupon:false,
                price:10001
            };
            //enrollReservationInfo = JSON.parse(JSON.stringify(enrollReservationInfo));
            return StructureHelper.createEnrollReservationInfoStructure({enrollReservationInfo:enrollReservationInfo}).enrollReservationInfo;
        }

        function isShowWinner () {
            return testValue.isShowWinner;
        }

        function getEntryPoint() {
            return testValue.entryPoint;
        }

        function TotalEventStateManagerTest(event, enrollReservationInfo, isShowWinner, entryPoint) {
            TotalEventStateManager.initialize();
            TotalEventStateManager.setInformation(event, enrollReservationInfo, isShowWinner, entryPoint);
            TotalEventStateManager.setEventStatusValue();
            //testValue = JSON.parse(JSON.stringify(testValue));

            var eventStatusValues = TotalEventStateManager.getEventStatusValue();
            return eventStatusValues;
        }

        function setEventValue(fieldName, value) {
            testValue[fieldName] = value;
        }

        var testValue = {};
        testValue.eventType = "0";
        testValue.status = 10;
        testValue.isCollectPhoneNumberForEnroll = false;
        testValue.drawExecutionTime = "2015-03-31 23:59:59";
        testValue.winnerAnnouncedTime = "2015-04-01 00:00:01";
        testValue.actionEndTime = "2015-03-21 23:59:59";
        testValue.enrollActionType = "0";


        testValue.totalEnrollCount = 0;
        testValue.totalEnrollPrice = 0;
        testValue.enrollStatus = "0";
        testValue.isWinner = false;
        testValue.isShowWinner = false;

        testValue.prizeType = "0";
        testValue.isCollectPhoneNumberForPrize = false;
        testValue.winConfirmStatus = "0";
        testValue.prizeReceiptStatus = "0";

        var run = function() {
           /* test('이벤트 status 테스트', function() {
                var event = getEvent();
                var enrollReservationInfo = getEnrollReservationInfo();
                var isShowWinner = false;
                var entryPoint = EntryType.PLAY;

                var eventStatusValues = TotalEventStateManagerTest(event, enrollReservationInfo, isShowWinner, entryPoint);
                deepEqual(eventStatusValues, EventStatusValues.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO, '이벤트 미참여 데이터 일치 확인');
            });*/


            test('BEFORE_ENROLL status 테스트 ', function() {
                setEventValue("eventType", EventType.PRIZE_EVENT);
                setEventValue("status", EventStatusType.BEFORE_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.EVENT_LIST);
                setEventValue("enrollStatus", EnrollStatusType.BEFORE_ENROLL);
                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                deepEqual(eventStatusValues, EventStatusValues.BEFORE_ENROLL, 'BEFORE_ENROLL 확인');
            });

            test('NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO 테스트 ', function() {
                setEventValue("eventType", EventType.PRIZE_EVENT);
                setEventValue("status", EventStatusType.BEFORE_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);
                setEventValue("enrollStatus", EnrollStatusType.BEFORE_ENROLL);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                deepEqual(eventStatusValues, EventStatusValues.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO, 'NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO 확인');
            });

            test('NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO 테스트 ', function() {
                setEventValue("eventType", EventType.PRIZE_EVENT);
                setEventValue("status", EventStatusType.BEFORE_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", true);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                deepEqual(eventStatusValues, EventStatusValues.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO, 'NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO 확인');
            });

            test('LACKED_PRIZE status 테스트 ', function() {
                setEventValue("eventType", EventType.PRIZE_EVENT);
                setEventValue("status", EventStatusType.LACKED_PRIZE);
                setEventValue("isCollectPhoneNumberForEnroll", true);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                deepEqual(eventStatusValues, EventStatusValues.LACKED_PRIZE, 'LACKED_PRIZE 확인');
            });

            test('LACKED_PRIZE status 테스트 ', function() {
                setEventValue("eventType", EventType.PRIZE_EVENT);
                setEventValue("status", EventStatusType.LACKED_PRIZE);
                setEventValue("isCollectPhoneNumberForEnroll", true);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                deepEqual(eventStatusValues, EventStatusValues.LACKED_PRIZE, 'LACKED_PRIZE 확인');
            });

            test('FORCED_CLOSE status 테스트 ', function() {
                setEventValue("eventType", EventType.PRIZE_EVENT);
                setEventValue("status", EventStatusType.FORCED_CLOSE);
                setEventValue("isCollectPhoneNumberForEnroll", true);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.FORCED_CLOSE, 'FORCED_CLOSE 확인');
            });

            test('EXPIRED_CLOSE status 테스트 ', function() {
                setEventValue("eventType", EventType.PRIZE_EVENT);
                setEventValue("status", EventStatusType.BEFORE_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", true);
                setEventValue("actionEndTime", "2014-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.EXPIRED_CLOSE, 'EXPIRED_CLOSE 확인');
            });

            test('READY_ENROLL_WITH_PRIVATE_INFO status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.BEFORE_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", true);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.READY_ENROLL_WITH_PRIVATE_INFO, 'READY_ENROLL_WITH_PRIVATE_INFO 확인');
            });

            test('READY_ENROLL_WITHOUT_PRIVATE_INFO status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.BEFORE_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.READY_ENROLL_WITHOUT_PRIVATE_INFO, 'READY_ENROLL_WITHOUT_PRIVATE_INFO 확인');
            });

            test('IN_ENROLL status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.IN_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);
                setEventValue("enrollStatus", EnrollStatusType.IN_ENROLL);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.IN_ENROLL, 'IN_ENROLL 확인');
            });

            test('FINISHED_ENROLL_BEFORE_DRAW_TIME status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.IN_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);
                setEventValue("enrollStatus", EnrollStatusType.FINISHED_ENROLL);
                setEventValue("drawExecutionTime", "2015-03-31 23:59:59");

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.FINISHED_ENROLL_BEFORE_DRAW_TIME, 'FINISHED_ENROLL_BEFORE_DRAW_TIME 확인');
            });

            test('FINISHED_ENROLL_FOR_LOSER_TO_DRAW status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.IN_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);
                setEventValue("enrollStatus", EnrollStatusType.FINISHED_ENROLL);
                setEventValue("drawExecutionTime", "");
                setEventValue("isWinner", false);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.FINISHED_ENROLL_FOR_LOSER_TO_DRAW, 'FINISHED_ENROLL_FOR_LOSER_TO_DRAW 확인');
            });

            test('FINISHED_ENROLL_FOR_TVCOIN_PRIZE status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.IN_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);
                setEventValue("enrollStatus", EnrollStatusType.FINISHED_ENROLL);
                setEventValue("drawExecutionTime", "");
                setEventValue("isWinner", true);
                setEventValue("prizeType", PrizeType.TV_COIN);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.FINISHED_ENROLL_FOR_TVCOIN_PRIZE, 'FINISHED_ENROLL_FOR_TVCOIN_PRIZE 확인');
            });

            test('FINISHED_ENROLL_FOR_COUPON_PRIZE status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.IN_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);
                setEventValue("enrollStatus", EnrollStatusType.FINISHED_ENROLL);
                setEventValue("drawExecutionTime", "");
                setEventValue("isWinner", true);
                setEventValue("prizeType", PrizeType.COUPON);

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.FINISHED_ENROLL_FOR_COUPON_PRIZE, 'FINISHED_ENROLL_FOR_COUPON_PRIZE 확인');
            });

            test('FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.IN_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);
                setEventValue("enrollStatus", EnrollStatusType.FINISHED_ENROLL);
                setEventValue("drawExecutionTime", "");
                setEventValue("isWinner", true);
                setEventValue("prizeType", PrizeType.MANUAL);
                setEventValue("isCollectPhoneNumberForPrize", true);
                setEventValue("prizeReceiptStatus", PrizeReceiptStatus.RECEIPT_UN_CONFIRM);


                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                console.log(TotalEventStateManager.isConfirmForReceiptPrize())
                deepEqual(eventStatusValues, EventStatusValues.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO, 'FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO 확인');
            });

            test('FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.IN_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);
                setEventValue("enrollStatus", EnrollStatusType.FINISHED_ENROLL);
                setEventValue("drawExecutionTime", "");
                setEventValue("isWinner", true);
                setEventValue("prizeType", PrizeType.MANUAL);
                setEventValue("isCollectPhoneNumberForPrize", false);
                /*testValue.prizeType = "0";
                 testValue.isCollectPhoneNumberForPrize = false;
                 testValue.winConfirmStatus = "0";
                 testValue.prizeReceiptStatus = "0";*/

                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO, 'FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO 확인');
            });

            test('FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO status 테스트 ', function() {
                setEventValue("eventType", EventType.STAMP_EVENT);
                setEventValue("status", EventStatusType.IN_PROGRESS);
                setEventValue("isCollectPhoneNumberForEnroll", false);
                setEventValue("actionEndTime", "2016-03-21 23:59:59");
                setEventValue("entryPoint", EntryType.PLAY);
                setEventValue("enrollStatus", EnrollStatusType.FINISHED_ENROLL);
                setEventValue("drawExecutionTime", "");
                setEventValue("isWinner", true);
                setEventValue("prizeType", PrizeType.MANUAL);
                setEventValue("isCollectPhoneNumberForPrize", true);
                setEventValue("prizeReceiptStatus", PrizeReceiptStatus.RECEIPT_CONFIRM);


                var eventStatusValues = TotalEventStateManagerTest(getEvent(), getEnrollReservationInfo(), isShowWinner(), getEntryPoint());
                //console.log(TotalEventStateManager.isForcedClose())
                deepEqual(eventStatusValues, EventStatusValues.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO, 'FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO 확인');
            });


        };
        return {run: run}
    }
);