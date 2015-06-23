define(["framework/Drawer", "helper/UIHelper", "helper/DateHelper", "cca/DefineView"], function (Drawer, UIHelper, DateHelper, DefineView) {
    var EnrolledItemListDrawer = function (_id, _model) {
        Drawer.call(this, _id, _model);

        var _this = this;
        var layoutTemplate = new EJS({url: 'js/ui/popupViewGroup/enrolledItemList/LayoutTemplate.ejs'});
        var listTemplate = new EJS({url: 'js/ui/popupViewGroup/enrolledItemList/ListTemplate.ejs'});

        EnrolledItemListDrawer.prototype.onCreateLayout = function () {
            this.createContainer(DefineView.POPUP_VIEWGROUP_MANAGER);
            //var result = new EJS({url: 'js/ui/popupViewGroup/enrolledItemList/LayoutTemplate.ejs'}).render({model:this.model});
            //this.getContainer().html(result);
            layoutTemplate.update(this.getContainer()[0], {model:this.model, UIHelper:UIHelper});
        };

        EnrolledItemListDrawer.prototype.onPaint = function () {
            //var result = new EJS({url: 'js/ui/popupViewGroup/enrolledItemList/ListTemplate.ejs'}).render({model:this.model, UIHelper:UIHelper, DateHelper:DateHelper});
            //var listLayout = this.getContainer().find($('#popup_list_2 .bg_white'));
            var listContainer = this.getContainer().find('#popup_list_2 .bg_white')[0];
            listTemplate.update(listContainer, {model:this.model, UIHelper:UIHelper, DateHelper:DateHelper});
            //listLayout.empty();
            //listLayout.html(result);
        };

    };
    EnrolledItemListDrawer.prototype = Object.create(Drawer.prototype);
    return EnrolledItemListDrawer;
});