/**
 * 일자를 계산하는 경우 사용
 */
define(function() {
    var DateHelper = {};

    var DATE_FORMAT_DD = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/; //YYYY-MM-DD HH:MM:SS
    var DATE_FORMAT_WITHOUT_SECOND = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/; //YYYY-MM-DD HH:MM
    var DATE_FORMAT_DDD = /(\d{4})-(\d{2})-(\d{3}) (\d{2}):(\d{2}):(\d{2})/; //YYYY-MM-DDD HH:MM:SS
    var week = new Array('일', '월', '화', '수', '목', '금', '토');

    DateHelper.getCurrentTime = function () {
        // yyyy-MM-dd HH:mm:ss
        var date = new Date();

        return DateHelper.getDateTime(date);
    }

    DateHelper.getCurrentDate = function () {
        var date = new Date();
        var dateString = leadingZeros(date.getFullYear(), 4) + '-' + leadingZeros(date.getMonth() + 1, 2) + '-' + leadingZeros(date.getDate(), 2);
        return dateString;
    }

    /**
     *
     * @param date 자바스크립트 Date 객체
     * @returns {string}
     */
    DateHelper.getDateTime = function (date) {
        var timeStamp = leadingZeros(date.getFullYear(), 4) + '-' + leadingZeros(date.getMonth() + 1, 2) + '-' + leadingZeros(date.getDate(), 2)
            + ' ' +
            leadingZeros(date.getHours(), 2) + ':' + leadingZeros(date.getMinutes(), 2) + ':' + leadingZeros(date.getSeconds(), 2);

        return timeStamp;
    };
    DateHelper.leadingZeros = function (number, digits) {
        return leadingZeros(number, digits);
    }

    function leadingZeros(number, digits) {
        var zero = '';
        number = number.toString();

        if (number.length < digits) {
            for ( var i = 0; i < digits - number.length; i++) {
                zero += '0';
            }
        }
        return zero + number;
    }

    // 상영시간
    DateHelper.getMinuteByRunningTime = function(runningTime) {
        var returnMinute = "";
        if (runningTime != null && runningTime.length > 0) {
            var intervalIndex_hour = runningTime.indexOf(":");
            var hour = Number(runningTime.substring(0, intervalIndex_hour));
            var minute = Number(runningTime.substring(intervalIndex_hour + 1));
            returnMinute = (hour * 60) + minute;
        }
        return returnMinute;
    };

    DateHelper.getReleaseDate = function (releaseDate) {
        return releaseDate.split(' ')[0].replace(/-/gi, '.');
    }

    DateHelper.getTimeStringbySecond = function(_seconds) {
        var hours = parseInt(_seconds / 3600);
        var mins = parseInt(parseInt(_seconds / 60) % parseInt(60));
        var seconds = _seconds - (hours * 3600 + mins * 60);
        hours = leadingZeros(hours, 2);
        mins = leadingZeros(mins, 2);
        seconds = leadingZeros(seconds, 2);
//		return hours + ":" + mins + ":" + seconds;
        return [hours, mins, seconds];
    };

    DateHelper.getDateObject = function(dateString) {
        var dateObject = new Date(dateString);
    	return dateObject;
    }


    DateHelper.getDateWeekTimeString = function(dateString) {
    	var date = DateHelper.getDateObject(dateString);
    	var dateWeek = leadingZeros(date.getMonth()+1,2)+"월 "+leadingZeros(date.getDate(),2)+"일 ("+DateHelper.getDayOfWeek(date)+")";
        var hour = leadingZeros(date.getHours(),2);
    	var min = leadingZeros(date.getMinutes(),2);
    	return dateWeek +" "+ hour +":"+ min;
    }

    DateHelper.getDateHourMinuteString = function(dateString) {
        var date = DateHelper.getDateObject(dateString);
        var day = leadingZeros(date.getMonth()+1,2)+"월 "+leadingZeros(date.getDate(),2)+"일 ";
        var hour = leadingZeros(date.getHours(),2);
        var min = leadingZeros(date.getMinutes(),2);
        return day +" "+ hour +":"+ min;
    }

	DateHelper.getDateString = function(dateString) {
		var reggie = /(\d{4})-(\d{2})-(\d{2})/; //YYYYMMDD
    	var dateArray = reggie.exec(dateString);
    	return (dateArray[1])+"년 "+(dateArray[2])+"월 "+(dateArray[3])+"일";
	}

    DateHelper.addDateStringCommas = function(dateString) {
        var reggie = DATE_FORMAT_DD;
        var dateArray = reggie.exec(dateString);
        if(dateArray == null) {
            reggie = DATE_FORMAT_WITHOUT_SECOND;
            dateArray = reggie.exec(dateString);
        }

        return (dateArray[1])+"."+(dateArray[2])+"."+(dateArray[3]);
    }

	DateHelper.getDateWeekString = function(dateString) {
        var date = DateHelper.getDateObject(dateString);
        var dateWeek = leadingZeros(date.getMonth()+1,2)+"월 "+leadingZeros(date.getDate(),2)+"일 ("+DateHelper.getDayOfWeek(date)+")";
        return dateWeek;
    }

    DateHelper.getDateWeekAPMTimeString = function(dateString) {

        var date = DateHelper.getDateObject(dateString);
        var dateWeek = leadingZeros(date.getMonth()+1,2)+"월 "+leadingZeros(date.getDate(),2)+"일 ("+DateHelper.getDayOfWeek(date)+")";
        var hour = (date.getHours() <= 12) ? "AM "+leadingZeros(date.getHours(),2) :"PM "+leadingZeros(date.getHours()-12,2);
        //var hour = leadingZeros(date.getHours(),2);
        var min = leadingZeros(date.getMinutes(),2);
        return dateWeek +" "+ hour +":"+ min;
    }

    DateHelper.getDayOfWeek = function(date) {
        var day = date.getDay(); //일요일=0,월요일=1,...,토요일=6

        return week[day];
    }

    // 구매시 시청가능 기간
    DateHelper.getViewablePeriodText = function(viewablePeriod) {
        var intervalIndex = viewablePeriod.indexOf(" ");
        var intervalIndex_hour = viewablePeriod.indexOf(":");
        var viewablePeriodString = "";
        if (intervalIndex > 9 && intervalIndex < 12) {
            var year = parseInt(viewablePeriod.substring(0, 4));
            if (year > 0) {
                viewablePeriodString += year + "년";
            }
            var month = parseInt(viewablePeriod.substring(5, 7));
            if (month > 0) {
                viewablePeriodString += month + "월";
            }
            var day = parseInt(viewablePeriod.substring(8, intervalIndex));
            if (day > 0) {
                viewablePeriodString += day + "일";
            }
            var hour = parseInt(viewablePeriod.substring(intervalIndex + 1, intervalIndex_hour));
            if (hour > 0) {
                viewablePeriodString += hour + "시간";
            }
            var minute = parseInt(viewablePeriod.substring(intervalIndex_hour + 1, intervalIndex_hour + 3));
            if (minute > 0) {
                viewablePeriodString += minute + "분";
            }
        }
        return viewablePeriodString;
    };


    DateHelper.getRentalPeriod = function(duration, unit) {
        var now = new Date();
        var korUnit = "";
        switch(unit) {
            case 0:
                korUnit = " 시";
                break;
            case 1:
                korUnit = " 일";
                break;
            case 2:
                korUnit = " 주";
                break;
            case 3:
                korUnit = " 개월";
                break;
            case 4:
                korUnit = " 년";
                break;
            default:
                break;
        };
        return duration + korUnit;
    };

    DateHelper.getRentalEndDate = function (duration, unit) {
        var now = new Date();
        switch(unit) {
            case 0:
                now.setHours(now.getHours() + duration);
                break;
            case 1:
                now.setDate(now.getDate() + duration);
                break;
            case 2:
                now.setDate(now.getDate() + duration*7);
                break;
            case 3:
                now.setMonth(now.getMonth() + duration);
                break;
            case 4:
                now.setFullYear(now.getFullYear() + duration);
                break;
            default:
                break;
        };
        return now.toISOString().split('T')[0];
    }

    DateHelper.isPassedTime = function (targetTime) {
        var currentTime = $.now();
        var targetTime = DateHelper.getDateObject(targetTime).getTime();

        return targetTime <= currentTime;
    }


    return DateHelper;
});
