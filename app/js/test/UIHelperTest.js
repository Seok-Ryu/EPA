

"use strict";
define(
    ['helper/UIHelper', 'helper/StructureHelper'],
    function(UIHelper, StructureHelper) {
        var run = function() {
            test('숫자 3자리 마다 콤마 테스트.', function() {
                equal(UIHelper.addThousandSeparatorCommas(1000), "1,000", '3자리 콤마 확인');
                equal(UIHelper.addThousandSeparatorCommas(1000000), "1,000,000", '6자리 콤마 확인');
            });
            test('event state class Name 테스트.', function() {
                var event = {eventId:"abc", title:"6번이벤트", eventType:0, description:"1번이벤트라능",
                    isAutoEnroll: false, status : 10, imageUrl:"resources/images/img_sam01.png",
                    closeBtnRedirectCategoryId:"123456",
                    enrollActionType:0, isCollectPhoneNumberForEnroll: true,
                    drawExecutionTime: "2019-01-01 00:00:01",
                    subscriberEnrollInfo:
                    {totalEnrollCount:0, totalEnrollPrice:0,enrollStatus:"0",isWinner:false}};
                var rappingEvent = StructureHelper.createEventStructure({'event':event}).event;

                equal(UIHelper.getEventStateClassName(rappingEvent), "", '예상 이벤트상태는 -');

                rappingEvent.jsonObject.subscriberEnrollInfo.jsonObject.enrollStatus = "2";
                equal(UIHelper.getEventStateClassName(rappingEvent), "join", '예상 이벤트상태는 join');


                rappingEvent.jsonObject.status = 30;
                equal(UIHelper.getEventStateClassName(rappingEvent), "notify", '예상 이벤트상태는 notify');

                rappingEvent.jsonObject.status = 80;
                equal(UIHelper.getEventStateClassName(rappingEvent), "end", '예상 이벤트상태는 end');

                rappingEvent.jsonObject.subscriberEnrollInfo.jsonObject.enrollStatus = "9";
                equal(UIHelper.getEventStateClassName(rappingEvent), "enter", '예상 이벤트상태는 enter');

                /*rappingEvent.jsonObject.drawExecutionTime = "2000-01-01 00:00:00";
                equal(UIHelper.getEventStateClassName(rappingEvent), "nowin", '예상 이벤트상태는 nowin');*/


                rappingEvent.jsonObject.subscriberEnrollInfo.jsonObject.isWinner = true;
                equal(UIHelper.getEventStateClassName(rappingEvent), "win", '예상 이벤트상태는 win');





            });
            test('핸드폰 번호 표시(-) 테스트.', function() {
                equal(UIHelper.hyphenPhoneNumber("0102223456"), "010-222-3456", '핸드폰 번호(-) 표시 확인');
            });
        };
        return {run: run}
    }
);