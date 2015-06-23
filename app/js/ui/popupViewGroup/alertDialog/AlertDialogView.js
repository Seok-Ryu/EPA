define(["framework/View", "framework/event/CCAEvent", "service/Communicator", "cca/DefineView",
    "ui/popupViewGroup/alertDialog/AlertDialogDrawer", "ui/popupViewGroup/alertDialog/AlertDialogModel",
    "framework/modules/ButtonGroup"],
    function (View, CCAEvent, Communicator, DefineView, AlertDialogDrawer, AlertDialogModel, ButtonGroup) {

        var _this = this;
        var StringSources = null;

        var AlertDialogView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        }
        AlertDialogView.prototype = Object.create(View.prototype);
        AlertDialogView.prototype.onInitialize = function () {
            this.model = new AlertDialogModel();
            this.drawer = new AlertDialogDrawer(this.getID(), this.model);
            StringSources = window.EPABase.StringSources;
        }
        AlertDialogView.prototype.onStart = function (param) {
            _this = this;
            setPopupValue(param);
        }

        AlertDialogView.prototype.onRequestData = function () {

        }
        AlertDialogView.prototype.onAfterStart = function () {
            initializeModel();
            _this.startDrawer();
        };

        AlertDialogView.prototype.onBeforeStop = function () {

        }
        AlertDialogView.prototype.onAfterStop = function () {

        }

        AlertDialogView.prototype.onShowForCloud = function () {
        }

        AlertDialogView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;

            var buttonGroup = _this.model.getButtonGroup();

            switch (keyCode) {
                case tvKey.KEY_UP:

                    break;
                case tvKey.KEY_DOWN:

                    break;
                case tvKey.KEY_LEFT:
                    buttonGroup.previous();
                    _this.drawer.repaint();
                    break;
                case tvKey.KEY_RIGHT:
                    buttonGroup.next();
                    _this.drawer.repaint();
                    break;
                case tvKey.KEY_BACK:
                case tvKey.KEY_ESC:
                case tvKey.KEY_EXIT:
                    sendFinishViewGroup();
                    break;
                case tvKey.KEY_ENTER:
                    var buttonLabel = buttonGroup.getFocusedButton().getLabel();
                    selectButtonHandler(buttonLabel);
                    break;
                default:
                    break;
            }
        }

        function setPopupValue(param) {
            _this.model.setPopupValue(param.popupValue);

        }

        function sendCompleteDrawEvent() {
            _this.sendEvent(CCAEvent.COMPLETE_TO_DRAW_VIEW);
        }

        function sendFinishViewGroup() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        function sendFinishViewGroupWithResult(buttonLabel) {
            var param = {
                sourceView : _this.id,
                result : buttonLabel,
                popupId : _this.model.getPopupValue().popupId,
                sourceView : DefineView.ALERT_DIALOG
            };
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, param);
        }


        function initializeModel() {
            var model = _this.model;

            var verticalVisibleSize = 1;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = verticalVisibleSize;
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setRotate(false, false);
            model.setButtonGroup(getButtonGroup());
        }


        function getButtonGroup() {
            var labelList = _this.model.getPopupValue().buttonLabelList;
            var buttonGroup = new ButtonGroup();
            buttonGroup.createButtonListByLabelList(labelList);

            return buttonGroup;
        }

        function selectButtonHandler(buttonLabel) {
            switch (buttonLabel) {
                case StringSources.ButtonLabel.CLOSE:
                case StringSources.ButtonLabel.CANCEL:
                case StringSources.ButtonLabel.CONFIRM:
                    sendFinishViewGroupWithResult(buttonLabel);
                    break;
            }
        }


        return AlertDialogView;
    });
