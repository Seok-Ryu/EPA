define(["framework/Drawer", "ui/popupViewGroup/agreeRegulation/AgreeRegulationModel"], function (Drawer, AgreeRegulationModel) {
    var AgreeRegulationDrawer = function (_id, _model) {
        Drawer.call(this, _id, _model);
        var _this = this;
        var scope = 0;
        var layoutTemplate = new EJS({url: 'js/ui/popupViewGroup/agreeRegulation/LayoutTemplate.ejs'});

        AgreeRegulationDrawer.prototype.onCreateLayout = function () {
            layoutTemplate.update(this.getContainer()[0], {model: this.model});
            scope = 0;
/*
            var result = new EJS({url: 'js/ui/popupViewGroup/agreeRegulation/LayoutTemplate.ejs'}).render({model: this.model});
            this.getContainer().html(result);*/
            setButtonElement();
        };

        AgreeRegulationDrawer.prototype.onAfterPaint = function () {
            drawButton();
            drawScrollBar()
        };

        function setButtonElement() {
            var buttonGroup = _this.model.getButtonGroup();
            var buttonElementList = $('#popup_phone_1 .bg_black >');
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

        function drawScrollBar() {
            var scrollArea = $(".scroll");
            var scrollAreaHeight = parseInt(scrollArea.css("height"));
            var bar = _this.getContainer().find('#popup_phone_1 .bg_white .scroll .bar');

            var maximumCount = getMaximumScrollCount();
            var currentCount = Math.floor(Math.abs(scope / 105));

            var scrollHeight = scrollAreaHeight / (maximumCount + 1);
            var scrollPosition = scrollHeight * currentCount;

            bar.css("height", scrollHeight);

            if(currentCount > 0) {
                bar.css("marginTop", scrollPosition);
            } else {
                bar.css("marginTop", 0);
            }

        }

        AgreeRegulationDrawer.prototype.moveToUp = function() {
            var targetItem = $(".tx_3");

            if(scope > 0) {
                scope -= 105;
                targetItem.scrollTop(scope);
            } else {
                targetItem.scrollTop(0);
            }
            drawScrollBar();
        };

        AgreeRegulationDrawer.prototype.moveToDown = function() {
            var targetItem = $(".tx_3");
            var scrollAreaHeight = targetItem[0].scrollHeight;

            var maximumCount = getMaximumScrollCount();
            var currentCount = Math.floor(Math.abs(scope / 105));
            var marginTop = currentCount / maximumCount * scrollAreaHeight ;

            if(scrollAreaHeight > marginTop) {
                scope += 105;
                targetItem.scrollTop(scope);
            }
            drawScrollBar();
        };

        function getMaximumScrollCount() {
            var targetItem = $(".tx_3");
            var targetItemHeight = parseInt(targetItem.css("height"));
            var scrollAreaHeight = targetItem[0].scrollHeight;

            var count = 0;

            while(scrollAreaHeight > targetItemHeight) {
                scrollAreaHeight -= 105;
                count++;
            }
            return count;
        }

    };

    AgreeRegulationDrawer.prototype = Object.create(Drawer.prototype);

    return AgreeRegulationDrawer;
});