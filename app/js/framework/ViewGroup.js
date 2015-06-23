define(["framework/event/CCAEvent", "framework/utils/TaskManager"], function (CCAEvent, TaskManager) {
    var ViewGroup = function (id) {
        this.id = id;
        this.viewList = new Array();
        this.currentView = null;
    };

    ViewGroup.prototype.getID = function () {
        return this.id;
    }

    ViewGroup.prototype.onInitialize = function (param) {
    }

    ViewGroup.prototype.onStart = function (param) {
    }

    ViewGroup.prototype.onBeforeStart = function (param) {
    }

    ViewGroup.prototype.onAfterStart = function () {
    }

    ViewGroup.prototype.start = function (param) {
        TaskManager.addHistory(this);

        this.onBeforeStart(param);
        this.onStart(param);
        this.onAfterStart();
    }

    ViewGroup.prototype.onStop = function () {
    }

    ViewGroup.prototype.onBeforeStop = function () {
    }

    ViewGroup.prototype.onAfterStop = function () {
    }

    ViewGroup.prototype.stop = function (param) {
        this.onBeforeStop(param);
        this.onStop(param);
        this.onAfterStop();
    }

    ViewGroup.prototype.onPause = function () {
    }

    ViewGroup.prototype.onBeforePause = function () {
    }

    ViewGroup.prototype.onAfterPause = function () {
    }

    ViewGroup.prototype.pause = function () {
        this.onBeforePause();
        this.onPause();
        this.onAfterPause();
    }

    ViewGroup.prototype.onResume = function () {
    }

    ViewGroup.prototype.onBeforeResume = function () {
    }

    ViewGroup.prototype.onAfterResume = function () {
    }

    ViewGroup.prototype.resume = function (param) {
        this.onBeforeResume(param);
        this.onResume(param);
        this.onAfterResume();
    }

    ViewGroup.prototype.onShow = function () {
    }

    ViewGroup.prototype.onBeforeShow = function () {
    }

    ViewGroup.prototype.onAfterShow = function () {
    }

    ViewGroup.prototype.show = function (param) {
        this.onBeforeShow();
        this.onShow();
        this.onAfterShow();
    }

    ViewGroup.prototype.onHide = function () {
    }

    ViewGroup.prototype.onBeforeHide = function () {
    }

    ViewGroup.prototype.onAfterHide = function () {
    }

    ViewGroup.prototype.hide = function (param) {
        this.onBeforeHide();
        this.onHide();
        this.onAfterHide();
    }

    ViewGroup.prototype.onUpdate = function () {
    }

    ViewGroup.prototype.onBeforeUpdate = function () {
    }

    ViewGroup.prototype.onAfterUpdate = function () {
    }

    ViewGroup.prototype.update = function (param) {
        this.onBeforeUpdate(param);
        this.onUpdate(param);
        this.onAfterUpdate();
    }

    ViewGroup.prototype.onKeyDown = function (event) {
    }

    ViewGroup.prototype.getCurrentView = function () {
        return this.currentView;
    }

    ViewGroup.prototype.sendEvent = function (type, param) {
        //이벤트를 this 가 아니라 window 의 특정 개체에 전달한다면 (전역) 해당 이벤트를 바인딩 하고 있는 뷰그룹간 또는 뷰간 직접 이벤트 전달 가능할듯하다.
        $(this).trigger(type, param);
    }


    return ViewGroup;
});