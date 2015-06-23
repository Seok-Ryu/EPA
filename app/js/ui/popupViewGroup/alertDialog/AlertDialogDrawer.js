define(["framework/Drawer", "framework/event/CCAEvent"],
    function (Drawer, CCAEvent) {
        var AlertDialogDrawer = function (_id, _model) {
            Drawer.call(this, _id, _model);

            var _this = this;
            var layoutTemplate = new EJS({url: 'js/ui/popupViewGroup/alertDialog/LayoutTemplate.ejs'});

            AlertDialogDrawer.prototype.onCreateLayout = function () {
                /*var result = new EJS({url: 'js/ui/popupViewGroup/alertDialog/LayoutTemplate.ejs'}).render({model: this.model});
                this.getContainer().html(result);*/
                layoutTemplate.update(this.getContainer()[0], {model: this.model});

                setButtonElement();
            }

            AlertDialogDrawer.prototype.onPaint = function () {

            }

            AlertDialogDrawer.prototype.onAfterPaint = function () {
                drawButton();
            }

            AlertDialogDrawer.prototype.onDrawForCloud = function () {

            }


            function setButtonElement() {
                var buttonGroup = _this.model.getButtonGroup();
                var buttonElementList = _this.getContainer().find("#popup_5 .bg_black .btn");
                var size = buttonGroup.getSize();
                for (var i = 0; i < size; i++) {
                    buttonGroup.getButton(i).setElement(buttonElementList.eq(i));
                }
            }


            function drawButton() {
                var buttonGroup = _this.model.getButtonGroup();
                if(buttonGroup != null){
                    for(var i = 0; i < buttonGroup.getSize(); i++) {
                        if (buttonGroup.getButton(i).isActive()) {
                            buttonGroup.getButton(i).onActive();
                        } else {
                            buttonGroup.getButton(i).onDeActive();
                        }
                        buttonGroup.getButton(i).setUnFocus();
                    }
                }

                if(_this.isActive()) {
                    buttonGroup.getFocusedButton().setFocus();
                }
            }

        }

        AlertDialogDrawer.prototype = Object.create(Drawer.prototype);

        return AlertDialogDrawer;
    });
