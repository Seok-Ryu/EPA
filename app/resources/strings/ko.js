define(function () {
    var StringValues = {};

    StringValues.agreeRegulation = "개인정보 수집 동의";
    StringValues.collectPhoneNumber = "휴대폰 전화번호 입력";
    StringValues.confirmCollectPhoneNumber = "휴대폰 전화번호 확인";

    StringValues.enrolledEvent = "응모 완료";
    StringValues.availableEventToEnroll = "참여가능";


    StringValues.ButtonLabel = {};
    StringValues.ButtonLabel.CONFIRM = "확인";
    StringValues.ButtonLabel.CANCEL = "취소";
    StringValues.ButtonLabel.CLOSE = "닫기";
    StringValues.ButtonLabel.RESET = "재입력";
    StringValues.ButtonLabel.AGREE = "동의";

    StringValues.ButtonLabel.SHOW_WINNER = "당첨자 목록";
    StringValues.ButtonLabel.ENROLLED_CONTENT = "참여한 콘텐츠";
    StringValues.ButtonLabel.ENROLL = "응모";
    StringValues.ButtonLabel.START_EVENT = "시작하기";
    StringValues.ButtonLabel.EVENT_TARGET_CONTENT = "추천 목록";
    StringValues.ButtonLabel.RECEIVE_PRIZE = "경품 받기";
    StringValues.ButtonLabel.CONFIRM_ENROLL = "결과 확인하기";

    StringValues.POPUP_INFO = {};
    StringValues.POPUP_INFO.SYSTEM_ERROR = {};
    StringValues.POPUP_INFO.SYSTEM_ERROR.TITLE = "알림";
    StringValues.POPUP_INFO.SYSTEM_ERROR.SUBTITLE = "";
    StringValues.POPUP_INFO.SYSTEM_ERROR.MESSAGE = "시스템 장애 또는 통신장애 입니다.</br>잠시 후 다시 이용해 주세요";
    StringValues.POPUP_INFO.SYSTEM_ERROR.SUB_MESSAGE = "";

    StringValues.POPUP_INFO.RETRY_UNABLE_SYSTEM_ERROR = {};
    StringValues.POPUP_INFO.RETRY_UNABLE_SYSTEM_ERROR.TITLE = "알림";
    StringValues.POPUP_INFO.RETRY_UNABLE_SYSTEM_ERROR.SUBTITLE = "";
    StringValues.POPUP_INFO.RETRY_UNABLE_SYSTEM_ERROR.MESSAGE = "시스템 장애 또는 통신장애 입니다";
    StringValues.POPUP_INFO.RETRY_UNABLE_SYSTEM_ERROR.SUB_MESSAGE = "고객행복센터에 문의해 주세요</br>고객행복센터(1855-1000)";


    StringValues.POPUP_INFO.COMPLETE_AGREEMENT = {};
    StringValues.POPUP_INFO.COMPLETE_AGREEMENT.TITLE = "이벤트 응모 동의 완료";
    StringValues.POPUP_INFO.COMPLETE_AGREEMENT.SUBTITLE = "";
    StringValues.POPUP_INFO.COMPLETE_AGREEMENT.MESSAGE = "이벤트 응모를 위한 휴대폰 번호가</br>안전하게 저장되었습니다";
    StringValues.POPUP_INFO.COMPLETE_AGREEMENT.SUB_MESSAGE = "";

    StringValues.POPUP_INFO.REFUSE_ENROLL = {};
    StringValues.POPUP_INFO.REFUSE_ENROLL.TITLE = "알림";
    StringValues.POPUP_INFO.REFUSE_ENROLL.SUBTITLE = "";
    StringValues.POPUP_INFO.REFUSE_ENROLL.MESSAGE = "이벤트 참여가 제한됩니다";
    StringValues.POPUP_INFO.REFUSE_ENROLL.SUB_MESSAGE = "무료쿠폰을 사용하여 구매하신 경우</br>이벤트 참여가 불가능합니다";

    StringValues.POPUP_INFO.NOTIFICATION_WINNER = {};
    StringValues.POPUP_INFO.NOTIFICATION_WINNER.TITLE = "이벤트 결과 확인";
    StringValues.POPUP_INFO.NOTIFICATION_WINNER.SUBTITLE = "";
    StringValues.POPUP_INFO.NOTIFICATION_WINNER.MESSAGE = "참여한 이벤트의 결과를 확인해주세요";
    StringValues.POPUP_INFO.NOTIFICATION_WINNER.SUB_MESSAGE = "[확인하기]버튼을 선택하면</br>응모하신 이벤트의 결과와 경품 확인이 가능합니다";

    StringValues.POPUP_INFO.SERVICE_ERROR = {};
    StringValues.POPUP_INFO.SERVICE_ERROR.TITLE = "알림";
    StringValues.POPUP_INFO.SERVICE_ERROR.SUBTITLE = "";
    StringValues.POPUP_INFO.SERVICE_ERROR.MESSAGE = "현재 이용 불가능한 서비스입니다";
    StringValues.POPUP_INFO.SERVICE_ERROR.SUB_MESSAGE = "고객행복센터에 문의해 주세요</br>고객행복센터(1855-1000)";

    StringValues.POPUP_INFO.MOVE_REQUEST_ERROR = {};
    StringValues.POPUP_INFO.MOVE_REQUEST_ERROR.TITLE = "알림";
    StringValues.POPUP_INFO.MOVE_REQUEST_ERROR.SUBTITLE = "";
    StringValues.POPUP_INFO.MOVE_REQUEST_ERROR.MESSAGE = "잘못된 파라미터 입니다.";
    StringValues.POPUP_INFO.MOVE_REQUEST_ERROR.SUB_MESSAGE = "Your Request menuId is = ";

    StringValues.POPUP_INFO.EXIT_MENU = {};
    StringValues.POPUP_INFO.EXIT_MENU.TITLE = "서비스 전환";
    StringValues.POPUP_INFO.EXIT_MENU.SUBTITLE = "";
    StringValues.POPUP_INFO.EXIT_MENU.MESSAGE = "이벤트 확인을 종료하고</br>다른 서비스로 이동하시겠습니까?";
    StringValues.POPUP_INFO.EXIT_MENU.SUB_MESSAGE = "";

    StringValues.DETAIL_TEXT_FIELD = {};
    StringValues.DETAIL_TEXT_FIELD.BEFORE_ENROLL = {};
    StringValues.DETAIL_TEXT_FIELD.BEFORE_ENROLL.TITLE = "이벤트에 참여하세요!";
    StringValues.DETAIL_TEXT_FIELD.BEFORE_ENROLL.SUB = "'참여 방법'에 따라 원하는 콘텐츠를 시청하시고, 아래 추천목록도 참고하세요!";

    StringValues.DETAIL_TEXT_FIELD.LACKED_PRIZE = {};
    StringValues.DETAIL_TEXT_FIELD.LACKED_PRIZE.TITLE = "종료된 이벤트입니다.";
    StringValues.DETAIL_TEXT_FIELD.LACKED_PRIZE.SUB = "준비된 상품이 모두 소진되어 이벤트를 종료합니다. 참여해주셔서 감사합니다.";

    StringValues.DETAIL_TEXT_FIELD.FORCED_CLOSE = {};
    StringValues.DETAIL_TEXT_FIELD.FORCED_CLOSE.TITLE = "종료된 이벤트입니다.";
    StringValues.DETAIL_TEXT_FIELD.FORCED_CLOSE.SUB = "부득이한 사정으로 인하여 이벤트 진행이 종료되었습니다. 불편을 드려 죄송합니다.";

    StringValues.DETAIL_TEXT_FIELD.EXPIRED_CLOSE = {};
    StringValues.DETAIL_TEXT_FIELD.EXPIRED_CLOSE.TITLE = "종료된 이벤트입니다.";
    StringValues.DETAIL_TEXT_FIELD.EXPIRED_CLOSE.SUB = "이벤트 진행이 종료되어 더 이상 이벤트에 참여하실 수 없습니다.";

    StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITH_PRIVATE_INFO = {};
    StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITH_PRIVATE_INFO.TITLE = "이벤트 목표를 달성해 보세요!";
    StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITH_PRIVATE_INFO.SUB = "'시작하기' 버튼 선택 시 개인정보 수집이 진행됩니다. <br>수집된 개인정보는 이벤트 당첨자 확인 및 경품 지급을 위한 목적으로만 사용됩니다.";

    StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITHOUT_PRIVATE_INFO = {};
    StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITHOUT_PRIVATE_INFO.TITLE = "이벤트 목표를 달성해 보세요!";
    StringValues.DETAIL_TEXT_FIELD.READY_ENROLL_WITHOUT_PRIVATE_INFO.SUB = "'시작하기' 버튼 선택 시, 구매 내역이 반영됩니다.";

    StringValues.DETAIL_TEXT_FIELD.IN_ENROLL = {};
    StringValues.DETAIL_TEXT_FIELD.IN_ENROLL.TITLE = "이벤트 목표를 달성해 보세요!";
    StringValues.DETAIL_TEXT_FIELD.IN_ENROLL.SUB = "'참여 방법'에 따라 원하는 콘텐츠를 시청하시고, 아래 추천목록도 참고하세요!",

    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_BEFORE_DRAW_TIME = {};
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_BEFORE_DRAW_TIME.TITLE = "응모완료! 이벤트 결과를 확인하세요! ";
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_BEFORE_DRAW_TIME.SUB = " 이후 확인 가능합니다.";

    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_LOSER_TO_DRAW = {};
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_LOSER_TO_DRAW.TITLE = "아쉽지만 다음 기회에 도전하세요!";
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_LOSER_TO_DRAW.SUB = "";

    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_TVCOIN_PRIZE = {};
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_TVCOIN_PRIZE.TITLE = "축하합니다! TV코인 당첨! ";
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_TVCOIN_PRIZE.SUB = "TV코인 충전 내역에서 확인 가능합니다.";

    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_COUPON_PRIZE = {};
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_COUPON_PRIZE.TITLE = "축하합니다! 쿠폰 당첨! ";
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_COUPON_PRIZE.SUB = "쿠폰 내역에서 확인 가능합니다.";

    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO = {};
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO.TITLE = "축하합니다! ";
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO.SUB = "'경품 받기' 버튼 선택 시, 개인정보 수집이 진행됩니다. <br>당첨일로부터 7일 이내에 개인정보 수집에 동의하지 않는 경우 경품 지급이 취소될 수 있습니다.";

    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO = {};
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO.TITLE = "축하합니다! ";
    StringValues.DETAIL_TEXT_FIELD.FINISHED_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO.SUB = "경품 수령 방법 등 자세한 내역은 <br>등록하신 전화번호로 개별 안내됩니다.";

    StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO = {};
    StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO.TITLE = "응모완료! 이벤트 응모 결과를 확인하세요!";
    StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITH_PRIVATE_INFO.SUB = "'결과 확인 하기' 버튼 선택 시 개인정보 수집이 진행됩니다. <br>수집된 개인정보는 이벤트 당첨자 확인 및 경품 지급을 위한 목적으로만 사용됩니다.";

    StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO = {};
    StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO.TITLE = "응모완료! 이벤트 응모 결과를 확인하세요!";
    StringValues.DETAIL_TEXT_FIELD.NEED_CONFIRM_ENROLL_FOR_MANUAL_PRIZE_WITHOUT_PRIVATE_INFO.SUB = "'결과 확인 하기' 버튼 선택하시면 이벤트 응모 결과를 확인하실 수 있습니다.";

    StringValues.POPUP_TEXT_FIELD = {};
    StringValues.POPUP_TEXT_FIELD.AGREE_REGULATION = {};
    StringValues.POPUP_TEXT_FIELD.AGREE_REGULATION.TITLE = "개인정보 수집 및 이용에 동의하시겠습니까?";
    StringValues.POPUP_TEXT_FIELD.AGREE_REGULATION.SUB = "수집된 개인정보는 위와 같은 목적으로만 사용됩니다.";

    StringValues.POPUP_TEXT_FIELD.CONLLECT_PHONENUMBER = {};
    StringValues.POPUP_TEXT_FIELD.CONLLECT_PHONENUMBER.TITLE = "이벤트 응모를 위한 개인정보 수집 동의를<br>위해 휴대폰 번호를 입력해주세요.";

    StringValues.POPUP_TEXT_FIELD.CONFIRM_COLLECT_PHONENUMBER = {};
    StringValues.POPUP_TEXT_FIELD.CONFIRM_COLLECT_PHONENUMBER.TITLE = "입력하신 휴대폰 번호가";
    StringValues.POPUP_TEXT_FIELD.CONFIRM_COLLECT_PHONENUMBER.SUB = "이(가) 맞습니까?";
    return StringValues;
});
