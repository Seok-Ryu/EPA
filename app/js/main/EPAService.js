define(["framework/utils/TaskManager", "framework/event/CCAEvent", 'cca/SubEvent',
        'main/ExternalHandler',
        'service/STBInfoManager', "service/EPAInfoManager", "service/Communicator",
        "cca/DefineView",
        "ui/menuViewGroup/MenuViewGroupManager", "ui/popupViewGroup/PopupViewGroupManager", "ui/detailViewGroup/DetailViewGroupManager",
        "cca/customType/EntryType", "cca/PopupValues"
    ],
    function (TaskManager, CCAEvent, SubEvent, ExternalHandler, STBInfoManager, EPAInfoManager, Communicator, DefineView,
              MenuViewGroupManager, PopupViewGroupManager, DetailViewGroupManager,
              EntryType, PopupValues) {
        //@ 객체를 생성하여 사용할 객체는 function 으로 정의함. this로 내부 메소드 접근

        var EPAService = function () {

            var menuViewGroupManager = null;
            var detailViewGroupManager = null;
            var popupViewGroupManager = null;

            var _this = this;

            this.initialize = function () {
                console.info("EPAService, initialize");
                console.info("EPAService, Version " + EPAInfoManager.getVersion());
                console.info("JQuery version : " + ($().jquery)); //1.9.1

                //뷰 초기화
                menuViewGroupManager = new MenuViewGroupManager(DefineView.MENU_VIEWGROUP_MANAGER);
                detailViewGroupManager = new DetailViewGroupManager(DefineView.DETAIL_VIEWGROUP_MANAGER);
                popupViewGroupManager = new PopupViewGroupManager(DefineView.POPUP_VIEWGROUP_MANAGER);
                addEventListener();
                preload();
            }

            function addEventListener() {
                $(menuViewGroupManager).bind(CCAEvent.FINISH_VIEWGROUP, viewGroupFinishListener);
                $(menuViewGroupManager).bind(CCAEvent.CHANGE_VIEWGROUP, menuViewGroupChangeGroupListener);

                $(detailViewGroupManager).bind(CCAEvent.FINISH_VIEWGROUP, viewGroupFinishListener);
                $(detailViewGroupManager).bind(CCAEvent.COMPLETE_TO_DRAW_VIEW, detailViewGroupCompleteDrawListener);
                $(detailViewGroupManager).bind(CCAEvent.CHANGE_VIEWGROUP, detailViewGroupChangeListener);
                $(detailViewGroupManager).bind(CCAEvent.FINISH_APP, appFinishListener);

                $(popupViewGroupManager).bind(CCAEvent.FINISH_VIEWGROUP, viewGroupFinishListener);
                $(popupViewGroupManager).bind(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, viewGroupFinishListener);
            }


            function preload() {
                var imageFileNameList = 'resources/imageList.json';
                //$.getJSON(imageFileNameList, callBackForLoadImageFileNameList);
            }

            function callBackForLoadImageFileNameList(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].filename != null) {
                        var url = 'resources/images/' + data[i].filename;
                        preloadImage(url);
                    }
                }
            }

            function preloadImage(url) {
                try {
                    var _img = new Image();
                    _img.src = url;
                } catch (e) {
                    //console.error(e)
                }
            }

            function beforeStart() {
                /*if(STBInfoManager.hasAllNecessaryInformation()) {
                 var isSuccess = _this.requestTerminalKey();
                 if (isSuccess) {
                 clearTask();
                 }
                 }*/
                clearTask();
            }

            this.requestTerminalKey = function () {
                EPAInfoManager.initTerminalKey();
                Communicator.requestTerminalKey(function (response) {
                    if (Communicator.isSuccessResponseFromHAS(response)) {
                        EPAInfoManager.setTerminalKey(response.terminalKey);
                    } else {
                        EPAInfoManager.setTerminalKeyResultCode(response.resultCode);
                    }
                });
                return hasTerminalKey();
            }

            function hasTerminalKey() {
                return EPAInfoManager.getTerminalKey().length > 0;
            }

            this.startEventPortal = function (param) {
                /*var entryType = param.entryType;
                 switch (entryType) {
                 case "banner":
                 break;
                 case "main":
                 break;
                 case "vod":
                 break;
                 }*/
                var eventId = param.eventId;

                if (eventId != null && eventId.length > 0) {
                    var assetId = param.assetId;
                    if (assetId != null && assetId.length > 0) {
                        param.entryPoint = EntryType.PLAY;
                    }
                    this.startEPADetail(param);
                } else {
                    this.startEPAMenu(param);
                }
            }

            this.startEPAMenu = function (param) {
                beforeStart();
                if (hasTerminalKey()) {
                    menuViewGroupManager.start(param);
                } else {
                    failToStart();
                }
            }


            this.startEPADetail = function (param) {
                beforeStart();
                if (hasTerminalKey()) {
                    detailViewGroupManager.start(param);
                } else {
                    failToStart();
                }
            }

            this.startMoveRequestError = function (param) {
                beforeStart();
                if (hasTerminalKey()) {
                    popupViewGroupManager.start(param);
                } else {

                }
            }

            this.testStartPYJ = function (param) {
                beforeStart();
                if (hasTerminalKey()) {
                    popupViewGroupManager.testPYJ(param);
                    //menuViewGroupManager.start(param);
                    //detailView
                    // GroupManager.start(param);
                } else {

                }
            }

            function failToStart() {
                var param = {
                    targetView: DefineView.ALERT_DIALOG
                };
                if (!STBInfoManager.hasAllNecessaryInformation()) {
                    param.popupValue = PopupValues.SERVICE_ERROR;
                } else {
                    param.popupValue = PopupValues.RETRY_UNABLE_SYSTEM_ERROR;
                    param.popupValue.subMessage = "인증 실패 [" + EPAInfoManager.getTerminalKeyResultCode() + "]<br>" + param.popupValue.subMessage;
                }

                popupViewGroupManager.start(param);
            }


            //@Comment 외부로 부터 키이벤트를 받아서 분배
            this.onKeyDown = function (event) {
                if (!isKeyBlock(event)) {
                    //console.info("EPAService, onKeyDown : " + event.keyCode);
                    $(window).trigger(CCAEvent.SEND_KEYEVENT, event);
                    if (EPAInfoManager.needBlockToEnterKeyRepetition() && isEnterKey(event)) {
                        keyEventTimer = new Date();
                    }
                }
            }

            var keyEventTimer = null;

            function isKeyBlock(event) {
                if (EPAInfoManager.needBlockToEnterKeyRepetition() && isEnterKey(event) && keyEventTimer != null) {
                    var lastEventTime = keyEventTimer.getTime();
                    var currentEventTime = new Date().getTime();
                    return (currentEventTime - lastEventTime) < EPAInfoManager.getRepetitionEnterKeyBlockTime();
                } else {
                    return false;
                }
            }

            function isEnterKey(event) {
                return event.keyCode == window.TVKeyValue.KEY_ENTER;
            }

            function getTargetViewGroup(targetViewGroup) {
                if (DefineView.DETAIL_VIEWGROUP_MANAGER == targetViewGroup) {
                    return detailViewGroupManager;
                } else if (DefineView.POPUP_VIEWGROUP_MANAGER == targetViewGroup) {
                    return popupViewGroupManager
                } else if (DefineView.MENU_VIEWGROUP_MANAGER == targetViewGroup) {
                    return menuViewGroupManager;
                }
            }

            function viewGroupFinishListener(event, param) {
                var currentViewGroup = TaskManager.getLastHistoryWithRemove();
                var lastViewGroup = TaskManager.getLastHistory();

                if (lastViewGroup) {
                    console.log('currentViewGroup id : ' + currentViewGroup.getID());
                    console.log('lastViewGroup id : ' + lastViewGroup.getID());
                    currentViewGroup.stop();
                    lastViewGroup.resume(param);
                    lastViewGroup.show();

                } else {
                    console.info("backToEpgMode : ");
                    ExternalHandler.exitEPA();
                    currentViewGroup.stop();
                }
            }

            function appFinishListener(event, param) {
                console.info("appFinishListener : ");
                var currentViewGroup = TaskManager.getLastHistoryWithRemove();
                ExternalHandler.exitEPA();
                currentViewGroup.stop();
            }

            function clearTask() {
                while (TaskManager.getLastHistory()) {
                    TaskManager.getLastHistoryWithRemove().onStop();
                }
                TaskManager.clearTask();
            }

            function menuViewGroupChangeGroupListener(event, param) {
                var targetViewGroup = getTargetViewGroup(param.targetViewGroup);
                targetViewGroup.start(param);
            }

            function detailViewGroupChangeListener(event, param) {
                var targetViewGroup = getTargetViewGroup(param.targetViewGroup);

                if (param.targetViewGroup == DefineView.DETAIL_VIEWGROUP_MANAGER) {
                    TaskManager.getLastHistoryWithRemove();
                }

                targetViewGroup.start(param);
            }

            function detailViewGroupCompleteDrawListener() {
                var currentViewGroup = TaskManager.getLastHistoryWithRemove();
                var lastViewGroup = TaskManager.getLastHistory();

                if (lastViewGroup) {
                    lastViewGroup.pause();
                    lastViewGroup.hide();
                }

                TaskManager.addHistory(currentViewGroup);
            }
        }

        return EPAService;
    });
