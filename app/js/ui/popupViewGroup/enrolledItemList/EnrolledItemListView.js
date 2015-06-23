define(["framework/View", "service/Communicator", "framework/modules/ButtonGroup", "framework/event/CCAEvent"
        , "ui/popupViewGroup/enrolledItemList/EnrolledItemListModel", "ui/popupViewGroup/enrolledItemList/EnrolledItemListDrawer"
        ],
    function (View, Communicator, ButtonGroup, CCAEvent, EnrolledItemListModel, EnrolledItemListDrawer) {

        var _this = this;
        var VERTICAL_VISIBLE_LIST_COUNT = 5;

        var EnrolledItemListView = function(id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        };

        EnrolledItemListView.prototype = Object.create(View.prototype);

        EnrolledItemListView.prototype.onInitialize = function() {
            this.model = new EnrolledItemListModel();
            this.drawer = new EnrolledItemListDrawer(this.getID(), this.model);
        };

        EnrolledItemListView.prototype.onStart = function(param) {
            _this = this;
            this.model.setEventId(param.eventId);
            this.model.setSubscriberEnrollDetailList(param.subscriberEnrollDetailList);
        };

        EnrolledItemListView.prototype.onAfterStart = function() {
            initializeModel(_this.model.getSubscriberEnrollDetailList());
            _this.startDrawer();
            _this.show();
        };

        function initializeModel(subscriberEnrollDetailList) {
            var model = _this.model;

            var verticalVisibleSize = VERTICAL_VISIBLE_LIST_COUNT;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = subscriberEnrollDetailList ? subscriberEnrollDetailList.length : 0;
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setTotalPage(Math.ceil(verticalMaximumSize / verticalVisibleSize));
            model.setCurrentPageIndex(0);

            model.setData(subscriberEnrollDetailList);
            model.setButtonGroup(getButtonGroup());
        }


        function getButtonGroup() {
            var buttonGroup = new ButtonGroup(1);
            buttonGroup.getButton(0).setLabel(window.EPABase.StringSources.ButtonLabel.CONFIRM);
            return buttonGroup;
        }

        function drawerUpdate() {
            _this.drawer.update();
        }

        function sendFinishViewGroupEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        function setPreviewPage(currentPageIndex, totalPage){
            _this.model.setCurrentPageIndex(((currentPageIndex - 1) + totalPage) % totalPage);
            _this.model.setVStartIndex(_this.model.getCurrentPageIndex() * VERTICAL_VISIBLE_LIST_COUNT);
        }

        function setNextPage(currentPageIndex, totalPage){
            _this.model.setCurrentPageIndex((currentPageIndex + 1) % totalPage);
            _this.model.setVStartIndex(_this.model.getCurrentPageIndex() * VERTICAL_VISIBLE_LIST_COUNT);
        }


        EnrolledItemListView.prototype.onKeyDown = function(event, param) {

            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;

            var currentPageIndex = _this.model.getCurrentPageIndex();
            var totalPage = _this.model.getTotalPage();
            var vStartIndex = _this.model.getVStartIndex();

            switch (keyCode) {
                case tvKey.KEY_UP:
                case tvKey.KEY_DOWN:
                    break;
                case tvKey.KEY_LEFT:
                    if(totalPage > 1) {
                        setPreviewPage(currentPageIndex, totalPage);
                        drawerUpdate();
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
                        drawerUpdate();
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

        return EnrolledItemListView;
    });