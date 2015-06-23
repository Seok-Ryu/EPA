define(["framework/KeyNavigator", "framework/event/CCAEvent"], function (KeyNavigator, CCAEvent) {
    var View = function (id) {
        this.id = id;
        this.model = null;
        this.drawer = null;
        this.keyNavigator = null;

        //proto method
        View.prototype.getID = function () {
            return this.id;
        }
        View.prototype.onInitialize = function() {

        }
        View.prototype.onBeforeStart = function (param) {
        }
        View.prototype.onAfterStart = function () {
        }
        View.prototype.onStart = function (param) {
        }

        View.prototype.start = function (param) {
            this.onInitializeData();
            this.keyNavigator = new KeyNavigator(this.model);
            this.onBeforeStart(param);
            this.onStart(param);
            this.onRequestData(param);
            /*if(this.drawer) {
                this.drawer.onStart();
            }*/
            this.onAfterStart();
        }


        View.prototype.startDrawer = function () {
            if(this.drawer) {
                this.drawer.start();
            }
        }

        View.prototype.onInitializeData = function () {
            if (this.model) {
                this.model.initialize();
            }
        }

        View.prototype.onRequestData = function () {

        }
        View.prototype.onSetData = function (param) {

        }
        View.prototype.setData = function (param) {
            this.onSetData(param);
        }

        View.prototype.onUpdate = function () {

        }
        View.prototype.update = function () {
            this.onUpdate();
            if (this.drawer) {
                this.drawer.update();
            }
        }
        View.prototype.onShow = function () {

        }
        View.prototype.onBeforeShow = function () {

        }
        View.prototype.onAfterShow = function () {

        }

        View.prototype.show = function () {
            this.onBeforeShow();
            if (this.drawer) {
                this.drawer.show();
            }
            this.onShow();
            this.onAfterShow();
        }

        View.prototype.showForCloud = function() {
            this.onShowForCloud();

        }
        View.prototype.onShowForCloud = function() {

        }
        View.prototype.onPause = function () {

        }

        View.prototype.pause = function () {
            this.onPause();
        }

        View.prototype.onResume = function (param) {

        }

        View.prototype.resume = function (param) {
            this.onResume(param);
        }

        View.prototype.hide = function () {
            this.onHide();
            if (this.drawer) {
                this.drawer.hide();
            }
        }
        View.prototype.onHide = function () {

        }
        View.prototype.stop = function () {
            //this.onDeActive();
            this.onBeforeStop();
            if (this.drawer) {
                this.drawer.stop();
            }
            this.onInitializeData();
            this.onAfterStop();
        }
        View.prototype.onStop = function () {
        }

        View.prototype.onBeforeStop = function () {

        }
        View.prototype.onAfterStop = function () {

        }
        View.prototype.active = function () {
            this.onBeforeActive();
            if (this.drawer) {
                this.drawer.setActive(true);
            }
            $(window).unbind(CCAEvent.SEND_KEYEVENT);
            $(window).bind(CCAEvent.SEND_KEYEVENT, this.onKeyDown);
            this.onActive();
            this.onAfterActive();
        }

        View.prototype.onActive = function () {

        }
        View.prototype.onBeforeActive = function () {

        }
        View.prototype.onAfterActive = function () {

        }
        View.prototype.deActive = function () {
            this.onBeforeDeActive();
            if (this.drawer) {
                this.drawer.setActive(false);
            }
            $(window).unbind(CCAEvent.SEND_KEYEVENT);
            this.onAfterDeActive();
        }

        View.prototype.onDeActive = function () {

        }
        View.prototype.onBeforeDeActive = function () {

        }
        View.prototype.onAfterDeActive = function () {

        }

        View.prototype.isActive = function () {
            if (this.drawer) {
                return this.drawer.isActive();
            } else {
                return false;
            }
        }

        View.prototype.onMouseActive = function () {

        }

        View.prototype.onMouseDeActive = function () {

        }

        View.prototype.isVisible = function () {
            if (this.drawer) {
                return this.drawer.isVisible();
            } else {
                return false;
            }
        }


        View.prototype.sendEvent = function (type, param) {
            $(this).trigger(type, param);
        }

        View.prototype.onKeyDown = function (event, param) {
        }

    }

    return View;
});