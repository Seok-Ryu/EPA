define(["framework/View", "framework/event/CCAEvent", "cca/DefineView", "framework/modules/ButtonGroup",
        "ui/popupViewGroup/agreeRegulation/AgreeRegulationModel", "ui/popupViewGroup/agreeRegulation/AgreeRegulationDrawer"],
    function (View, CCAEvent, DefineView, ButtonGroup, AgreeRegulationModel, AgreeRegulationDrawer) {

        var _this = this;
        var StringSources = null;

        var AgreeRegulationView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        };

        AgreeRegulationView.prototype = Object.create(View.prototype);

        AgreeRegulationView.prototype.onInitialize = function () {
            this.model = new AgreeRegulationModel();
            this.drawer = new AgreeRegulationDrawer(this.getID(), this.model);
            StringSources = window.EPABase.StringSources;
        };

        AgreeRegulationView.prototype.onAfterStart = function () {
            initializeModel();
            _this.startDrawer();
        };

        AgreeRegulationView.prototype.onStart = function (param) {
            _this = this;
        };

        function initializeModel() {
            var model = _this.model;

            var verticalVisibleSize = 2;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = verticalVisibleSize;
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setTitle(StringSources.agreeRegulation);
            model.setHeadDescriptionText(StringSources.POPUP_TEXT_FIELD.AGREE_REGULATION.TITLE);
            model.setBottomDescriptionText(StringSources.POPUP_TEXT_FIELD.AGREE_REGULATION.SUB);
            model.setButtonGroup(getButtonGroup());
        }

        function getButtonGroup() {
            var buttonGroup = new ButtonGroup(2);

            buttonGroup.getButton(0).setLabel(StringSources.ButtonLabel.AGREE);
            buttonGroup.getButton(1).setLabel(StringSources.ButtonLabel.CANCEL);

            return buttonGroup;
        }

        AgreeRegulationView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            var buttonGroup = _this.model.getButtonGroup();

            switch (keyCode) {
                case tvKey.KEY_UP:
                    _this.drawer.moveToUp();
                    break;
                case tvKey.KEY_DOWN:
                    _this.drawer.moveToDown();
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
                        case StringSources.ButtonLabel.AGREE:
                            sendChangeViewEvent(DefineView.COLLECT_PHONENUMBER, getParamObjectForChangeView());
                            break;
                        case StringSources.ButtonLabel.CANCEL:
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

        function getParamObjectForChangeView(targetView) {
            var param = {targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER, targetView: targetView};
            return param;
        }

        function sendFinishViewGroupEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        return AgreeRegulationView;
    });