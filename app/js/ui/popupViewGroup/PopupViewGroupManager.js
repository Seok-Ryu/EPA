define(["framework/ViewGroup", "framework/event/CCAEvent",
        "cca/SubEvent", "cca/DefineView",
        "service/Communicator",
        "ui/popupViewGroup/enrolledItemList/EnrolledItemListView", "ui/popupViewGroup/relatedEventList/RelatedEventListView",
        "ui/popupViewGroup/winnerList/WinnerListView", "ui/popupViewGroup/collectPhoneNumber/CollectPhoneNumberView", "ui/popupViewGroup/availableItemListToEnroll/AvailableItemListToEnrollView",
        "ui/popupViewGroup/confirmCollectPhoneNumber/ConfirmCollectPhoneNumberView",
        "ui/popupViewGroup/agreeRegulation/AgreeRegulationView", "ui/popupViewGroup/alertDialog/AlertDialogView"],
    function (ViewGroup, CCAEvent, SubEvent, DefineView,
              Communicator, EnrolledItemListView, RelatedEventListView, WinnerListView, CollectPhoneNumberView, AvailableItemListToEnrollView, ConfirmCollectPhoneNumberView, AgreeRegulationView, AlertDialogView) {

        var _this = null;
        var relatedEventListView = null;
        var enrolledItemListView = null;
        var winnerListView = null;
        var collectPhoneNumberView = null;
        var availableItemListToEnrollView = null;
        var confirmCollectPhoneNumberView = null;
        var agreeRegulationView = null;
        var alertDialogView = null;

        var currentPopupView = null;

        var PopupViewGroupManager = function (id) {
            ViewGroup.call(this, id);
            _this = this;
            this.onInitialize();
        }

        PopupViewGroupManager.prototype = Object.create(ViewGroup.prototype);

        PopupViewGroupManager.prototype.onInitialize = function () {

            relatedEventListView=new RelatedEventListView(DefineView.RELATED_EVENT_LIST_VIEW);
            enrolledItemListView = new EnrolledItemListView(DefineView.ENROLLED_ITEM_LIST_VIEW);
            winnerListView = new WinnerListView(DefineView.WINNER_LIST_VIEW);
            availableItemListToEnrollView = new AvailableItemListToEnrollView(DefineView.AVAILABLE_ITEM_LIST_TO_ENROLL_VIEW);
            collectPhoneNumberView = new CollectPhoneNumberView(DefineView.COLLECT_PHONENUMBER);
            confirmCollectPhoneNumberView = new ConfirmCollectPhoneNumberView(DefineView.CONFIRM_COLLECT_PHONENUMBER);
            agreeRegulationView = new AgreeRegulationView(DefineView.AGREE_REGULATION);
            alertDialogView = new AlertDialogView(DefineView.ALERT_DIALOG);
            addEventListener();
        }

        PopupViewGroupManager.prototype.onStart = function (param) {
            getTargetView(param);
            startViewGroup(param);
        }

        PopupViewGroupManager.prototype.onStop = function () {
            currentPopupView.stop();
        }

        PopupViewGroupManager.prototype.onHide = function () {

        }

        PopupViewGroupManager.prototype.onShow = function () {

        }

        PopupViewGroupManager.prototype.onUpdate = function () {

        }

        PopupViewGroupManager.prototype.testKYJ = function (param) {
            //availableEventListToEnrollView.start(param);
            //availableEventListToEnrollView.active();
            //availableItemListToEnrollView.start(param);
            //availableItemListToEnrollView.active();
        }

        PopupViewGroupManager.prototype.testPYJ = function (param) {
            console.log("popupVieGroupManager Start");
            //enrolledItemListView.start(param);
            //enrolledItemListView.active();
            //winnerListView.start(param);
            //winnerListView.active();
            //collectionPhoneNumberView.start(param);
            //collectionPhoneNumberView.active();
            getTargetView(param);
            startViewGroup(param);
        }

        function getTargetView(param) {

            switch (param.targetView) {
                case DefineView.RELATED_EVENT_LIST_VIEW:
                    currentPopupView = relatedEventListView;
                    break;
                case DefineView.ENROLLED_ITEM_LIST_VIEW:
                    currentPopupView = enrolledItemListView;
                    break;
                case DefineView.WINNER_LIST_VIEW:
                    currentPopupView = winnerListView;
                    break;
                case DefineView.AVAILABLE_ITEM_LIST_TO_ENROLL_VIEW:
                    currentPopupView = availableItemListToEnrollView;
                    break;
                case DefineView.AGREE_REGULATION:
                    currentPopupView = agreeRegulationView;
                    break;
                case DefineView.COLLECT_PHONENUMBER:
                    currentPopupView = collectPhoneNumberView;
                    break;
                case DefineView.CONFIRM_COLLECT_PHONENUMBER:
                    currentPopupView = confirmCollectPhoneNumberView;
                    break;
                case DefineView.ALERT_DIALOG:
                    currentPopupView = alertDialogView;
                    break;
                default  :
                    break;
            }
        }


        function addEventListener() {
            removeEventListener();

            $(availableItemListToEnrollView).bind(CCAEvent.FINISH_VIEWGROUP, popupFinishViewGroupListener);
            $(availableItemListToEnrollView).bind(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, popupFinishViewGroupWithResultListener);

            $(enrolledItemListView).bind(CCAEvent.FINISH_VIEWGROUP, popupFinishViewGroupListener);

            $(winnerListView).bind(CCAEvent.FINISH_VIEWGROUP, popupFinishViewGroupListener);

            $(relatedEventListView).bind(CCAEvent.FINISH_VIEWGROUP, popupFinishViewGroupListener);
            $(relatedEventListView).bind(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, popupFinishViewGroupWithResultListener);

            $(agreeRegulationView).bind(CCAEvent.CHANGE_VIEW, popupChangeViewListener);
            $(agreeRegulationView).bind(CCAEvent.FINISH_VIEWGROUP, popupFinishViewGroupListener);

            $(collectPhoneNumberView).bind(CCAEvent.CHANGE_VIEW, popupChangeViewListener);
            $(collectPhoneNumberView).bind(CCAEvent.FINISH_VIEWGROUP, popupFinishViewGroupListener);

            $(confirmCollectPhoneNumberView).bind(CCAEvent.CHANGE_VIEW, popupChangeViewListener);
            $(confirmCollectPhoneNumberView).bind(CCAEvent.FINISH_VIEWGROUP, popupFinishViewGroupListener);
            $(confirmCollectPhoneNumberView).bind(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, popupFinishViewGroupWithResultListener);
           
            $(alertDialogView).bind(CCAEvent.FINISH_VIEWGROUP, popupFinishViewGroupListener);
            $(alertDialogView).bind(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, popupFinishViewGroupWithResultListener);
        }

        function removeEventListener() {
            $(availableItemListToEnrollView).unbind();
            $(enrolledItemListView).unbind();
            $(winnerListView).unbind();
            $(relatedEventListView).unbind();
            $(alertDialogView).unbind();
        }

        function startViewGroup(param) {
            currentPopupView.start(param);
            currentPopupView.active();
        }

        function popupFinishViewGroupListener(event, param) {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP, param);
        }

        function popupFinishViewGroupWithResultListener(event, param){
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP_WITH_RESULT, param);
        }

        function popupChangeViewListener(event, param) {
            currentPopupView.stop();
            getTargetView(param);
            startViewGroup(param);
        }

        return PopupViewGroupManager;
    });