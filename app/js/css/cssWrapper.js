/*
    @version : 150409 [by JayJin @ 2015-04-09 21:33:31]
    @release note
    1.cssWrapper.reqXPushInfoConfirmed() 추가

*/
var cssWrapper = (function(){

    var api = {};
    var externalHandler = null;

    api.setHandler = function(handler) {
        externalHandler = handler;
    }
    /****************************************************************/
    // STB to WebApp Request start
    /**
     * 최초 접속시 STB이 보내주는 정보
     * @param data
        {
            "mac" : "value",
            "STBId" : "value",
            "SOCode" : "value",
            "subscriberId" : "value",
            "smartCardId" : "value",
            "adultCheckType" : "value",
            "currentParentalRating" : "value",
            "isSimplePurchaseOn" : "value",
            "isVODMobilePurchaseOn" : "value",
            "isSeriesPlayOn" : "value",
            "isB2B" : "value",
            "STBModel" : "value",
            "terminalKey" : "value"
        }
     * @returns {*}
     */
    api.onReqStatusInfo = function(data){
        // 이벤트 포털에서 StatusInfo를 받아 처리해야 하는 로직 구현
        console.log(data);
        externalHandler.setStatusInfoHandler(data);

    };

    /**
     * 이벤트 포털이 이동해야 할 페이지를 STB가 보내주는 정보
     * @param data 9100:메인 페이지, 9101:상세 페이지, 9102:상세 페이지(asset type)
        {
            "menuId" : "9100",
            "assetId" : "value",
            "eventId" : "value"
        }
     * @returns {*}
     */
    api.onReqMove = function(data) {
        // 이벤트 포털에서 화면을 띄울 때 처리해야 하는 로직 구현
        console.log(data);
        externalHandler.moveRequestHandler(data);
    };
    // STB to WebApp Request end
    /****************************************************************/



    /****************************************************************/
    // WebApp to STB Response start
    /**
     * STB StatusInfo를 받은 후 터미널키 인증을 요청하여 성공하면 STB로 터미널키와 앱 버전을 보낸다.
     * @param data
        {
            "terminalKey":"value",
            "appVersion":"value"
        }
     * @returns {*}
     */
    api.resStatusInfo = function(data) {
        if (data == null || data.terminalKey == null || data.appVersion == null)
            return false;

        return cssApi.isTV ? cssApi.resStatusInfo(data) : true;
    };
    // WebApp to STB Response end
    /****************************************************************/



    /****************************************************************/
    // WebApp to STB Request start
    /**
     * 이벤트 포털에서 CS UI 화면으로 이동한다.
     * @param data 케이스별 필요한 파라메터가 변동됨
        {
            "menuId":"value", // 필수
            "assetId":"value",
            "productId":"value",
            "categoryId":"value"
        }
     * @returns {*}
     */
    api.reqLaunchCSApp = function(data) {
        if (data == null || data.menuId == null)
            return false;

        return cssApi.isTV ? cssApi.reqLaunchCSApp(data) : true;
    };

    /**
     * 이벤트 포털 접속을 종료한다.
     * @param data
        {
            "action":"exit"
        }
     * @returns {*}
     */
    api.reqHideUI = function(data) {
        if (data == null || data.action == null)
            return false;

        return cssApi.isTV ? cssApi.reqHideUI(data) : true;
    };

    /**
     * XPush 데이터를 전송한다.
     * @param data
        {
            "service":"value",  쿠폰:TYPE_COUPON, 이벤트:TYPE_EVENT, 공지: TYPE_NOTICE
            "serviceId":"value" 쿠폰ID, 이벤트ID, 공지ID
        }
     * @returns {*}
     */
    api.reqXPushInfoConfirmed = function(data) {
        if (data == null || data.service == null)
            return false;

        return cssApi.isTV ? cssApi.reqXPushInfoConfirmed(data) : true;
    };

    // WebApp to STB Request end
    /****************************************************************/



    /****************************************************************/
    // WebApp to STB Notification start
    /**
     * keyInfo 숫자키 사용여부를 STB에 전송한다.
     * @param data on:사용, off:비사용
        {
            "numKeyUse":"on"
        }
     * @returns {*}
     */
    api.notiKeyInfo = function(data) {
        if (data == null)
            return false;

        return cssApi.isTV ? cssApi.notiKeyInfo(data) : true;
    };

    /**
     * XPush 데이터 삭제를 요청한다.
     * @param data
        {
            "service":"value",
        }
     * @returns {*}
     */
    api.notiXPushInfoClear = function(data) {
        console.log('notiXPushInfoClear:', data);
        if (data == null || data.service == null)
            return false;

        return cssApi.isTV ? cssApi.notiXPushInfoClear(data) : true;
    };

    // WebApp to STB Notification end
    /****************************************************************/

    return api;

})();