define(["framework/Drawer"],
    function (Drawer) {
        var PortalMenuListDrawer = function (_id, _model) {
            Drawer.call(this, _id, _model);

            var _this = this;
            var layoutTemplate = new EJS({url: 'js/ui/menuViewGroup/portalMenuList/LayoutTemplate.ejs'})
            var listTemplate = new EJS({url: 'js/ui/menuViewGroup/portalMenuList/ListTemplate.ejs'});

            PortalMenuListDrawer.prototype.onCreateLayout = function () {
                //var result = new EJS({url: 'js/ui/menuViewGroup/portalMenuList/LayoutTemplate.ejs'}).render({model: this.model});
                //this.getContainer().html(result);
                layoutTemplate.update(this.getContainer()[0], {model:this.model});
            }

            PortalMenuListDrawer.prototype.onPaint = function () {
                //var result = new EJS({url: 'js/ui/menuViewGroup/portalMenuList/ListTemplate.ejs'}).render({model: this.model});
                //
                //$('#main_bg .menu_list').html(result);
                listTemplate.update($('#main_bg .menu_list')[0], {model: this.model});
            }

            PortalMenuListDrawer.prototype.onAfterPaint = function () {
                drawFocusOnCategory();
            }

            function getFocusIndexItem() {
                if(!_this.model.isNullData()) {
                    var focusIndex = _this.model.getVIndex();
                    var listItems = $('#main_bg .menu_box');
                    var focusItem = listItems.eq(focusIndex);
                    return focusItem;
                } else {
                    return null;
                }
            }

            function drawFocusOnCategory() {
                var focusItem = getFocusIndexItem();

                if(focusItem) {
                    if(_this.isActive()) {
                        _this.setFocus(focusItem);
                    } else {
                        _this.setSelect(focusItem);
                    }
                }
            }
        }

        PortalMenuListDrawer.prototype = Object.create(Drawer.prototype);

        return PortalMenuListDrawer;
    });
