define(["framework/View", "ui/popupViewGroup/relatedEventList/RelatedEventListDrawer", "ui/popupViewGroup/relatedEventList/RelatedEventListModel",
         "service/Communicator", "framework/modules/ButtonGroup", "framework/event/CCAEvent", "service/STBInfoManager", "cca/type/EnrollStatusType", "cca/DefineView"],
    function(View, RelatedEventListDrawer, RelatedEventListModel, Communicator, ButtonGroup, CCAEvent, STBInfoManager, EnrollStatusType, DefineView){

        var VERTICAL_VISIBLE_LIST_COUNT = 4;

        var _this = this;

        var RelatedEventListView = function(id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();

        };

        RelatedEventListView.prototype = Object.create(View.prototype);

        RelatedEventListView.prototype.onInitialize = function () {
            this.model = new RelatedEventListModel();
            this.drawer = new RelatedEventListDrawer(this.getID(), this.model);

        };

        RelatedEventListView.prototype.onStart = function (param) {
            _this = this;
            this.model.setRelatedEventList(param.relatedEventList);
        };


        RelatedEventListView.prototype.onAfterStart = function (){
            initializeModel(_this.model.getRelatedEventList());
            _this.startDrawer();
        };

        RelatedEventListView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            var buttonGroup = _this.model.getButtonGroup();
            var currentPageIndex = _this.model.getCurrentPageIndex();
            var totalPage = _this.model.getTotalPage();

            switch (keyCode) {
                case tvKey.KEY_UP:
                    if (isButtonGroupState()){
                        _this.model.setCurrentFocusedStatement(RelatedEventListView.STATE_SELECT_ITEM);
                    } else {
                        if (_this.model.getVIndex() > 0){
                            _this.keyNavigator.keyUp();
                        }
                    }
                    _this.drawer.update();
                    break;
                case tvKey.KEY_DOWN:
                    if (isLastItemState()){
                        _this.model.setCurrentFocusedStatement(RelatedEventListView.STATE_BUTTON_GROUP);
                    } else {
                        _this.keyNavigator.keyDown();
                    }
                    _this.drawer.update();
                    break;
                case tvKey.KEY_LEFT:
                    if (_this.model.getCurrentFocusedStatement() == RelatedEventListView.STATE_SELECT_ITEM){
                        if (totalPage>1){
                            setPreviewPage(currentPageIndex, totalPage);
                            _this.model.setVIndex(0);
                            _this.drawer.update();
                        }
                    }
                    break;
                case tvKey.KEY_BACK:
                case tvKey.KEY_ESC:
                case tvKey.KEY_EXIT:
                    _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
                    break;
                case tvKey.KEY_RIGHT:
                    if (_this.model.getCurrentFocusedStatement() == RelatedEventListView.STATE_SELECT_ITEM) {
                        if (totalPage>1){
                            setNextPage(currentPageIndex, totalPage);
                            _this.model.setVIndex(0);
                            _this.drawer.update();
                        }
                    }

                    break;
                case tvKey.KEY_ENTER:
                case tvKey.KEY_OK:
                    sendFinishViewGroupWithResult();
                    break;
                default:
                    break;
            }
        }

        function sendFinishViewGroupWithResult(){
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, getParamObjectForFinishViewGroupWithResult());
        }

        function getParamObjectForFinishViewGroupWithResult() {
            var param = {
                sourceView: DefineView.RELATED_EVENT_LIST_VIEW
            };

            if (isButtonGroupState()){
                param.result = _this.model.getButtonGroup().getFocusedButton().getLabel();
            } else {
                param.eventId = _this.model.getVFocusedItem().getEventId();
            }
            return param;
        }


        function isButtonGroupState(){
            return _this.model.getCurrentFocusedStatement() == RelatedEventListView.STATE_BUTTON_GROUP;
        }

        function setPreviewPage(currentPageIndex, totalPage){
            _this.model.setCurrentPageIndex(((currentPageIndex - 1) + totalPage) % totalPage);
            _this.model.setVStartIndex(_this.model.getCurrentPageIndex() * VERTICAL_VISIBLE_LIST_COUNT);
        }

        function setNextPage(currentPageIndex, totalPage){
            _this.model.setCurrentPageIndex((currentPageIndex + 1) % totalPage);
            _this.model.setVStartIndex(_this.model.getCurrentPageIndex() * VERTICAL_VISIBLE_LIST_COUNT);
        }

        function initializeModel(relatedEventList) {
            var model = _this.model;

            var verticalVisibleSize = VERTICAL_VISIBLE_LIST_COUNT;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = relatedEventList ? relatedEventList.length : 0;
            var horizonMaximumSize = horizonVisibleSize ;

            model.setTotalPage(Math.ceil(relatedEventList.length/ verticalVisibleSize));
            model.setCurrentPageIndex(0);

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setRotate(false, false);
            model.setData(relatedEventList);

            model.setButtonGroup(getButtonGroup());
            model.setCurrentFocusedStatement(RelatedEventListView.STATE_SELECT_ITEM);
        }

        function getButtonGroup() {
            var buttonGroup = new ButtonGroup(1);
            buttonGroup.getButton(0).setLabel(EPABase.StringSources.ButtonLabel.CLOSE);
            return buttonGroup;
        }

        function isLastItemState(){
            if ((_this.model.getCurrentPageIndex() + 1) == _this.model.getTotalPage()){
                if (_this.model.getVIndex() == ((_this.model.getData().length-1) % 4)){
                    return true;
                } else{
                    return false;
                }
            } else if (_this.model.getVIndex() == (VERTICAL_VISIBLE_LIST_COUNT -1)){
                return true;
            } else{
                return false;
            }

        }

        RelatedEventListView.STATE_SELECT_ITEM = RelatedEventListDrawer.STATE_SELECT_ITEM;
        RelatedEventListView.STATE_BUTTON_GROUP = RelatedEventListDrawer.STATE_BUTTON_GROUP;
        return RelatedEventListView;

    });
