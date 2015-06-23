define(["framework/View", "framework/event/CCAEvent", "cca/DefineView", "cca/PopupValues", "framework/modules/ButtonGroup",
        "ui/popupViewGroup/confirmCollectPhoneNumber/ConfirmCollectPhoneNumberModel", "ui/popupViewGroup/confirmCollectPhoneNumber/ConfirmCollectPhoneNumberDrawer"],
    function (View, CCAEvent, DefineView, PopupValues, ButtonGroup, ConfirmCollectPhoneNumberModel, ConfirmCollectPhoneNumberDrawer) {

        var _this = this;

        var ConfirmCollectPhoneNumberView = function (id) {
            View.call(this);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        };

        ConfirmCollectPhoneNumberView.prototype = Object.create(View.prototype);

        ConfirmCollectPhoneNumberView.prototype.onInitialize = function () {
            this.model = new ConfirmCollectPhoneNumberModel();
            this.drawer = new ConfirmCollectPhoneNumberDrawer(this.getID(), this.model);
        };

        ConfirmCollectPhoneNumberView.prototype.onAfterStart = function () {
            initializeModel();
            _this.startDrawer();
        };

        ConfirmCollectPhoneNumberView.prototype.onStart = function (param) {
            _this = this;
            this.model.setPhoneNumber(param.phoneNumber);
        };

        function initializeModel() {
            var model = _this.model;

            var verticalVisibleSize = 2;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = verticalVisibleSize;
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setTitle(EPABase.StringSources.confirmCollectPhoneNumber);
            model.setHeadDescriptionText(EPABase.StringSources.POPUP_TEXT_FIELD.CONFIRM_COLLECT_PHONENUMBER.TITLE);
            model.setBottomDescriptionText(EPABase.StringSources.POPUP_TEXT_FIELD.CONFIRM_COLLECT_PHONENUMBER.SUB);
            model.setPhoneNumber(model.getPhoneNumber());
            model.setButtonGroup(getButtonGroup());
        }


        function getButtonGroup() {
            var buttonGroup = new ButtonGroup(3);

            buttonGroup.getButton(0).setLabel(EPABase.StringSources.ButtonLabel.CONFIRM);
            buttonGroup.getButton(1).setLabel(EPABase.StringSources.ButtonLabel.RESET);
            buttonGroup.getButton(2).setLabel(EPABase.StringSources.ButtonLabel.CANCEL);

            return buttonGroup;
        }

        ConfirmCollectPhoneNumberView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            var buttonGroup = _this.model.getButtonGroup();

            switch (keyCode) {
                case tvKey.KEY_UP:
                case tvKey.KEY_DOWN:
                    break;
                case tvKey.KEY_RIGHT:
                    buttonGroup.next();
                    _this.drawer.update();
                    break;
                case tvKey.KEY_LEFT:
                    buttonGroup.previous();
                    _this.drawer.update();
                    break;
                case tvKey.KEY_BACK:
                case tvKey.KEY_ESC:
                case tvKey.KEY_EXIT:
                    sendFinishViewGroupEvent();
                    break;
                case tvKey.KEY_OK:
                case tvKey.KEY_ENTER:
                    var buttonLabel = buttonGroup.getFocusedButton().getLabel();
                    switch (buttonLabel) {
                        case EPABase.StringSources.ButtonLabel.CONFIRM:
                            sendFinishViewGroupWithResult();
                            break;
                        case EPABase.StringSources.ButtonLabel.RESET:
                            sendChangeViewEvent(DefineView.COLLECT_PHONENUMBER);
                            break;
                        case EPABase.StringSources.ButtonLabel.CANCEL:
                            sendFinishViewGroupEvent();
                            break;
                    }
                    break;
                case tvKey.KEY_0:
                case tvKey.KEY_1:
                case tvKey.KEY_2:
                case tvKey.KEY_3:
                case tvKey.KEY_4:
                case tvKey.KEY_5:
                case tvKey.KEY_6:
                case tvKey.KEY_7:
                case tvKey.KEY_8:
                case tvKey.KEY_9:
                    break;
                default:
                    break;
            }
        };

        function sendChangeViewEvent(targetView) {
            _this.sendEvent(CCAEvent.CHANGE_VIEW, getParamObjectForChangeView(targetView));
        }

        function sendFinishViewGroupWithResult() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, getParamObjectForFinishViewGroupWithResult());
        }

        function getParamObjectForChangeView(targetView) {
            var param = {targetViewGroup:DefineView.POPUP_VIEWGROUP_MANAGER, targetView: targetView};

            return param;
        }

        function getParamObjectForFinishViewGroupWithResult() {
            var param = {
                phoneNumber: _this.model.getPhoneNumber(),
                sourceView: DefineView.CONFIRM_COLLECT_PHONENUMBER
            };
            return param;
        }

        function sendFinishViewGroupEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        return ConfirmCollectPhoneNumberView;
    });