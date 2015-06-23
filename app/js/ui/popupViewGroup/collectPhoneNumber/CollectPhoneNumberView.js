define(["framework/View", "framework/event/CCAEvent", "cca/DefineView", "framework/modules/ButtonGroup", "framework/modules/InputField",
        "ui/popupViewGroup/collectPhoneNumber/CollectPhoneNumberModel", "ui/popupViewGroup/collectPhoneNumber/CollectPhoneNumberDrawer",
        "main/ExternalHandler"],
    function (View, CCAEvent, DefineView, ButtonGroup, InputField, CollectPhoneNumberModel, CollectPhoneNumberDrawer, ExternalHandler) {

        var _this = this;

        var CollectPhoneNumberView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        };

        CollectPhoneNumberView.prototype = Object.create(View.prototype);

        CollectPhoneNumberView.prototype.onInitialize = function () {
            this.model = new CollectPhoneNumberModel();
            this.drawer = new CollectPhoneNumberDrawer(this.getID(), this.model);
        };

        CollectPhoneNumberView.prototype.onAfterStart = function () {
            initializeModel();
            _this.startDrawer();
            ExternalHandler.activateNumberKeys(true);
        };

       CollectPhoneNumberView.prototype.onStart = function (param) {
            _this = this;
        };

        function getButtonGroup() {
            var buttonGroup = new ButtonGroup(2);

            buttonGroup.getButton(0).setLabel(EPABase.StringSources.ButtonLabel.CONFIRM);
            buttonGroup.getButton(1).setLabel(EPABase.StringSources.ButtonLabel.CANCEL);

            buttonGroup.getButton(0).onDeActive();
            buttonGroup.setIndex(1);

            return buttonGroup;
        }

        function getInputFieldList() {
            var inputFieldList = new Array();

            for (var i = 0; i < 3; i++) {
                var inputField = new InputField();
                if (i == 0) {
                    inputField.setMaximumSize(3);
                    inputField.setSecurityMode(false);
                } else {
                    inputField.setMaximumSize(4);
                    inputField.setSecurityMode(false);
                }
                $(inputField).bind(InputField.FULL_TEXT_EVENT, fullTextInputFieldEvent);
                $(inputField).bind(InputField.INIT_TEXT_EVENT, initTextInputFieldEvent);

                inputFieldList.push(inputField);
            }
            return inputFieldList;
        }

        function fullTextInputFieldEvent() {
            var model = _this.model;
            var index = model.getInputFieldListIndex();

            if (index == 0 || index == 1) {
                model.setInputFieldListIndex(model.getInputFieldListIndex() + 1);
            } else if (index == 2) {
                _this.model.setVIndex(CollectPhoneNumberView.STATE_BUTTONGROUP);
                model.getButtonGroup().setIndex(0);
                model.getButtonGroup().getButton(0).onActive();
            }
            _this.drawer.update();
        }

        function initTextInputFieldEvent() {
            _this.model.getButtonGroup().getButton(0).onDeActive();
            _this.model.getButtonGroup().setIndex(1);
        }

        function initializeModel() {
            var model = _this.model;

            var verticalVisibleSize = 2;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = verticalVisibleSize;
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setTitle(EPABase.StringSources.collectPhoneNumber);
            model.setDescriptionText(EPABase.StringSources.POPUP_TEXT_FIELD.CONLLECT_PHONENUMBER.TITLE);
            model.setInputFieldList(getInputFieldList());
            model.setButtonGroup(getButtonGroup());
            model.setInputFieldListIndex(0);
        }

        CollectPhoneNumberView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            var buttonGroup = _this.model.getButtonGroup();

            switch (keyCode) {
                case tvKey.KEY_UP:
                    if (isButtonGroupState()) {
                        _this.model.setInputFieldListIndex(0);
                        initFocusInputField();
                        _this.model.setVIndex(CollectPhoneNumberView.STATE_INPUTFIELD);
                        _this.drawer.update();
                    }
                    break;
                case tvKey.KEY_DOWN:
                    if (isInputFieldState()) {
                        _this.keyNavigator.keyDown();
                        _this.drawer.update();
                    }
                    break;
                case tvKey.KEY_RIGHT:
                    if(isInputFieldState()) {
                        var inputField = _this.model.getInputFieldList();
                        var index = _this.model.getInputFieldListIndex();
                        if(index == 1) {
                            if (inputField[index].getInputText().length == 3 || inputField[index].getInputText().length == 4) {
                                _this.model.setInputFieldListIndex(index + 1);
                                _this.drawer.update();
                            }
                        } else {
                            if (inputField[index].isFullText()) {
                                _this.model.setInputFieldListIndex(index + 1);
                                _this.drawer.update();
                            }
                        }
                    } else if(isButtonGroupState()) {
                        buttonGroup.next();
                        _this.drawer.update();
                    }
                    break;
                case tvKey.KEY_LEFT:
                    if (isInputFieldState()) {
                        var inputField = _this.model.getInputFieldList()[_this.model.getInputFieldListIndex()];
                        if(inputField.getSize() > 0) {
                            inputField.removeText();
                        } else {
                            if(_this.model.getInputFieldListIndex() > 0) {
                                _this.model.setInputFieldListIndex(_this.model.getInputFieldListIndex() - 1);
                            }
                        }
                        _this.drawer.update();
                    } else if(isButtonGroupState()) {
                        var inputField = _this.model.getInputFieldList();
                        if (isFullTextField()) {
                            buttonGroup.previous();
                            _this.drawer.update();
                        }
                    }
                    break;
                case tvKey.KEY_BACK:
                case tvKey.KEY_ESC:
                case tvKey.KEY_EXIT:
                    sendFinishViewGroupEvent();
                    break;
                case tvKey.KEY_OK:
                case tvKey.KEY_ENTER:
                    if (isButtonGroupState()) {
                        var buttonLabel = buttonGroup.getFocusedButton().getLabel();
                        switch (buttonLabel) {
                            case EPABase.StringSources.ButtonLabel.CONFIRM:
                                sendChangeViewEvent(DefineView.CONFIRM_COLLECT_PHONENUMBER);
                                break;
                            case EPABase.StringSources.ButtonLabel.CANCEL:
                                initFocusInputField();
                                sendFinishViewGroupEvent();
                                break;
                        }
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
                    if (isInputFieldState()) {
                        var inputField = _this.model.getInputFieldList()[_this.model.getInputFieldListIndex()];
                        inputField.addText(keyCode);
                        _this.drawer.update();
                    }
                    break;
                default:
                    break;
            }
        };

        function isFullTextField() {
            var inputField = _this.model.getInputFieldList();

            if(inputField[0].isFullText()
                && (inputField[1].getSize() == 3 || inputField[1].getSize() == 4)
                && inputField[2].isFullText()) {
                return true;
            } else {
                return false;
            }

        }

        function getPhoneNumber() {
            var inputFieldList = _this.model.getInputFieldList();
            var phoneNumber = "";
            for(var i = 0; i < inputFieldList.length; i++) {
                phoneNumber += inputFieldList[i].getInputText();
                if(i != inputFieldList.length -1) {
                    phoneNumber += "-";
                }
            }
            return phoneNumber;
        }


        function sendChangeViewEvent(targetView) {
            ExternalHandler.activateNumberKeys(false);
            _this.sendEvent(CCAEvent.CHANGE_VIEW, getParamObjectForChangeView(targetView));
        }

        function getParamObjectForChangeView(targetView) {
            var param = {targetViewGroup:DefineView.POPUP_VIEWGROUP_MANAGER, targetView: targetView, phoneNumber: getPhoneNumber()};
            return param;
        }

        function sendFinishViewGroupEvent() {
            ExternalHandler.activateNumberKeys(false);
            _this.model.setVIndex(CollectPhoneNumberView.STATE_INPUTFIELD);
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        function isInputFieldState() {
            return _this.model.getVIndex() == CollectPhoneNumberView.STATE_INPUTFIELD;
        }

        function isButtonGroupState() {
            return _this.model.getVIndex() == CollectPhoneNumberView.STATE_BUTTONGROUP;
        }

        function initFocusInputField() {
            var inputFieldList = _this.model.getInputFieldList();
            for(var i = 0; i < inputFieldList.length; i++) {
                inputFieldList[i].initText();
            }
        }

        CollectPhoneNumberView.STATE_INPUTFIELD = CollectPhoneNumberDrawer.STATE_INPUTFIELD;
        CollectPhoneNumberView.STATE_BUTTONGROUP = CollectPhoneNumberDrawer.STATE_BUTTONGROUP;

        return CollectPhoneNumberView;
    });