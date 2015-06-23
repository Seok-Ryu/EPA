define(["framework/Drawer", "cca/type/EnrollStatusType", "cca/DefineView"], function (Drawer, EnrollStatusType, DefineView) {
    var RelatedEventListDrawer = function (id, model) {

        Drawer.call(this, id, model);
        var _this = this;
        var layoutTemplate = new EJS({url: 'js/ui/popupViewGroup/relatedEventList/LayoutTemplate.ejs'});
        var listTemplate = new EJS({url: 'js/ui/popupViewGroup/relatedEventList/ListTemplate.ejs'});

        RelatedEventListDrawer.prototype.onCreateLayout = function() {
            this.createContainer(DefineView.POPUP_VIEWGROUP_MANAGER);
            //var result = new EJS({url: 'js/ui/popupViewGroup/relatedEventList/LayoutTemplate.ejs'}).render({model: this.model});
            //this.getContainer().html(result);
            layoutTemplate.update(this.getContainer()[0], {model:this.model});

        };
        RelatedEventListDrawer.prototype.onPaint = function() {
            //var result = new EJS({url: 'js/ui/popupViewGroup/relatedEventList/ListTemplate.ejs'}).render({model: this.model, EnrollStatusType: EnrollStatusType});
            //this.getContainer().find('#popup_list_4 .list_margin').html(result);

            var listContainer = this.getContainer().find('#popup_list_4 .list_margin')[0];
            listTemplate.update(listContainer, {model:this.model, EnrollStatusType: EnrollStatusType});

            setButtonElement();
        };
        RelatedEventListDrawer.prototype.onAfterPaint = function() {
            drawButton();
            drawFocusOnEvent();
            drawCurrentPageNum();
        };

        function drawCurrentPageNum(){
            $('#popup_list_4 .now').html(_this.model.getCurrentPageIndex() + 1);
        };

        function setButtonElement() {
            var buttonGroup = _this.model.getButtonGroup();
            var buttonElementList = $('#popup_list_4 .btn');
            var size = buttonGroup.getSize();
            for (var i = 0; i < size; i++) {
                buttonGroup.getButton(i).setElement(buttonElementList.eq(i));
            }
        };

        function getFocusIndexItem() {
            if(!_this.model.isNullData()) {
                var focusIndex = _this.model.getVIndex();
                var listItems = $('#popup_list_4 .tb_list');
                var focusItem = listItems.eq(focusIndex);
                return focusItem;
            } else {
                return null;
            }
        }

        function drawFocusOnEvent() {
            var focusItem = getFocusIndexItem();

            if (_this.model.getCurrentFocusedStatement() == RelatedEventListDrawer.STATE_SELECT_ITEM){
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

            if(_this.isActive() && _this.model.getCurrentFocusedStatement() == RelatedEventListDrawer.STATE_BUTTON_GROUP) {
                buttonGroup.getFocusedButton().setFocus();
            }
        }

    };


    RelatedEventListDrawer.prototype = Object.create(Drawer.prototype);


    RelatedEventListDrawer.STATE_SELECT_ITEM = 0;
    RelatedEventListDrawer.STATE_BUTTON_GROUP = 1;


    return RelatedEventListDrawer;
});
