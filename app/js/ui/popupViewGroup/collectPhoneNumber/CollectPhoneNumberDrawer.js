define(["framework/Drawer", "ui/popupViewGroup/collectPhoneNumber/CollectPhoneNumberModel"], function (Drawer, CollectPhoneNumberModel) {
    var CollectPhoneNumberDrawer = function (_id, _model) {
        Drawer.call(this, _id, _model);
        var _this = this;
        var layoutTemplate = new EJS({url: 'js/ui/popupViewGroup/collectPhoneNumber/LayoutTemplate.ejs'});

        CollectPhoneNumberDrawer.prototype.onCreateLayout = function () {

        };

        CollectPhoneNumberDrawer.prototype.onPaint = function () {
            //var result = new EJS({url: 'js/ui/popupViewGroup/collectPhoneNumber/LayoutTemplate.ejs'}).render({model: this.model});
            //this.getContainer().html(result);
            layoutTemplate.update(this.getContainer()[0], {model:this.model});


            setButtonElement();
            setInputFieldElement();
        };

        CollectPhoneNumberDrawer.prototype.onAfterPaint = function () {
            drawButton();
            drawInputField();
        };

        function setButtonElement() {
            var buttonGroup = _this.model.getButtonGroup();
            var buttonElementList = $('#popup_phone_2 .bg_black >');
            var size = buttonGroup.getSize();
            for (var i = 0; i < size; i++) {
                buttonGroup.getButton(i).setElement(buttonElementList.eq(i));
            }
        }

        function setInputFieldElement() {
            var inputFieldList = _this.model.getInputFieldList();
            for(var i = 0 ; i < inputFieldList.length; i++) {
                inputFieldList[i].setElement($(".passwordbox").eq(i));
            }
        }

        function drawButton() {
            var buttonGroup = _this.model.getButtonGroup();
            for (var i = 0; i < buttonGroup.getSize(); i++) {
                if (buttonGroup.getButton(i).isActive()) {
                    buttonGroup.getButton(i).onActive();
                } else {
                    buttonGroup.getButton(i).onDeActive();
                }
                buttonGroup.getButton(i).setUnFocus();
            }

            if (_this.isActive() && !isFocusOnInputField()) {
                buttonGroup.getFocusedButton().setFocus();
            }
        }

        function drawInputField() {
            var model = _this.model;
            var index = model.getInputFieldListIndex();

            if (_this.isActive() && isFocusOnInputField()) {
                $('.passwordbox').eq(index).addClass("focus");
            } else {
                $('.passwordbox').eq(index).addClass("unfocus");
            }
        }

        function isFocusOnInputField() {
            return _this.model.getVIndex() == CollectPhoneNumberDrawer.STATE_INPUTFIELD;
        }
    };
    CollectPhoneNumberDrawer.prototype = Object.create(Drawer.prototype);

    CollectPhoneNumberDrawer.STATE_INPUTFIELD = 0;
    CollectPhoneNumberDrawer.STATE_BUTTONGROUP = 1;

    return CollectPhoneNumberDrawer;
});