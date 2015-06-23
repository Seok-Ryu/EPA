define(["framework/ViewGroup", "framework/event/CCAEvent",
        "cca/SubEvent", "cca/DefineView",
        "service/Communicator",
        "ui/detailViewGroup/eventDetail/EventDetailView",
        "helper/DrawerHelper", "cca/PopupValues"
    ],
    function (ViewGroup, CCAEvent, SubEvent, DefineView,
              Communicator,
              EventDetailView,
              DrawerHelper, PopupValues) {

        var _this = null;
        var eventDetailView = null;

        var DetaillViewGroupManager = function (id) {
            ViewGroup.call(this, id);
            _this = this;
            this.onInitialize();
        }

        DetaillViewGroupManager.prototype = Object.create(ViewGroup.prototype);

        DetaillViewGroupManager.prototype.onInitialize = function () {
            eventDetailView = new EventDetailView(DefineView.EVENT_DETAIL_VIEW);
            addEventListener();
        }

        DetaillViewGroupManager.prototype.onStart = function (param) {
            startViewGroup(param);
        }
        DetaillViewGroupManager.prototype.onStop = function () {
            eventDetailView.stop();
        }
        DetaillViewGroupManager.prototype.onHide = function () {
        }

        DetaillViewGroupManager.prototype.onShow = function () {
            eventDetailView.show();
        }

        DetaillViewGroupManager.prototype.onUpdate = function () {

        }

        DetaillViewGroupManager.prototype.onResume = function (param) {
            eventDetailView.resume(param);
        }


        function addEventListener() {
            removeEventListener();
            $(eventDetailView).bind(CCAEvent.CHANGE_VIEW, eventDetailViewChangeViewListener);
            $(eventDetailView).bind(CCAEvent.COMPLETE_TO_DRAW_VIEW, eventDetailCompleteDrawListener);
            $(eventDetailView).bind(CCAEvent.CHANGE_VIEWGROUP, eventDetailChangeViewGroupListener);
            $(eventDetailView).bind(CCAEvent.FINISH_VIEWGROUP, eventDetailFinishViewListener);
            $(eventDetailView).bind(CCAEvent.FINISH_APP, eventFinishAppListener);
        }

        function removeEventListener() {
            $(eventDetailView).unbind();
        }

        function startViewGroup(param) {
            eventDetailView.start(param);
            eventDetailView.active();
        }

        function eventDetailViewChangeViewListener(event, param) {

        }

        function eventDetailFinishViewListener(event, param) {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP, param);
        }

        function eventFinishAppListener(event, param) {
            _this.sendEvent(CCAEvent.FINISH_APP, param);
        }

        function eventDetailCompleteDrawListener(event, param) {
            eventDetailView.showForCloud();
            /*setTimeout(function() {
                _this.sendEvent(CCAEvent.COMPLETE_TO_DRAW_VIEW)
            },2000)*/
            _this.sendEvent(CCAEvent.COMPLETE_TO_DRAW_VIEW);
        }

        function eventDetailChangeViewGroupListener(event, param) {
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
        }

        return DetaillViewGroupManager;
    });