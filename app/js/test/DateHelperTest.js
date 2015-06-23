

"use strict";
define(
    ['helper/DateHelper'],
    function(DateHelper) {
        var run = function() {
            test('지나간 시간인지 테스트', function() {
                var currentDate = new Date();
                currentDate.setSeconds(currentDate.getSeconds() - 1);

                var currentTimeString = DateHelper.getDateTime(currentDate);

                equal(DateHelper.isPassedTime("2015-01-01 23:59:59"), true, '오래 지난 시간 확인');
                equal(DateHelper.isPassedTime(currentTimeString), true, '1초 지난 시간 확인');

                equal(DateHelper.isPassedTime("2049-12-31 23:59:59"), false, '한참 남은 시간 확인');

                currentDate.setSeconds(currentDate.getSeconds() + 6);

                currentTimeString = DateHelper.getDateTime(currentDate);
                equal(DateHelper.isPassedTime(currentTimeString), false, '5초 남은 시간 확인');
            });
            test('날짜에 콤마 찍기 테스트', function() {
                equal(DateHelper.addDateStringCommas("2015-03-03 23:59:59"), "2015.03.03", '시간 값 버리고 날짜만 콤마찍히는가 확인');
            });
        };
        return {run: run}
    }
);