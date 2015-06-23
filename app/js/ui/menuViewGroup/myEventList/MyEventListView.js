define(["framework/View", "framework/event/CCAEvent", "service/Communicator", "cca/DefineView",
    "ui/menuViewGroup/myEventList/MyEventListDrawer", "ui/menuViewGroup/myEventList/MyEventListModel",
    "service/STBInfoManager", "cca/customType/EntryType", "cca/PopupValues"],
    function (View, CCAEvent, Communicator, DefineView, MyEventListDrawer, MyEventListModel,
              STBInfoManager, EntryType, PopupValues) {

        var VERTICAL_VISIBLE_LIST_COUNT = 8;
        var _this = this;

        var MyEventListView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        }
        MyEventListView.prototype = Object.create(View.prototype);
        MyEventListView.prototype.onInitialize = function () {
            this.model = new MyEventListModel();
            this.drawer = new MyEventListDrawer(this.getID(), this.model);
        }
        MyEventListView.prototype.onStart = function (param) {
            _this = this;
            this.model.setFocusedPortalListSize(param.focusedPortalListSize);
            this.model.setIsWithActive(param.isWithActive);

            addEventListener();
        }


        MyEventListView.prototype.onRequestData = function () {
            var startItemIndex = 0;
            requestGetMyEventList(startItemIndex);
        }

        MyEventListView.prototype.onSetData = function (param) {

        }

        MyEventListView.prototype.onActive = function () {
            if(this.model.isNullData()) {
                sendFinishViewEvent();
            }
        };

        MyEventListView.prototype.onResume = function (param) {
            if(param != null) {
                resumeProcess(param);
            } else {
                this.active();
            }
        };

        MyEventListView.prototype.onShowForCloud = function () {
            _this.drawer.drawForCloud();
        };

        MyEventListView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            switch (keyCode) {
                case tvKey.KEY_UP:
                    _this.keyNavigator.keyUp();
                    _this.drawer.update();
                    break;
                case tvKey.KEY_DOWN:
                    _this.keyNavigator.keyDown();
                    _this.drawer.update();
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
        };

        function resumeProcess(param) {
            var popupId = param.popupId;

            var resultLabel = param.result;
            var buttonLabels = window.EPABase.StringSources.ButtonLabel;

            switch (popupId) {
                case PopupValues.EXIT_MENU.popupId:
                    if(buttonLabels.CONFIRM == resultLabel) {
                        sendFinishViewGroupViewEvent();
                    } else {
                        _this.active();
                    }
                    break;
            }
        }

        function requestGetMyEventList(startItemIndex) {
            var eventProfile = 3;
            Communicator.requestGetMyEventList(callbackForRequestGetMyEventList, eventProfile, startItemIndex);
        }

        function callbackForRequestGetMyEventList(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                initializeModel(response.portalEventList);
                _this.model.setTotalCount(response.totalCount);
                _this.startDrawer();
                if(_this.model.isWithActive()) {
                    _this.active();
                }
            } else {
                if(_this.model.isWithActive()) {
                    sendFinishViewEvent();
                }
                var param = {
                    targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                    targetView: DefineView.ALERT_DIALOG,
                    popupValue: PopupValues.SYSTEM_ERROR
                };
                _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
            }
        }

        function initializeModel(eventList) {
            var model = _this.model;

            var verticalVisibleSize = VERTICAL_VISIBLE_LIST_COUNT;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = eventList ? eventList.length : 0;
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setRotate(true, false);
            model.setData(eventList);
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

        function sendFinishViewGroupViewEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        function sendChangeViewGroupEvent() {
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, getParamObjectForViewChangeEvent());
        }

        function sendChangeViewGroupToAlertDialog(popupValue) {
            var param = {
                targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                targetView: DefineView.ALERT_DIALOG,
                popupValue: popupValue};
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
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

        return MyEventListView;
    });
