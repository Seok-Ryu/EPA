define(["framework/View", "framework/event/CCAEvent", "service/Communicator", "cca/DefineView",
    "ui/menuViewGroup/portalMenuList/PortalMenuListDrawer", "ui/menuViewGroup/portalMenuList/PortalMenuListModel",
    "service/EPAInfoManager", "cca/PopupValues", "cca/type/PortalMenuType"],
    function (View, CCAEvent, Communicator, DefineView, PortalMenuListDrawer, PortalMenuListModel, EPAInfoManager, PopupValues, PortalMenuType) {

        var VERTICAL_VISIBLE_LIST_COUNT = 7;
        var _this = this;
        var changeFocusEventTimer = null;

        var PortalMenuListView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        }
        PortalMenuListView.prototype = Object.create(View.prototype);
        PortalMenuListView.prototype.onInitialize = function () {
            this.model = new PortalMenuListModel();
            this.drawer = new PortalMenuListDrawer(this.getID(), this.model);

            this.BLOCK_TIME_FOR_CHANGE_FOCUS = EPAInfoManager.getCategoryKeyBlockTime();
        }
        PortalMenuListView.prototype.onStart = function (param) {
            _this = this;
        }


        PortalMenuListView.prototype.onRequestData = function () {
            Communicator.requestGetPortalMenuList(callbackForRequestGetPortalMenuList);
        }

        PortalMenuListView.prototype.onSetData = function (param) {

        }

        PortalMenuListView.prototype.onBeforeStop = function () {

        }
        PortalMenuListView.prototype.onResume = function (param) {
            if(param != null) {
                resumeProcess(param);
            } else {
                this.active();
            }
        }

        PortalMenuListView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            switch (keyCode) {
                case tvKey.KEY_UP:
                    _this.keyNavigator.keyUp();
                    _this.drawer.update();
                    sendChangeFocusEventWithDelay();
                    break;
                case tvKey.KEY_DOWN:
                    _this.keyNavigator.keyDown();
                    _this.drawer.update();
                    sendChangeFocusEventWithDelay();
                    break;
                case tvKey.KEY_LEFT:
                case tvKey.KEY_BACK:
                case tvKey.KEY_EXIT:
                case tvKey.KEY_ESC:
                case tvKey.KEY_X:
                    cancelToLastChangeFocusEvent();
                    //sendFinishViewEvent();
                    sendChangeViewGroupToAlertDialog(PopupValues.EXIT_MENU);
                    break;
                case tvKey.KEY_RIGHT:
                case tvKey.KEY_ENTER:
                    if(!isBlockTime()) {
                        sendChangeViewEvent();
                    }
                    break;
                default:
                    break;
            }
        }


        function sendChangeViewEvent() {
            _this.sendEvent(CCAEvent.CHANGE_VIEW, getParamObjectForViewChangeEvent());

        }

        function sendChangeFocusEventWithDelay() {
            cancelToLastChangeFocusEvent();
            changeFocusEventTimer = setTimeout(function() {
                sendNotificationToChangeIndex();
                changeFocusEventTimer = null;
            }, _this.BLOCK_TIME_FOR_CHANGE_FOCUS);
        }


        function sendNotificationToChangeIndex(isWithActive) {
            _this.sendEvent(CCAEvent.NOTIFICATION_TO_CHANGE_INDEX, getParamObjectForFocusChangeEvent(isWithActive));
        }

        function sendFinishViewEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEW);
        }

        function sendFinishViewGroupEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        function sendChangeViewGroupToAlertDialog(popupValue) {
            var param = {
                targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                targetView: DefineView.ALERT_DIALOG,
                popupValue: popupValue};
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
        }

        function cancelToLastChangeFocusEvent() {
            if(isBlockTime()) {
                clearTimeout(changeFocusEventTimer);
                changeFocusEventTimer = null;
            }
        }

        function isBlockTime() {
            return changeFocusEventTimer != null;
        }

        function callbackForRequestGetPortalMenuList(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                initializeModel(response.portalMenuList);
                _this.startDrawer();
                _this.drawer.setInVisibleMode();
                sendNotificationToChangeIndex();
            } else {
                var param = {
                    targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                    targetView: DefineView.ALERT_DIALOG,
                    popupValue: PopupValues.RETRY_UNABLE_SYSTEM_ERROR
                };
                _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
            }
        }

        function initializeModel(portalMenuList) {
            var model = _this.model;

            var verticalVisibleSize = VERTICAL_VISIBLE_LIST_COUNT;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = portalMenuList ? portalMenuList.length : 0;
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setRotate(true, false);
            model.setData(portalMenuList);
        }

        function getParamObjectForFocusChangeEvent(isWithActive) {
            var model = _this.model;
            var param = {};
            //param.vIndex = model.getVIndex();
            //param.vStartIndex = model.getVStartIndex();
            param.focusedPortalMenuId = model.getVFocusedItem().getMenuId();
            param.focusedPortalMenuType = model.getVFocusedItem().getType();
            param.focusedPortalListSize = model.getVFocusedItem().getListSize();
            if(isWithActive == true) {
                param.isWithActive = isWithActive;
            }

            return param;
        }

        function getParamObjectForViewChangeEvent() {
            var param = {};
            //targetView:DefineView.EVENT_LIST_VIEW
            return param;
        }

        function moveFocusToMyEvent() {
            var currentPortalMenuType = _this.model.getVFocusedItem().getType();
            if(PortalMenuType.MY_EVENT == currentPortalMenuType) {
                _this.update();
                _this.deActive();
                var isWithActive = true;
                sendNotificationToChangeIndex(isWithActive);
            } else {
                _this.keyNavigator.keyDown();
                moveFocusToMyEvent();
            }
        }

        function resumeProcess(param) {
            var popupId = param.popupId;

            var resultLabel = param.result;
            var buttonLabels = window.EPABase.StringSources.ButtonLabel;

            switch (popupId) {
                case PopupValues.NOTIFICATION_WINNER.popupId:
                    if(buttonLabels.CONFIRM == resultLabel) {
                        moveFocusToMyEvent();
                    } else {
                        _this.active();
                    }
                    break;
                case PopupValues.SERVICE_ERROR.popupId:
                case PopupValues.SYSTEM_ERROR.popupId:
                    _this.active();
                    break;
                case PopupValues.RETRY_UNABLE_SYSTEM_ERROR.popupId:
                    sendFinishViewEvent();
                    break;
                case PopupValues.EXIT_MENU.popupId:
                    if(buttonLabels.CONFIRM == resultLabel) {
                        sendFinishViewEvent();
                    } else {
                        sendChangeFocusEventWithDelay();
                        _this.active();
                    }
                    break;
            }
        }

        return PortalMenuListView;
    });
