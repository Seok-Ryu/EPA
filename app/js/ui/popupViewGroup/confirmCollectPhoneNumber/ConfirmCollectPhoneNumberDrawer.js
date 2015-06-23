define(["framework/Drawer", "helper/UIHelper", "ui/popupViewGroup/confirmCollectPhoneNumber/ConfirmCollectPhoneNumberModel"], function (Drawer, UIHelper, ConfirmCollectPhoneNumberModel) {
    var ConfirmCollectPhoneNumberDrawer = function (_id, _model) {
        Drawer.call(this, _id, _model);
        var _this = this;
        var layoutTemplate = new EJS({url: 'js/ui/popupViewGroup/confirmCollectPhoneNumber/LayoutTemplate.ejs'});

        ConfirmCollectPhoneNumberDrawer.prototype.onCreateLayout = function () {
            //var result = new EJS({url: 'js/ui/popupViewGroup/confirmCollectPhoneNumber/LayoutTemplate.ejs'}).render({model:this.model, UIHelper:UIHelper});
            //this.getContainer().html(result);
            layoutTemplate.update(this.getContainer()[0], {model:this.model, UIHelper:UIHelper});

        };

        ConfirmCollectPhoneNumberDrawer.prototype.onPaint = function () {
            setButtonElement();
        };

        ConfirmCollectPhoneNumberDrawer.prototype.onAfterPaint = function () {
            drawButton();
        };

        function setButtonElement() {
            var buttonGroup = _this.model.getButtonGroup();
            var buttonElementList = $('#popup_phone_2 .bg_black >');
            var size = buttonGroup.getSize();
            for (var i = 0; i < size; i++) {
                buttonGroup.getButton(i).setElement(buttonElementList.eq(i));
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
            if (_this.isActive()) {
                buttonGroup.getFocusedButton().setFocus();
            }
        }

    };
    ConfirmCollectPhoneNumberDrawer.prototype = Object.create(Drawer.prototype);

    return ConfirmCollectPhoneNumberDrawer;
});