define(["framework/View", "framework/event/CCAEvent", "service/Communicator", "cca/DefineView",
    "ui/menuViewGroup/eventList/EventListDrawer", "ui/menuViewGroup/eventList/EventListModel",
    "service/STBInfoManager",
    "cca/type/PortalMenuType", "cca/customType/EntryType", "cca/PopupValues", "helper/ListRequestHelper"],
    function (View, CCAEvent, Communicator, DefineView, EventListDrawer, EventListModel, STBInfoManager, PortalMenuType, EntryType, PopupValues, ListRequestHelper) {

        var RECOMMEND_EVENT_VERTICAL_VISIBLE_LIST_COUNT = 3;
        var ALL_EVENT_VERTICAL_VISIBLE_LIST_COUNT = 4;

        var _this = this;
        var isFirstTime = true;

        var EventListView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        }
        EventListView.prototype = Object.create(View.prototype);
        EventListView.prototype.onInitialize = function () {
            this.model = new EventListModel();
            this.drawer = new EventListDrawer(this.getID(), this.model);
        }
        EventListView.prototype.onStart = function (param) {
            _this = this;
            isFirstTime = true;

            this.model.setFocusedPortalMenuId(param.focusedPortalMenuId);
            this.model.setFocusedPortalMenuType(param.focusedPortalMenuType);
            this.model.setFocusedPortalListSize(param.focusedPortalListSize);

            addEventListener();
        }

        EventListView.prototype.onRequestData = function () {
            var startItemIndex = 0;
            var pageSize = 1;
            //requestGetPortalEventList(startItemIndex);
            requestGetPortalEventList(callbackForRequestGetPortalEventList, startItemIndex, pageSize);
        }

        EventListView.prototype.onSetData = function (param) {

        }

        EventListView.prototype.onResume = function (param) {
            if(param != null) {
                resumeProcess(param);
            } else {
                this.active();
            }
        }

        EventListView.prototype.onActive = function () {
            if(this.model.isNullData()) {
                sendFinishViewEvent();
            }
        }
        EventListView.prototype.onShowForCloud = function () {
            _this.drawer.drawForCloud();
        }

        EventListView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            switch (keyCode) {
                case tvKey.KEY_UP:
                    _this.keyNavigator.keyUp();
                    //_this.drawer.update();
                    ListRequestHelper.afterMoveIndex();

                    break;
                case tvKey.KEY_DOWN:
                    _this.keyNavigator.keyDown();
                    //_this.drawer.update();
                    ListRequestHelper.afterMoveIndex();
                    break;
                case tvKey.KEY_LEFT:
                case tvKey.KEY_BACK:
                case tvKey.KEY_ESC:
                    sendFinishViewEvent();
                    break;
                case tvKey.KEY_EXIT:
                case tvKey.KEY_X:
                    sendChangeViewGroupToAlertDialog(PopupValues.EXIT_MENU);
                    break;
                case tvKey.KEY_ENTER:
                    sendChangeViewGroupEvent();
                    break;
                default:
                    break;
            }
        }

        function addEventListener() {
            removeEventListener();
            $(_this.drawer).bind(CCAEvent.COMPLETE_TO_DRAW_VIEW, sendCompleteDrawEvent);
        }

        function removeEventListener() {
            $(_this.drawer).unbind();
        }

        function sendCompleteDrawEvent() {
            _this.sendEvent(CCAEvent.COMPLETE_TO_DRAW_VIEW);
        }

        function sendFinishViewEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEW);
        }

        function sendChangeViewGroupToAlertDialog(popupValue) {
            var param = {
                targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                targetView: DefineView.ALERT_DIALOG,
                popupValue: popupValue};
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
        }

        function sendFinishViewGroupEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        function sendChangeViewGroupEvent() {
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, getParamObjectForViewChangeEvent());
        }

        function getParamObjectForViewChangeEvent() {
            var param = {
                targetViewGroup: DefineView.DETAIL_VIEWGROUP_MANAGER,
                targetView: DefineView.EVENT_DETAIL_VIEW,
                eventId: _this.model.getVFocusedItem().getEventID(),
                entryPoint: EntryType.EVENT_LIST
            };

            return param;
        }

        function requestGetPortalEventList(callbackFunction, startItemIndex, pageSize) {
            //var subscriberId = STBInfoManager.getSubscribeId();
            //var soId = STBInfoManager.getSoId();
            //var modelName = STBInfoManager.getModelName();
            var eventProfile = 3;
            var portalMenuId = _this.model.getFocusedPortalMenuId();
            var indexRotation = 1;
            //getVerticalVisibleSize();
            Communicator.requestGetPortalEventList(callbackFunction, portalMenuId, eventProfile, startItemIndex, pageSize, indexRotation);
        }

        function callbackForRequestGetPortalEventList(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                _this.model.setTotalCount(response.totalCount);
                initializeModel();
                ListRequestHelper.setInformation(_this.model.getTotalCount(), _this.model.getFocusedPortalListSize(), requestGetPortalEventList, _this.model, "portalEventList", afterRequest, true);
                ListRequestHelper.run();
            } else {
                changeToErrorPopup();
            }
        }

        function afterRequest(isSuccess) {
            if(isSuccess) {
                if(isFirstTime){
                    isFirstTime =false;
                    _this.startDrawer();
                } else {
                    _this.drawer.update();
                }
            } else {
                changeToErrorPopup();
            }
        }

        function changeToErrorPopup() {
            var param = {
                targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                targetView: DefineView.ALERT_DIALOG,
                popupValue: PopupValues.SYSTEM_ERROR
            };
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
        }

        function initializeModel() {
            var model = _this.model;

            var verticalVisibleSize = _this.model.getFocusedPortalListSize();//getVerticalVisibleSize();
            var horizonVisibleSize = 1;
            var verticalMaximumSize = _this.model.getTotalCount();
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setRotate(true, false);
            //model.setData(eventList);
        }

        function getVerticalVisibleSize() {
            var model = _this.model;
            var menuType = model.getFocusedPortalMenuType();

            switch (menuType) {
                case PortalMenuType.ALL_EVENT:
                    return ALL_EVENT_VERTICAL_VISIBLE_LIST_COUNT;
                case PortalMenuType.RECOMMEND_EVENT:
                    return RECOMMEND_EVENT_VERTICAL_VISIBLE_LIST_COUNT;
                default :
                    return RECOMMEND_EVENT_VERTICAL_VISIBLE_LIST_COUNT;
            }

        }

        function resumeProcess(param) {
            var popupId = param.popupId;

            var resultLabel = param.result;
            var buttonLabels = window.EPABase.StringSources.ButtonLabel;

            switch (popupId) {
                case PopupValues.EXIT_MENU.popupId:
                    if(buttonLabels.CONFIRM == resultLabel) {
                        sendFinishViewGroupEvent();
                    } else {
                        _this.active();
                    }
                    break;
            }
        }

        return EventListView;
    });
