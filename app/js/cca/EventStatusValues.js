define(['resources/strings/ko'], function(StringValues) {

    var EventStatusValues = {};


    EventStatusValues.BEFORE_ENROLL = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.BEFORE_ENROLL.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.BEFORE_ENROLL.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.EVENT_TARGET_CONTENT, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.LACKED_PRIZE = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.LACKED_PRIZE.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.LACKED_PRIZE.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.FORCED_CLOSE = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.FORCED_CLOSE.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.FORCED_CLOSE.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.EXPIRED_CLOSE = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.EXPIRED_CLOSE.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.EXPIRED_CLOSE.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.READY_ENROLL_WITH_PRIVATE_INFO = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITH_PRIVATE_INFO.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITH_PRIVATE_INFO.SUB,
        textFieldButtonLabel : StringValues.ButtonLabel.START_EVENT,
        hasButtonOnTextField : true,
        buttonLabelList : [StringValues.ButtonLabel.EVENT_TARGET_CONTENT, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.READY_ENROLL_WITHOUT_PRIVATE_INFO = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITHOUT_PRIVATE_INFO.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITHOUT_PRIVATE_INFO.SUB,
        textFieldButtonLabel : StringValues.ButtonLabel.START_EVENT,
        hasButtonOnTextField : true,
        buttonLabelList : [StringValues.ButtonLabel.EVENT_TARGET_CONTENT, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.IN_ENROLL = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.IN_ENROLL.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.IN_ENROLL.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.ENROLLED_CONTENT, StringValues.ButtonLabel.EVENT_TARGET_CONTENT, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.FINISHED_ENROLL_BEFORE_DRAW_TIME = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_BEFORE_DRAW_TIME.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_BEFORE_DRAW_TIME.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.ENROLLED_CONTENT, StringValues.ButtonLabel.CLOSE]
    };


    EventStatusValues.FINISHED_ENROLL_FOR_LOSER_TO_DRAW = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_LOSER_TO_DRAW.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_LOSER_TO_DRAW.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.ENROLLED_CONTENT, StringValues.ButtonLabel.SHOW_WINNER, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.FINISHED_ENROLL_FOR_TVCOIN_PRIZE = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_TVCOIN_PRIZE.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_TVCOIN_PRIZE.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.ENROLLED_CONTENT, StringValues.ButtonLabel.SHOW_WINNER, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.FINISHED_ENROLL_FOR_COUPON_PRIZE = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_COUPON_PRIZE.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_COUPON_PRIZE.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.ENROLLED_CONTENT, StringValues.ButtonLabel.SHOW_WINNER, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO.SUB,
        textFieldButtonLabel : StringValues.ButtonLabel.RECEIVE_PRIZE,
        hasButtonOnTextField : true,
        buttonLabelList : [StringValues.ButtonLabel.ENROLLED_CONTENT, StringValues.ButtonLabel.SHOW_WINNER, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO.SUB,
        textFieldButtonLabel : null,
        hasButtonOnTextField : false,
        buttonLabelList : [StringValues.ButtonLabel.ENROLLED_CONTENT, StringValues.ButtonLabel.SHOW_WINNER, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO.SUB,
        textFieldButtonLabel : StringValues.ButtonLabel.CONFIRM_ENROLL,
        hasButtonOnTextField : true,
        buttonLabelList : [StringValues.ButtonLabel.EVENT_TARGET_CONTENT, StringValues.ButtonLabel.CLOSE]
    };

    EventStatusValues.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO = {
        textFieldTitle : StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO.TITLE,
        textFieldSubTitle : StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO.SUB,
        textFieldButtonLabel : StringValues.ButtonLabel.CONFIRM_ENROLL,
        hasButtonOnTextField : true,
        buttonLabelList : [StringValues.ButtonLabel.EVENT_TARGET_CONTENT, StringValues.ButtonLabel.CLOSE]
    };

    return EventStatusValues;
});
