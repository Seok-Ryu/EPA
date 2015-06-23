define(["framework/Drawer", "cca/DefineView"], function(Drawer, DefineView) {
    var WinnerListDrawer = function(_id, _model) {
        Drawer.call(this, _id, _model);
        var _this = this;
        var layoutTemplate = new EJS({url: 'js/ui/popupViewGroup/winnerList/LayoutTemplate.ejs'});
        var listTemplate = new EJS({url: 'js/ui/popupViewGroup/winnerList/ListTemplate.ejs'});

        WinnerListDrawer.prototype.onCreateLayout = function () {
            this.createContainer(DefineView.POPUP_VIEWGROUP_MANAGER);
            //var result = new EJS({url: 'js/ui/popupViewGroup/winnerList/LayoutTemplate.ejs'}).render({model:this.model});
            //this.getContainer().html(result);
            layoutTemplate.update(this.getContainer()[0], {model:this.model});

        };

        WinnerListDrawer.prototype.onPaint = function () {
            //var result = new EJS({url: 'js/ui/popupViewGroup/winnerList/ListTemplate.ejs'}).render({model:this.model});
            //var listLayout = this.getContainer().find($('#popup_list_1 .bg_white'));

            //listLayout.empty();
            //listLayout.html(result);

            var listContainer = this.getContainer().find('#popup_list_1 .bg_white')[0];
            listTemplate.update(listContainer, {model:this.model });
        };
    };
    WinnerListDrawer.prototype = Object.create(Drawer.prototype);
    return WinnerListDrawer;
});