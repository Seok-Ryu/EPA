define(['resources/strings/ko'], function(StringValues) {

    var PopupValues = {};


    PopupValues.SYSTEM_ERROR = {
        popupId : "systemError",
        iconType : "warning",
        title : StringValues.POPUP_INFO.SYSTEM_ERROR.TITLE,
        subTitle : StringValues.POPUP_INFO.SYSTEM_ERROR.SUBTITLE,
        message : StringValues.POPUP_INFO.SYSTEM_ERROR.MESSAGE,
        subMessage : StringValues.POPUP_INFO.SYSTEM_ERROR.SUB_MESSAGE,

        buttonLabelList : [StringValues.ButtonLabel.CONFIRM]
    };

    PopupValues.RETRY_UNABLE_SYSTEM_ERROR = {
        popupId : "retryUnableSystemError",
        iconType : "warning",
        title : StringValues.POPUP_INFO.RETRY_UNABLE_SYSTEM_ERROR.TITLE,
        subTitle : StringValues.POPUP_INFO.RETRY_UNABLE_SYSTEM_ERROR.SUBTITLE,
        message : StringValues.POPUP_INFO.RETRY_UNABLE_SYSTEM_ERROR.MESSAGE,
        subMessage : StringValues.POPUP_INFO.RETRY_UNABLE_SYSTEM_ERROR.SUB_MESSAGE,

        buttonLabelList : [StringValues.ButtonLabel.CONFIRM]
    };

    PopupValues.COMPLETE_AGREEMENT = {
        popupId : "completeAgreement",
        iconType : "info",
        title : StringValues.POPUP_INFO.COMPLETE_AGREEMENT.TITLE,
        subTitle : StringValues.POPUP_INFO.COMPLETE_AGREEMENT.SUBTITLE,
        message : StringValues.POPUP_INFO.COMPLETE_AGREEMENT.MESSAGE,
        subMessage : StringValues.POPUP_INFO.COMPLETE_AGREEMENT.SUB_MESSAGE,

        buttonLabelList : [StringValues.ButtonLabel.CONFIRM]
    };

    PopupValues.REFUSE_ENROLL = {
        popupId : "refuseEnroll",
        iconType : "warning",
        title : StringValues.POPUP_INFO.REFUSE_ENROLL.TITLE,
        subTitle : StringValues.POPUP_INFO.REFUSE_ENROLL.SUBTITLE,
        message : StringValues.POPUP_INFO.REFUSE_ENROLL.MESSAGE,
        subMessage : StringValues.POPUP_INFO.REFUSE_ENROLL.SUB_MESSAGE,

        buttonLabelList : [StringValues.ButtonLabel.CONFIRM]
    };

    PopupValues.NOTIFICATION_WINNER = {
        popupId : "notificationWinner",
        iconType : "notice",
        title : StringValues.POPUP_INFO.NOTIFICATION_WINNER.TITLE,
        subTitle : StringValues.POPUP_INFO.NOTIFICATION_WINNER.SUBTITLE,
        message : StringValues.POPUP_INFO.NOTIFICATION_WINNER.MESSAGE,
        subMessage : StringValues.POPUP_INFO.NOTIFICATION_WINNER.SUB_MESSAGE,

        buttonLabelList : [StringValues.ButtonLabel.CONFIRM, StringValues.ButtonLabel.CANCEL]
    };

    PopupValues.SERVICE_ERROR = {
        popupId : "serviceError",
        iconType : "warning",
        title : StringValues.POPUP_INFO.SERVICE_ERROR.TITLE,
        subTitle : StringValues.POPUP_INFO.SERVICE_ERROR.SUBTITLE,
        message : StringValues.POPUP_INFO.SERVICE_ERROR.MESSAGE,
        subMessage : StringValues.POPUP_INFO.SERVICE_ERROR.SUB_MESSAGE,

        buttonLabelList : [StringValues.ButtonLabel.CONFIRM]
    };

    PopupValues.MOVE_REQUEST_ERROR = {
        popupId : "moveRequestError",
        iconType : "warning",
        title : StringValues.POPUP_INFO.MOVE_REQUEST_ERROR.TITLE,
        subTitle : StringValues.POPUP_INFO.MOVE_REQUEST_ERROR.SUBTITLE,
        message : StringValues.POPUP_INFO.MOVE_REQUEST_ERROR.MESSAGE,
        subMessage : StringValues.POPUP_INFO.MOVE_REQUEST_ERROR.SUB_MESSAGE,

        buttonLabelList : [StringValues.ButtonLabel.CONFIRM]
    };

    PopupValues.EXIT_MENU = {
        popupId : "exitMenu",
        iconType : "info",
        title : StringValues.POPUP_INFO.EXIT_MENU.TITLE,
        subTitle : StringValues.POPUP_INFO.EXIT_MENU.SUBTITLE,
        message : StringValues.POPUP_INFO.EXIT_MENU.MESSAGE,
        subMessage : StringValues.POPUP_INFO.EXIT_MENU.SUB_MESSAGE,

        buttonLabelList : [StringValues.ButtonLabel.CONFIRM, StringValues.ButtonLabel.CANCEL]
    };

    return PopupValues;
});
