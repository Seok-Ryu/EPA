define(["framework/ViewGroup", "framework/event/CCAEvent",
        "cca/SubEvent", "cca/DefineView",
        "service/Communicator", "service/STBInfoManager",
        "ui/menuViewGroup/portalMenuList/PortalMenuListView", "ui/menuViewGroup/eventList/EventListView", "ui/menuViewGroup/myEventList/MyEventListView", "ui/menuViewGroup/listTest/ListTestView",
        "ui/menuViewGroup/clock/ClockView",
        "helper/DrawerHelper", "cca/type/PortalMenuType", "cca/PopupValues"
    ],
    function (ViewGroup, CCAEvent, SubEvent, DefineView,
              Communicator, STBInfoManager,
              PortalMenuListView, EventListView, MyEventListView, ListTestView, ClockView,
              DrawerHelper, PortalMenuType, PopupValues) {

        var _this = null;
        var portalMenuListView = null;
        var eventListView = null;
        var myEventListView = null;
        var clockView = null;
        var listTestView = null;

        var uncheckedWinEventCount = -1;
        var currentSubView = null;
        var MAXIMUM_RETRY_COUNT = 3;
        var retryCount = 0;
        var isStartFlag = false;

        // 종료팝업에서 이전으로 되 돌아 오기 위한 설정값(사이드 이팩트의 최소화를 위해 currentSubView는 수정하지 않음)
        var isPortalMenuListView = true;

        var MenuViewGroupManager = function (id) {
            ViewGroup.call(this, id);
            _this = this;
            this.onInitialize();
        };

        MenuViewGroupManager.prototype = Object.create(ViewGroup.prototype);

        MenuViewGroupManager.prototype.onInitialize = function () {
            portalMenuListView = new PortalMenuListView(DefineView.PORTAL_MENU_LIST_VIEW);
            eventListView = new EventListView(DefineView.EVENT_LIST_VIEW);
            myEventListView = new MyEventListView(DefineView.MY_EVENTL_LIST_VIEW);
            clockView = new ClockView(DefineView.CLOCK_VIEW);
            listTestView = new ListTestView("testView");
            addEventListener();
        };

        MenuViewGroupManager.prototype.onStart = function (param) {
            isStartFlag = true;
            startViewGroup(param);
        };

        MenuViewGroupManager.prototype.onStop = function () {
            clockView.stop();
        };

        MenuViewGroupManager.prototype.onHide = function () {
            portalMenuListView.hide();

        };

        MenuViewGroupManager.prototype.onShow = function () {
            portalMenuListView.show();
        };

        MenuViewGroupManager.prototype.onUpdate = function () {

        };

        MenuViewGroupManager.prototype.onPause = function () {
            clockView.pause();
        };

        MenuViewGroupManager.prototype.onResume = function (param) {
            if(isExitMenu(param)){
                if(isPortalMenuListView)
                    portalMenuListView.resume(param);
                else {
                    if(currentSubView) {
                        currentSubView.resume(param);
                    } else {
                        portalMenuListView.resume(param);
                    }
                }

            } else if(isFromNotificationWinner(param)) {
                portalMenuListView.resume(param);
            } else {
                if(currentSubView) {
                    currentSubView.resume(param);
                } else {
                    portalMenuListView.resume(param);
                }
            }
        };

        function addEventListener() {
            removeEventListener();
            $(portalMenuListView).bind(CCAEvent.CHANGE_VIEW, portalMenuListChangeViewListener);
            $(portalMenuListView).bind(CCAEvent.NOTIFICATION_TO_CHANGE_INDEX, portalMenuListChangeFocusListener);
            $(portalMenuListView).bind(CCAEvent.FINISH_VIEW, portalMenuListFinishViewListener);
            $(portalMenuListView).bind(CCAEvent.CHANGE_VIEWGROUP, eventListChangeViewGroupListener);

            $(eventListView).bind(CCAEvent.FINISH_VIEW, eventListFinishViewListener);
            $(eventListView).bind(CCAEvent.COMPLETE_TO_DRAW_VIEW, eventListCompleteDrawListener);
            $(eventListView).bind(CCAEvent.CHANGE_VIEWGROUP, eventListChangeViewGroupListener);
            $(eventListView).bind(CCAEvent.FINISH_VIEWGROUP, eventListFinishViewGrpupListener);

            $(myEventListView).bind(CCAEvent.FINISH_VIEW, eventListFinishViewListener);
            $(myEventListView).bind(CCAEvent.COMPLETE_TO_DRAW_VIEW, eventListCompleteDrawListener);
            $(myEventListView).bind(CCAEvent.CHANGE_VIEWGROUP, eventListChangeViewGroupListener);
            $(myEventListView).bind(CCAEvent.FINISH_VIEWGROUP, eventListFinishViewGrpupListener);

            $(listTestView).bind(CCAEvent.FINISH_VIEW, eventListFinishViewListener);
            $(listTestView).bind(CCAEvent.COMPLETE_TO_DRAW_VIEW, eventListCompleteDrawListener);
            $(listTestView).bind(CCAEvent.FINISH_VIEWGROUP, eventListFinishViewGrpupListener);


        }

        function removeEventListener() {
            $(portalMenuListView).unbind();
            $(eventListView).unbind();
            $(myEventListView).unbind();
            $(listTestView).unbind();
        }

        function startViewGroup(param) {
            isPortalMenuListView = true;
            portalMenuListView.start();
            portalMenuListView.active();

            requestGetUncheckedWinEventCount();
        }

        function requestGetUncheckedWinEventCount() {
            uncheckedWinEventCount = -1;
            retryCount = 0;

            Communicator.requestGetUncheckedWinEventCount(callbackForRequestGetUncheckedWinEventCount);
        }

        function callbackForRequestGetUncheckedWinEventCount(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                uncheckedWinEventCount = response.totalCount;
            } else {
                uncheckedWinEventCount = 0;
            }
        }

        function getNextSubView(param) {
            var focusedPortalMenuType = param.focusedPortalMenuType;
            var nextSubView = null;
            switch (focusedPortalMenuType) {
                case PortalMenuType.ALL_EVENT:
                case PortalMenuType.RECOMMEND_EVENT:
                case PortalMenuType.EVENT:
                    nextSubView = eventListView;
                    break;
                case PortalMenuType.MAIN:
                    break;
                case PortalMenuType.NOTICE:
                    nextSubView = listTestView;
                    break;
                case PortalMenuType.MY_EVENT:
                    nextSubView = myEventListView;
                    break;
                default  :
                    nextSubView = eventListView;
                    break;
            }

            return nextSubView;
        }

        function portalMenuListChangeFocusListener(event, param) {
            currentSubView = getNextSubView(param);
            currentSubView.start(param);
        }

        function portalMenuListChangeViewListener(event, param) {
            isPortalMenuListView = false;
            portalMenuListView.deActive();
            currentSubView.active();
        }

        function eventListFinishViewListener(event, param) {
            isPortalMenuListView = true;
            currentSubView.deActive();
            portalMenuListView.active();
        }

        function eventListFinishViewGrpupListener(event, param) {
            currentSubView.deActive();
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP, param);
        }

        function eventListCompleteDrawListener(event, param) {
            portalMenuListView.show();
            currentSubView.showForCloud();

            if(isStartFlag) {
                isStartFlag = false;
                clockView.start();
                checkUnConfirmedWinEvent();
            }
        }

        function checkUnConfirmedWinEvent() {
            if(isSuccessGetUncheckedWinEventCount()) {
                if (uncheckedWinEventCount > 0) {
                    showNotificationWinner();
                }
            } else if(retryCount < MAXIMUM_RETRY_COUNT) {
                retryCount += 1;
                setTimeout(function() {
                    checkUnConfirmedWinEvent();
                }, 200);
            }
        }

        function showNotificationWinner() {
            isPortalMenuListView = false;
            var param = {
                targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                targetView: DefineView.ALERT_DIALOG,
                popupValue: PopupValues.NOTIFICATION_WINNER
            };

            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
        }

        function isSuccessGetUncheckedWinEventCount () {
            return uncheckedWinEventCount != -1;
        }

        function eventListChangeViewGroupListener(event, param) {
            if(isChangeToErrorPopup(param)) {
                processBeforeChangeErrorPopup();
            }

            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
        }

        function portalMenuListFinishViewListener(event, param) {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP, param);

        }

        function processBeforeChangeErrorPopup() {
            portalMenuListView.show();
            if(currentSubView) {
                currentSubView.showForCloud();
            }
            if(isStartFlag) {
                isStartFlag = false;
                clockView.start();
            }
        }

        function isChangeToErrorPopup(param) {
            return param.targetView != null && param.targetView == DefineView.ALERT_DIALOG && (PopupValues.SYSTEM_ERROR == param.popupValue );
        }

        function isFromNotificationWinner(param) {
            if(param != null && param.popupId != null) {
                if(PopupValues.NOTIFICATION_WINNER.popupId == param.popupId) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        function isExitMenu(param) {
            if(param != null && param.popupId != null) {
                if(PopupValues.EXIT_MENU.popupId == param.popupId) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        return MenuViewGroupManager;
    });