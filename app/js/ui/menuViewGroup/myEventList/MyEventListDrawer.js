define(["framework/Drawer", "helper/DrawerHelper", "cca/type/PortalMenuType", "framework/event/CCAEvent",
    "helper/UIHelper"],
    function (Drawer, DrawerHelper, PortalMenuType, CCAEvent, UIHelper) {
        var MyEventListDrawer = function (_id, _model) {
            Drawer.call(this, _id, _model);

            var _this = this;
            var isFirstDraw = false;
            var listTemplate = new EJS({url: 'js/ui/menuViewGroup/myEventList/ListTemplate.ejs'});

            MyEventListDrawer.prototype.onCreateLayout = function () {
                this.createTempContainer();
                isFirstDraw = true;
            }

            MyEventListDrawer.prototype.onPaint = function () {
                listTemplate.update(this.getContainer()[0], {model: this.model, UIHelper:UIHelper});

                //var result = new EJS({url: 'js/ui/menuViewGroup/myEventList/ListTemplate.ejs'}).render({model: this.model, UIHelper:UIHelper});
                //this.getContainer().html(result);
            }

            MyEventListDrawer.prototype.onAfterPaint = function () {
                drawFocusOnEvent();
                drawScroll();
                sendCompleteDrawEvent();
            }

            MyEventListDrawer.prototype.onDrawForCloud = function () {
                cleanListTypeContainer();
                this.changeContainer($('#area_banner_c'));
                this.repaint();
            }

            function cleanListTypeContainer() {
                $('#area_banner_a').html("")
                $('#area_banner_b').html("")
                $('#area_banner_c').html("")
            }

            function sendCompleteDrawEvent() {
                if(isFirstDraw) {
                    isFirstDraw = false;
                    _this.sendEvent(CCAEvent.COMPLETE_TO_DRAW_VIEW);
                }
            }
            function getFocusIndexItem() {
                if(!_this.model.isNullData()) {
                    var focusIndex = _this.model.getVIndex();
                    var listItems = _this.container.find('.bg_list .banner');
                    var focusItem = listItems.eq(focusIndex);
                    return focusItem;
                } else {
                    return null;
                }
            }

            function drawFocusOnEvent() {
                var focusItem = getFocusIndexItem();

                if(focusItem) {
                    if(_this.isActive()) {
                        _this.setFocus(focusItem);
                    } else {
                        _this.setUnFocus(focusItem);
                    }
                }
            }

            function drawScroll() {
                if(_this.isActive()) {
                    if(_this.model.getTotalCount() >= _this.model.getVVisibleSize()) {
                        DrawerHelper.drawScroll(_this.model.getVFocusIndex(), _this.model.getTotalCount());
                    }
                } else {
                    $("#bg_scroll").hide();
                }
            }

        }

        MyEventListDrawer.prototype = Object.create(Drawer.prototype);

        return MyEventListDrawer;
    });
