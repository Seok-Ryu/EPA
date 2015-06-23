define(["framework/View", "framework/event/CCAEvent",
    "ui/menuViewGroup/clock/ClockDrawer", "ui/menuViewGroup/clock/ClockModel"],
    function (View, CCAEvent, ClockDrawer, ClockModel) {

        var _this = this;
        var clockIntervalId = null;

        var INTERVAL_TIME = 1000 * 60;

        var ClockView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        }
        ClockView.prototype = Object.create(View.prototype);
        ClockView.prototype.onInitialize = function () {
            this.model = new ClockModel();
            this.drawer = new ClockDrawer(this.getID(), this.model);
        }
        ClockView.prototype.onStart = function (param) {
            _this = this;
            cancelClockInterval();
        }

        ClockView.prototype.onAfterStart= function () {
            this.startDrawer();
            startClockInterval();
        }

        ClockView.prototype.onResume = function (param) {
            startClockInterval();
        }

        ClockView.prototype.onPause = function (param) {
            cancelClockInterval();
        }

        ClockView.prototype.onStop = function (param) {
            cancelClockInterval();
        }

        ClockView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;
            switch (keyCode) {
                case tvKey.KEY_UP:
                case tvKey.KEY_DOWN:
                case tvKey.KEY_LEFT:
                case tvKey.KEY_BACK:
                case tvKey.KEY_EXIT:
                case tvKey.KEY_RIGHT:
                case tvKey.KEY_ENTER:
                    break;
                default:
                    break;
            }
        }

        function startClockInterval() {
            setInterval(function() {
                _this.drawer.repaint();
            }, INTERVAL_TIME);
        }

        function cancelClockInterval() {
            clearInterval(clockIntervalId);
            clockIntervalId = null;
        }

        return ClockView;
    });
