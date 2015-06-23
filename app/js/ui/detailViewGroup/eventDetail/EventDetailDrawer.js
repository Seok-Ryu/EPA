define(["framework/Drawer", "helper/DrawerHelper", "framework/event/CCAEvent",
        "helper/DateHelper", "helper/UIHelper", "service/TotalEventStateManager"],
    function (Drawer, DrawerHelper, CCAEvent, DateHelper, UIHelper, TotalEventStateManager) {
        var EventDetailDrawer = function (_id, _model) {
            Drawer.call(this, _id, _model);

            var _this = this;
            var isFirstDraw = false;

            var layoutTemplate = new EJS({url: 'js/ui/detailViewGroup/eventDetail/LayoutTemplate.ejs'});
            var textAreaTemplate = new EJS({url: 'js/ui/detailViewGroup/eventDetail/TextAreaTemplate.ejs'})
            var buttonAreaTemplate = new EJS({url: 'js/ui/detailViewGroup/eventDetail/ButtonGroupTemplate.ejs'})
            var achieveAreaTemplate = new EJS({url: 'js/ui/detailViewGroup/eventDetail/AchieveAreaTemplate.ejs'})

            EventDetailDrawer.prototype.onCreateLayout = function () {
                this.createTempContainer();
                layoutTemplate.update(this.getContainer()[0], {model: this.model, UIHelper:UIHelper});
                //var result = new EJS({url: 'js/ui/detailViewGroup/eventDetail/LayoutTemplate.ejs'}).render({model: this.model});
                //this.getContainer().html(result);
            }

            EventDetailDrawer.prototype.onPaint = function () {
                if(_this.model.getEventStatusValue()) {
                    var textArea = this.getContainer().find("#detail .bg_info")[0];
                    var buttonArea = this.getContainer().find("#detail .area_btn")[0];
                    var achieveArea = this.getContainer().find("#detail .area_event_option")[0];

                    textAreaTemplate.update(textArea, {model: this.model, TotalEventStateManager : TotalEventStateManager, DateHelper : DateHelper});
                    buttonAreaTemplate.update(buttonArea, {model: this.model, TotalEventStateManager : TotalEventStateManager});
                    achieveAreaTemplate.update(achieveArea, {model: this.model, TotalEventStateManager : TotalEventStateManager, UIHelper : UIHelper});

                    /*var textAreaResult = new EJS({url: 'js/ui/detailViewGroup/eventDetail/TextAreaTemplate.ejs'}).render();
                    this.getContainer().find("#detail .bg_info").html(textAreaResult);

                    var buttonAreaResult = new EJS({url: 'js/ui/detailViewGroup/eventDetail/ButtonGroupTemplate.ejs'}).render({model: this.model, TotalEventStateManager : TotalEventStateManager});
                    this.getContainer().find("#detail .area_btn").html(buttonAreaResult);

                    var AchieveAreaResult = new EJS({url: 'js/ui/detailViewGroup/eventDetail/AchieveAreaTemplate.ejs'}).render({model: this.model, TotalEventStateManager : TotalEventStateManager, UIHelper : UIHelper});
                    this.getContainer().find("#detail .area_event_option").html(AchieveAreaResult);*/
                    setButtonElement();
                }
            }

            EventDetailDrawer.prototype.onAfterPaint = function () {
                if(_this.model.getEventStatusValue()) {
                    drawTextArea();
                    drawButton();
                }
            }

            EventDetailDrawer.prototype.onDrawForCloud = function () {
                this.changeContainer(getNewContainer());
                this.update();
            }

            function getNewContainer() {
                _this.createContainer(_this.id);
                return _this.container;
            }

            function setButtonElement() {
                var buttonGroup = _this.model.getButtonGroup();
                var buttonElementList = _this.getContainer().find("#detail .area_btn .btn")
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

                if(_this.isActive() && isButtonGroupState()) {
                    buttonGroup.getFocusedButton().setFocus();
                }
            }

            function drawTextArea() {
                var buttonAreaOnTextArea = _this.container.find("#detail .bg_info .right");

                if(hasButtonOnTextArea()) {
                    var textAreaButton = buttonAreaOnTextArea.find(".btn");
                    if(isButtonGroupState()) {
                        _this.setUnFocus(textAreaButton);
                    } else {
                        _this.setFocus(textAreaButton)
                    }

                    if(!isTempContainer()) {
                        buttonAreaOnTextArea.css("visibility", "visible");
                    } else {
                        buttonAreaOnTextArea.css("visibility", "hidden");
                    }
                } else {
                    buttonAreaOnTextArea.css("visibility", "hidden");
                }
            }

            function isTempContainer() {
                var containerID = _this.getContainer().attr('id');
                return containerID == "tempContainer";
            }

            function hasButtonOnTextArea() {
                return _this.model.getEventStatusValue().hasButtonOnTextField;
            }

            function isButtonGroupState() {
                return hasButtonOnTextArea() ? EventDetailDrawer.STATE_BUTTON_GROUP == _this.model.getVIndex() : true;
            }
        }

        EventDetailDrawer.prototype = Object.create(Drawer.prototype);
        EventDetailDrawer.STATE_TEXT_AREA = 0;
        EventDetailDrawer.STATE_BUTTON_GROUP = 1;

        return EventDetailDrawer;
    });
