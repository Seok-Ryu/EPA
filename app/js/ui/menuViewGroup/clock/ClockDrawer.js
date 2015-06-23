define(["framework/Drawer", "helper/DateHelper"],
    function (Drawer, DateHelper) {
        var ClockDrawer = function (_id, _model) {
            Drawer.call(this, _id, _model);

            var _this = this;
            var layoutTemplate = new EJS({url: 'js/ui/menuViewGroup/clock/LayoutTemplate.ejs'});

            ClockDrawer.prototype.onCreateLayout = function () {
                _this = this;
                this.setContainer($('#main_bg #area_info'));
                var result = new EJS({url: 'js/ui/menuViewGroup/clock/LayoutTemplate.ejs'}).render();
                this.getContainer().html(result);
                //console.log($('#main_bg #area_info'));
                //layoutTemplate.update(this.getContainer()[0]);
            }

            ClockDrawer.prototype.onPaint = function () {

            }

            ClockDrawer.prototype.onAfterPaint = function () {
                updateTime();
            }

            function updateTime() {
                var currentDate = new Date();

                var month = DateHelper.leadingZeros(currentDate.getMonth() + 1, 2);
                var date = DateHelper.leadingZeros(currentDate.getDate(), 2);
                var dayOfWeek = DateHelper.getDayOfWeek(currentDate);
                var hours = DateHelper.leadingZeros(currentDate.getHours(), 2);
                var minutes = DateHelper.leadingZeros(currentDate.getMinutes(), 2);

                _this.getContainer().find(".date").text(month + "." + date);
                _this.getContainer().find(".day").text("(" + dayOfWeek + ")");
                _this.getContainer().find(".time").text(hours + ":" + minutes);
            }

        }

        ClockDrawer.prototype = Object.create(Drawer.prototype);

        return ClockDrawer;
    });
