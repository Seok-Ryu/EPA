define(["framework/View", "ui/popupViewGroup/availableItemListToEnroll/AvailableItemListToEnrollDrawer", "ui/popupViewGroup/availableItemListToEnroll/AvailableItemListToEnrollModel",
        "service/Communicator", "framework/modules/ButtonGroup", "framework/event/CCAEvent", "cca/DefineView"],
    function(View, AvailableItemListToEnrollDrawer, AvailableItemListToEnrollModel, Communicator, ButtonGroup, CCAEvent, DefineView){

        var VERTICAL_VISIBLE_LIST_COUNT = 5;

        var _this = this;

        var AvailableItemListToEnrollView = function(id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        };

        AvailableItemListToEnrollView.prototype = Object.create(View.prototype);

        AvailableItemListToEnrollView.prototype.onInitialize = function () {
            this.model = new AvailableItemListToEnrollModel();
            this.drawer = new AvailableItemListToEnrollDrawer(this.getID(), this.model);

        };

        AvailableItemListToEnrollView.prototype.onStart = function (param) {
            _this = this;
            this.model.setEventId(param.eventId);
            this.model.setEventTitle(param.eventTitle);
            this.model.setEventActionTargetList(param.eventActionTargetList);
        };

        AvailableItemListToEnrollView.prototype.onAfterStart = function () {
            initializeModel();
            _this.startDrawer();
            _this.show();
        };

        AvailableItemListToEnrollView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            var buttonGroup = _this.model.getButtonGroup();

            switch (keyCode) {
                case tvKey.KEY_UP:
                    if (isButtonGroupState()){
                        _this.model.setCurrentFocusedStatement(AvailableItemListToEnrollView.STATE_SELECT_ITEM);
                    } else {
                        if (_this.model.getVIndex() > 0){
                            _this.keyNavigator.keyUp();
                        }
                    }
                    _this.drawer.update();
                    break;
                case tvKey.KEY_DOWN:
                    if (isLastItemState()){
                        _this.model.setCurrentFocusedStatement(AvailableItemListToEnrollView.STATE_BUTTON_GROUP);
                    } else {
                        _this.keyNavigator.keyDown();
                    }
                    _this.drawer.update();
                    break;
                case tvKey.KEY_LEFT:
                    break;
                case tvKey.KEY_BACK:
                case tvKey.KEY_ESC:
                case tvKey.KEY_EXIT:
                    sendFinishViewGroupEvent();
                    break;

                case tvKey.KEY_RIGHT:
                    break;
                case tvKey.KEY_ENTER:
                case tvKey.KEY_OK:
                    if (isButtonGroupState()){
                        sendFinishViewGroupEvent();
                    } else{
                        sendFinishViewGroupWithResult();
                    }
                    break;

                default:
                    break;
            }
        }

        function sendFinishViewGroupEvent(){
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        function sendFinishViewGroupWithResult(){
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, getParamObjectForFinishViewGroupWithResult());
        }

        function getParamObjectForFinishViewGroupWithResult() {
            var param = {
                eventActionTarget: _this.model.getVFocusedItem(),
                sourceView : _this.getID()
            };
            return param;
        }

        function isButtonGroupState(){
            return _this.model.getCurrentFocusedStatement() == AvailableItemListToEnrollView.STATE_BUTTON_GROUP;
        }

        function initializeModel() {
            var model = _this.model;
            var availableItemListToEnroll = model.getEventActionTargetList();

            var verticalVisibleSize = VERTICAL_VISIBLE_LIST_COUNT;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = availableItemListToEnroll ? availableItemListToEnroll.length : 0;
            var horizonMaximumSize = horizonVisibleSize ;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setRotate(false, false);
            model.setData(availableItemListToEnroll);

            model.setButtonGroup(getButtonGroup());
            model.setCurrentFocusedStatement(AvailableItemListToEnrollView.STATE_SELECT_ITEM);


        }

        function getButtonGroup() {
            var buttonGroup = new ButtonGroup(1);
            buttonGroup.getButton(0).setLabel(EPABase.StringSources.ButtonLabel.CLOSE);
            return buttonGroup;
        }

        function isLastItemState(){

            if (_this.model.getVIndex() == (_this.model.getData().length - 1)){
                    return true;
            } else{
                    return false;
            }

        }

        AvailableItemListToEnrollView.STATE_SELECT_ITEM = AvailableItemListToEnrollDrawer.STATE_SELECT_ITEM;
        AvailableItemListToEnrollView.STATE_BUTTON_GROUP = AvailableItemListToEnrollDrawer.STATE_BUTTON_GROUP;

        return AvailableItemListToEnrollView;

    });
