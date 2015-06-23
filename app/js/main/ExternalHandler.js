define(["service/STBInfoManager", "service/EPAInfoManager", "cca/customType/EntryType", "cca/DefineView", "cca/PopupValues"], function (STBInfoManager, EPAInfoManager, EntryType, DefineView, PopupValues) {
    var ExternalHandler = {};
    var appService = null;
    var externalAPI = null

    ExternalHandler.initialize = function () {
        appService = window.EPABase.EPAService;
        externalAPI = window.cssWrapper;
        externalAPI.setHandler(ExternalHandler);
    }

    ExternalHandler.setStatusInfoHandler = function(data) {
        console.info('setSTBInfoHandler');
        if(data != null) {
            STBInfoManager.initialize(data);
        }
        appService.requestTerminalKey();
        externalAPI.resStatusInfo({ "terminalKey": EPAInfoManager.getTerminalKey(), "appVersion": EPAInfoManager.getVersion() });
    }

    ExternalHandler.moveRequestHandler = function(data) {
        console.info('moveRequestHandler');
        /* 파라미터 (연동 정의서 참고) -> 현재 EVENT 만 사용 중임 */
        ExternalHandler.notiXPushInfoClear(ExternalHandler.XPUSH_EVENT_ENROLL);
        var menuId = data.menuId;
        switch (menuId) {
            case ExternalHandler.TO_MAIN_LIST:
                appService.startEPAMenu(data);
                break;
            case ExternalHandler.TO_DETAIL:
                appService.startEPADetail(data);
                break;
            case ExternalHandler.TO_DETAIL_FROM_PLAY:
                data.entryPoint = EntryType.PLAY;
                appService.startEPADetail(data);
                break;
            default :
                var param = {
                    targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                    targetView: DefineView.ALERT_DIALOG,
                    popupValue: PopupValues.MOVE_REQUEST_ERROR};
                param.popupValue.subMessage += menuId;
                appService.startMoveRequestError(param);
                break;
        }
    }

    ExternalHandler.activateNumberKeys = function(isUse) {
        var data = {};
        data.numKeyUse = isUse ? "on" : "off";

        console.info('activateNumberKeys : ' + isUse);
        externalAPI.notiKeyInfo(data);
    }

    /**
     * {assetId:value}, {"categoryId" : "value"}, {"productId" : "value", "goodId" : "value", "categoryId" : "value"}, {"productId" : "value", "categoryId" : "value"}, {"categoryId" : "value"}, {"bundleProductId" : "value"}
     * @param redirectType
     * @param data
     */
    ExternalHandler.redirectToVOD = function (data) {
        console.info('redirectToVOD')
        console.log(data);

        externalAPI.reqLaunchCSApp(data);
    }

    ExternalHandler.redirectToAsset = function (assetId) {
        var data = {};
        data.menuId = ExternalHandler.REDIRECT_ASSET;
        data.assetId = assetId;
        ExternalHandler.redirectToVOD(data);
    }

    ExternalHandler.redirectToCategory = function (categoryId) {
        var data = {};
        data.menuId = ExternalHandler.REDIRECT_CATEGORY;
        data.categoryId = categoryId;
        ExternalHandler.redirectToVOD(data);
    }

    ExternalHandler.redirectToSVOD = function (productId, categoryId) {
        var data = {};
        data.menuId = ExternalHandler.REDIRECT_SVOD_PRODUCT;
        data.productId = productId;
        data.categoryId = categoryId;

        ExternalHandler.redirectToVOD(data);
    }

    ExternalHandler.redirectToSVODPackage = function (productId, categoryId) {
        var data = {};
        data.menuId = ExternalHandler.REDIRECT_SVOD_PACKAGE_PRODUCT;
        data.productId = productId;
        data.categoryId = categoryId;

        ExternalHandler.redirectToVOD(data);
    }

    ExternalHandler.redirectToPackage = function (categoryId) {
        var data = {};
        data.menuId = ExternalHandler.REDIRECT_PACKAGE_PRODUCT;
        data.categoryId = categoryId;

        ExternalHandler.redirectToVOD(data);
    }

    ExternalHandler.redirectToBundle = function (bundleProductId) {
        var data = {};
        data.menuId = ExternalHandler.REDIRECT_BUNDLE_PRODUCT;
        data.productId = bundleProductId;

        ExternalHandler.redirectToVOD(data);
    }

    ExternalHandler.exitEPA = function (action) {
        console.info('exitEPA : ' + action);
        var data = {};
        data.action = action ? action : "exit";
        externalAPI.reqHideUI(data);
    }


    function runThirdApp(srcID) {
        var data = {};
        data.srcId = srcID;
        console.info('runThirdApp : ' + data.srcId);
        //cssInterface.notiLaunchApp(data);
    }

    ExternalHandler.xPushInfo = function (type, eventId) {
        console.info('xPushInfo type is ' + type + " //" + eventId);
        var data = {};
        data.service = type;
        data.serviceId = eventId;

        externalAPI.reqXPushInfoConfirmed(data);
    };

    ExternalHandler.notiXPushInfoClear = function (type) {
        console.info('notiXPushInfoClear type is ' + type);
        var data = {};
        data.service = type;

        externalAPI.notiXPushInfoClear(data);
    };


    ExternalHandler.REDIRECT_ASSET = "304";
    ExternalHandler.REDIRECT_CATEGORY = "400";
    ExternalHandler.REDIRECT_SVOD_PRODUCT = "1053";
    ExternalHandler.REDIRECT_SVOD_PACKAGE_PRODUCT = "1055";
    ExternalHandler.REDIRECT_PACKAGE_PRODUCT = "306";
    ExternalHandler.REDIRECT_BUNDLE_PRODUCT = "305";

    ExternalHandler.TO_MAIN_LIST = "9100";
    ExternalHandler.TO_DETAIL = "9101";
    ExternalHandler.TO_DETAIL_FROM_PLAY = "9102";

    ExternalHandler.XPUSH_EVENT_ENROLL = "EVENT";
    ExternalHandler.XPUSH_COUPON = "COUPON";
    ExternalHandler.XPUSH_NOTICE = "NOTICE";


    return ExternalHandler;
});