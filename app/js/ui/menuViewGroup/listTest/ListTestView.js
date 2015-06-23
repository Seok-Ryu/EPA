define(["framework/View", "framework/event/CCAEvent", "service/Communicator", "cca/DefineView",
    "ui/menuViewGroup/listTest/ListTestDrawer", "ui/menuViewGroup/listTest/ListTestModel",
    "service/STBInfoManager", "helper/ListRequestHelper", "cca/PopupValues"],
    function (View, CCAEvent, Communicator, DefineView, ListTestDrawer, ListTestModel,
              STBInfoManager, ListRequestHelper, PopupValues) {

        var VERTICAL_VISIBLE_LIST_COUNT = 8;
        var _this = this;

        var ListTestView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        }
        ListTestView.prototype = Object.create(View.prototype);
        ListTestView.prototype.onInitialize = function () {
            this.model = new ListTestModel();
            this.drawer = new ListTestDrawer(this.getID(), this.model);
        }
        ListTestView.prototype.onStart = function (param) {
            _this = this;
            addEventListener();
        }


        ListTestView.prototype.onRequestData = function () {
            var startItemIndex = 0;
            var pageSize = 1;

            //requestData(callbackForRequestGetAssetListByContentGroupId, startItemIndex, pageSize);
            requestData(callbackForRequestGetContentGroupList, startItemIndex, pageSize);
        }

        ListTestView.prototype.onSetData = function (param) {

        }

        ListTestView.prototype.onActive = function () {
            if(this.model.isNullData()) {
                sendFinishViewEvent();
            }
        }
        ListTestView.prototype.onResume = function (param) {
            if(param != null) {
                resumeProcess(param);
            } else {
                this.active();
            }
        }

        ListTestView.prototype.onShowForCloud = function () {
            _this.drawer.drawForCloud();
        }

        ListTestView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            switch (keyCode) {
                case tvKey.KEY_UP:
                    _this.keyNavigator.keyUp();
                    ListRequestHelper.afterMoveIndex();
                    break;
                case tvKey.KEY_DOWN:
                    _this.keyNavigator.keyDown();
                    ListRequestHelper.afterMoveIndex();
                    break;
                case tvKey.KEY_LEFT:
                case tvKey.KEY_BACK:
                case tvKey.KEY_ESC:
                case tvKey.KEY_EXIT:
                    sendFinishViewEvent();
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
                        sendFinishViewGroupEvent();
                    } else {
                        _this.active();
                    }
                    break;
            }
        };


        function callbackForRequestGetContentGroupList(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                initializeModel(response.totalCount);
                ListRequestHelper.setInfomation(response.totalCount, VERTICAL_VISIBLE_LIST_COUNT, requestData, _this.model, "contentGroupList", afterRequest, false);
                ListRequestHelper.run();
            } else {
            }
        }

        function callbackForRequestGetAssetListByContentGroupId(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                initializeModel(response.totalAssetCount);
                ListRequestHelper.setInfomation(response.totalAssetCount, VERTICAL_VISIBLE_LIST_COUNT, requestData, _this.model, "assetList", afterRequest, true);
                ListRequestHelper.run();
            } else {
            }
        }

        function requestData(callback, startItemIndex, pageSize) {
            var indexRotation = 1;
            //Communicator.requestGetAssetListByContentGroupId(callback, "1", "147894", startItemIndex, pageSize, indexRotation);
            Communicator.requestGetContentGroupList(callback, "1", "3", startItemIndex, pageSize, indexRotation);
        }

        var first = true;
        function afterRequest(isSuccess) {
            if(isSuccess) {
                if(first){
                    first =false;
                    _this.startDrawer();
                } else {
                    _this.drawer.update();
                }
            } else {
                console.log("요청 실패");
            }
        }

        function initializeModel(totalCount) {
            var model = _this.model;
            _this.model.setTotalCount(totalCount);

            var verticalVisibleSize = VERTICAL_VISIBLE_LIST_COUNT;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = totalCount;
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setRotate(true, false);
            //model.setData(new Array(totalCount));
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

        return ListTestView;
    });
