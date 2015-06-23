define(["framework/View", "service/Communicator", "framework/modules/ButtonGroup", "framework/event/CCAEvent",
        "ui/popupViewGroup/winnerList/WinnerListModel", "ui/popupViewGroup/winnerList/WinnerListDrawer"],
    function (View, Communicator, ButtonGroup, CCAEvent, WinnerListModel, WinnerListDrawer) {

        var _this = this;
        var VERTICAL_VISIBLE_LIST_COUNT = 5;

        var WinnerListView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        };

        WinnerListView.prototype = Object.create(View.prototype);

        WinnerListView.prototype.onInitialize = function () {
            this.model = new WinnerListModel();
            this.drawer = new WinnerListDrawer(this.getID(), this.model);
        };

        WinnerListView.prototype.onStart = function(param) {
            _this = this;
            this.model.setEventId(param.eventId);
            this.model.setNextPageIndex(0); // 초기값; API 호출 시 파라미터
        };

        WinnerListView.prototype.onRequestData = function(){
            requestWinnerInfo();
        };

        function requestWinnerInfo() {
            var eventId = _this.model.getEventId();
            var pageSize = VERTICAL_VISIBLE_LIST_COUNT;
            var pageIndex = _this.model.getNextPageIndex();
            Communicator.requestGetWinnerList(callbackForRequestGetWinnerList, eventId, pageSize, pageIndex);
        }

        function callbackForRequestGetWinnerList(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                if (_this.model.getData() == null){
                    initializeModel(response);
                    _this.startDrawer();
                    _this.show();
                } else {
                    setCurrentWinnerList(response.winnerList);
                }
            }
        }

        function setCurrentWinnerList(winnerList){
            _this.model.setData(winnerList);
            _this.model.setCurrentPageIndex(_this.model.getNextPageIndex());
            _this.drawer.update();
        }


        function initializeModel(response) {
            var model = _this.model;
            var winnerList = response.winnerList;

            var verticalVisibleSize = VERTICAL_VISIBLE_LIST_COUNT;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = winnerList ? winnerList.length : 0;
            var horizonMaximumSize  =horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setTotalPage(response.totalPage);
            model.setCurrentPageIndex(0);

            model.setData(winnerList);
            model.setButtonGroup(getButtonGroup());
        }


        function getButtonGroup() {
            var buttonGroup = new ButtonGroup(1);
            buttonGroup.getButton(0).setLabel(window.EPABase.StringSources.ButtonLabel.CONFIRM);
            return buttonGroup;
        }

        function sendFinishViewGroupEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        function setPreviewPage(currentPageIndex, totalPage){
            _this.model.setNextPageIndex(((currentPageIndex - 1) + totalPage) % totalPage);
            _this.model.setVStartIndex(_this.model.getNextPageIndex() * VERTICAL_VISIBLE_LIST_COUNT);
            requestWinnerInfo();
        }

        function setNextPage(currentPageIndex, totalPage){
            _this.model.setNextPageIndex((currentPageIndex + 1) % totalPage);
            _this.model.setVStartIndex(_this.model.getNextPageIndex() * VERTICAL_VISIBLE_LIST_COUNT);
            requestWinnerInfo();
        }


        WinnerListView.prototype.onKeyDown = function(event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            var currentPageIndex = _this.model.getCurrentPageIndex();
            var totalPage = _this.model.getTotalPage();

            switch (keyCode) {
                case tvKey.KEY_UP:
                case tvKey.KEY_DOWN:
                    break;
                case tvKey.KEY_LEFT:
                    if(totalPage > 1) {
                        setPreviewPage(currentPageIndex, totalPage);
                    }
                    break;
                case tvKey.KEY_BACK:
                case tvKey.KEY_ESC:
                case tvKey.KEY_EXIT:
                    sendFinishViewGroupEvent();
                    break;

                case tvKey.KEY_RIGHT:
                    if(totalPage > 1) {
                        setNextPage(currentPageIndex, totalPage);
                    }
                    break;
                case tvKey.KEY_ENTER:
                case tvKey.KEY_OK:
                    var label = _this.model.getButtonGroup().getFocusedButton().getLabel();
                    if(label == window.EPABase.StringSources.ButtonLabel.CONFIRM) {
                        sendFinishViewGroupEvent();
                    }
                    break;

                default:
                    break;
            }
        };

        return WinnerListView;
    });