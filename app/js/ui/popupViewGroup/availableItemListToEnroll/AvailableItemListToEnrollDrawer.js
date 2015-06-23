define(["framework/Drawer",  "helper/UIHelper", "cca/DefineView"], function (Drawer, UIHelper, DefineView) {
    var AvailableItemListToEnrollDrawer = function (id, model) {

        Drawer.call(this, id, model);
        var _this = this;
        var layoutTemplate = new EJS({url: 'js/ui/popupViewGroup/availableItemListToEnroll/LayoutTemplate.ejs'});
        var listTemplate = new EJS({url: 'js/ui/popupViewGroup/availableItemListToEnroll/ListTemplate.ejs'});

        AvailableItemListToEnrollDrawer.prototype.onCreateLayout = function() {
            this.createContainer(DefineView.POPUP_VIEWGROUP_MANAGER);

            //var result = new EJS({url: 'js/ui/popupViewGroup/availableItemListToEnroll/LayoutTemplate.ejs'}).render({model: this.model});
            //this.getContainer().html(result);
            layoutTemplate.update(this.getContainer()[0], {model:this.model});

        };
        AvailableItemListToEnrollDrawer.prototype.onPaint = function() {
            //var result = new EJS({url: 'js/ui/popupViewGroup/availableItemListToEnroll/ListTemplate.ejs'}).render({model: this.model, UIHelper:UIHelper});
            //this.getContainer().find('#popup_list_3 .list_margin').html(result);
            var listContainer = this.getContainer().find('#popup_list_3 .list_margin')[0];
            listTemplate.update(listContainer, {model: this.model, UIHelper:UIHelper});

            setButtonElement();
        };
        AvailableItemListToEnrollDrawer.prototype.onAfterPaint = function() {
            drawButton();
            drawFocusOnEvent();
        };

        function setButtonElement() {
            var buttonGroup = _this.model.getButtonGroup();
            var buttonElementList = $('#popup_list_3 .btn');
            var size = buttonGroup.getSize();
            for (var i = 0; i < size; i++) {
                buttonGroup.getButton(i).setElement(buttonElementList.eq(i));
            }
        };

        function getFocusIndexItem() {
            if(!_this.model.isNullData()) {
                var focusIndex = _this.model.getVIndex();
                var listItems = $('#popup_list_3 .tb_list');
                var focusItem = listItems.eq(focusIndex);
                return focusItem;
            } else {
                return null;
            }
        }

        function drawFocusOnEvent() {
            var focusItem = getFocusIndexItem();

            if (_this.model.getCurrentFocusedStatement() == AvailableItemListToEnrollDrawer.STATE_SELECT_ITEM){
                if (_this.isActive()) {
                    _this.setFocus(focusItem);
                } else {
                    _this.setUnFocus(focusItem);
                }
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

            if(_this.isActive() && _this.model.getCurrentFocusedStatement() == AvailableItemListToEnrollDrawer.STATE_BUTTON_GROUP) {
                buttonGroup.getFocusedButton().setFocus();
            }
        }

    };

    AvailableItemListToEnrollDrawer.prototype = Object.create(Drawer.prototype);

    AvailableItemListToEnrollDrawer.STATE_SELECT_ITEM = 0;
    AvailableItemListToEnrollDrawer.STATE_BUTTON_GROUP = 1;

    return AvailableItemListToEnrollDrawer;
});
