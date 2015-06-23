define(["framework/View", "framework/event/CCAEvent", "service/Communicator", "cca/DefineView",
    "ui/detailViewGroup/eventDetail/EventDetailDrawer", "ui/detailViewGroup/eventDetail/EventDetailModel",
    "service/EPAInfoManager", "service/STBInfoManager", "service/TotalEventStateManager",
    "cca/type/EnrollStatusType", "cca/type/EventStatusType", "framework/modules/ButtonGroup", "cca/customType/EntryType", "cca/PopupValues",
    "main/ExternalHandler", "cca/customType/CollectPurpose", "cca/customType/RelatedEventOpenType", "cca/type/EventActionTargetType", "cca/type/ProductType"],
    function (View, CCAEvent, Communicator, DefineView, EventDetailDrawer, EventDetailModel, EPAInfoManager, STBInfoManager, TotalEventStateManager,
              EnrollStatusType, EventStatusType, ButtonGroup, EntryType, PopupValues, ExternalHandler, CollectPurpose, RelatedEventOpenType, EventActionTargetType, ProductType) {

        var _this = this;
        var StringSources = null;

        var EventDetailView = function (id) {
            View.call(this, id);
            this.model = null;
            this.drawer = null;
            this.onInitialize();
        }
        EventDetailView.prototype = Object.create(View.prototype);
        EventDetailView.prototype.onInitialize = function () {
            this.model = new EventDetailModel();
            this.drawer = new EventDetailDrawer(this.getID(), this.model);
            StringSources = window.EPABase.StringSources;
        }
        EventDetailView.prototype.onStart = function (param) {
            _this = this;
            this.model.setEventId(param.eventId);
            this.model.setAssetId(param.assetId);
            this.model.setEntryPoint(param.entryPoint);
            this.model.setSourceView(param.sourceView);
        }

        EventDetailView.prototype.onRequestData = function () {
            requestGetEventInfo();
        }

        EventDetailView.prototype.onSetData = function (param) {

        }

        EventDetailView.prototype.onBeforeStop = function () {

        }
        EventDetailView.prototype.onResume = function (param) {
            console.log(param);
            if(param != null) {
                resumeProcess(param);
            } else {
                this.active();
            }
        }

        EventDetailView.prototype.onShowForCloud = function () {
            _this.drawer.drawForCloud();
            _this.show();
            /*setTimeout(function() {
                _this.drawer.drawForCloud();
            }, 1500)*/
        }

        EventDetailView.prototype.onKeyDown = function (event, param) {
            var keyCode = param.keyCode;
            var tvKey = window.TVKeyValue;

            var buttonGroup = _this.model.getButtonGroup();

            switch (keyCode) {
                case tvKey.KEY_UP:
                    if(hasButtonOnTextArea() && isButtonGroupState()) {
                        _this.keyNavigator.keyUp();
                        _this.drawer.repaint();
                    }
                    break;
                case tvKey.KEY_DOWN:
                    if(hasButtonOnTextArea() && !isButtonGroupState()) {
                        _this.keyNavigator.keyDown();
                        buttonGroup.setIndex(0);
                        _this.drawer.repaint();
                    }
                    break;
                case tvKey.KEY_LEFT:
                    if(isButtonGroupState()) {
                        buttonGroup.previous();
                        _this.drawer.repaint();
                    }
                    break;
                case tvKey.KEY_BACK:
                case tvKey.KEY_ESC:
                    finishDetailView();
                    break;
                case tvKey.KEY_EXIT:
                case tvKey.KEY_X:
                    sendChangeViewGroupToAlertDialog(PopupValues.EXIT_MENU);
                    break;
                case tvKey.KEY_RIGHT:
                    if(isButtonGroupState()) {
                        buttonGroup.next();
                        _this.drawer.repaint();
                    }
                    break;
                case tvKey.KEY_ENTER:
                    var buttonLabel = "";
                    if(isButtonGroupState()) {
                        buttonLabel = buttonGroup.getFocusedButton().getLabel();
                    } else {
                        buttonLabel = _this.model.getEventStatusValue().textFieldButtonLabel;
                    }
                    selectButtonHandler(buttonLabel);
                    break;
                default:
                    break;
            }
        }

        function sendCompleteDrawEvent() {
            _this.sendEvent(CCAEvent.COMPLETE_TO_DRAW_VIEW);
        }


        function sendFinishViewGroupEvent() {
            _this.sendEvent(CCAEvent.FINISH_VIEWGROUP);
        }

        function sendFinishAppGroupEvent() {
            _this.sendEvent(CCAEvent.FINISH_APP);
        }

        function requestGetEventInfo() {
            var eventProfile = 3;
            var eventId = _this.model.getEventId();

            Communicator.requestGetEventInfo(callbackForRequestGetEventInfo, eventId, eventProfile);
        }

        function requestGetEnrollReservationInfo() {
            var eventId = _this.model.getEventId();
            Communicator.requestGetEnrollReservationInfo(callbackForRequestGetEnrollReservationInfo, eventId);
        }

        function callbackForRequestGetEventInfo(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                _this.model.setEvent(response.portalEvent);
                _this.model.setShowWinner(response.isShowWinner);
                _this.model.setSubscriberEnrollDetailList(response.subscriberEnrollDetailList);

                requestGetEnrollReservationInfo();
            } else {
                sendChangeViewGroupToAlertDialog(PopupValues.RETRY_UNABLE_SYSTEM_ERROR);
            }
        }

        function callbackForRequestGetEnrollReservationInfo(response) {
            _this.model.setEnrollReservationInfo(response.enrollReservationInfo);
            setEventStatusValues();
            doWinConfirm();
            initializeModel();
            _this.startDrawer();
            _this.drawer.setInVisibleMode();

            if (_this.model.getEntryPoint() == EntryType.PLAY){
                requestGetRelatedEventListForActionTarget();
            } else{
                sendCompleteDrawEvent();
            }
        }

        function isFromRelatedEventPopupView() {
            return _this.model.getSourceView() == DefineView.RELATED_EVENT_LIST_VIEW;
        }


        function requestGetRelatedEventListForActionTarget(){
            var eventId = _this.model.getEventId();
            var assetId = _this.model.getAssetId();
            var productId = null;
            var goodId = null;
            if(_this.model.getEnrollReservationInfo()) {
                productId = _this.model.getEnrollReservationInfo().getProductId();
                goodId = _this.model.getEnrollReservationInfo().getGoodId();
            }

            //@Comment 해당이벤트를 포함하기위해 eventID 를 -1로 처리함
            eventId = "-1";
            Communicator.requestGetRelatedEventListForActionTarget(callbackForRequestGetRelatedEventListForActionTarget, eventId, assetId, productId, goodId);
        }

        function callbackForRequestGetRelatedEventListForActionTarget(response){
            if(Communicator.isSuccessResponseFromHAS(response)) {
                _this.model.setRelatedEventList(response.relatedPortalEventList);
                if (hasEnoughRelatedEvent() && !isFromRelatedEventPopupView()){
                    sendCompleteDrawEvent();
                    ChangeToRelatedEventListView(RelatedEventOpenType.ENTER);
                } else {
                    sendCompleteDrawEvent();
                }
            } else {
                sendCompleteDrawEvent();
            }
        }

        function hasEnoughRelatedEvent() {
            return getRelatedEventListSize() >= 1;
        }

        function getRelatedEventListSize(){
            var relatedEventListSize = 0;
            var relatedEventList = _this.model.getRelatedEventList();
            if(relatedEventList) {
                for (var i = 0; i < relatedEventList.length; i++){
                    if (relatedEventList[i].getEnrollStatus() != EnrollStatusType.FINISHED_ENROLL){
                        relatedEventListSize = relatedEventListSize + 1;
                    }
                }
            }

            return relatedEventListSize;
        }

        function initializeModel() {
            var model = _this.model;

            var verticalVisibleSize = hasButtonOnTextArea() ? 2 : 1;
            var horizonVisibleSize = 1;
            var verticalMaximumSize = verticalVisibleSize;
            var horizonMaximumSize = horizonVisibleSize;

            model.setSize(verticalVisibleSize, horizonVisibleSize, verticalMaximumSize, horizonMaximumSize);
            model.setRotate(false, false);
            model.setButtonGroup(getButtonGroup())
        }


        function setEventStatusValues() {
            var model = _this.model;
            TotalEventStateManager.initialize();
            TotalEventStateManager.setInformation(model.getEvent(), model.getEnrollReservationInfo(), model.isShowWinner(), model.getEntryPoint());
            TotalEventStateManager.setEventStatusValue();

            var eventStatusValue = TotalEventStateManager.getEventStatusValue();
            //console.log(eventStatusValue)
            model.setEventStatusValue(eventStatusValue);
        }


        function getButtonGroup() {
            var labelList = _this.model.getEventStatusValue().buttonLabelList;
            var buttonGroup = new ButtonGroup();
            buttonGroup.createButtonListByLabelList(labelList);
            if(!TotalEventStateManager.isNeedShowWinnerListButton()) {
                var winnerButtonIndex = buttonGroup.getButtonIndexByLabel(StringSources.ButtonLabel.SHOW_WINNER);
                if(winnerButtonIndex != -1) {
                    buttonGroup.getButton(winnerButtonIndex).deActive();
                }
            }
            return buttonGroup;
        }

        function finishDetailView() {
            if(EntryType.EVENT_LIST == _this.model.getEntryPoint()) {
                sendFinishViewGroupEvent();
            } else {
                //sendChangeViewGroupToAlertDialog(PopupValues.EXIT_MENU);
                var redirectCategoryId = _this.model.getEvent().getCloseBtnRedirectCategoryId();
                redirectToTargetCategory(redirectCategoryId);
            }
        }

        function finishAppView() {
            if(EntryType.EVENT_LIST == _this.model.getEntryPoint()) {
                sendFinishAppGroupEvent();
            } else {
                var redirectCategoryId = _this.model.getEvent().getCloseBtnRedirectCategoryId();
                redirectToTargetCategory(redirectCategoryId);
            }
        }

        function selectButtonHandler(buttonLabel) {
            switch (buttonLabel) {
                case StringSources.ButtonLabel.CLOSE:
                    if (isFromRelatedEventPopupView() && hasEnoughRelatedEvent()) {
                        ChangeToRelatedEventListView(RelatedEventOpenType.EXIT);
                    } else {
                        finishDetailView();
                    }
                    break;
                case StringSources.ButtonLabel.SHOW_WINNER:
                    sendChangeViewGroupEvent(DefineView.WINNER_LIST_VIEW);
                    break;
                case StringSources.ButtonLabel.START_EVENT:
                    doConfirmToEnroll();
                    break;
                case StringSources.ButtonLabel.CONFIRM_ENROLL:
                    doConfirmToEnroll();
                    break;
                case StringSources.ButtonLabel.EVENT_TARGET_CONTENT:
                    requestGetAvailableItemList();
                    break;
                case StringSources.ButtonLabel.RECEIVE_PRIZE:
                    doConfirmToReceiptPrize();
                    break;
                case StringSources.ButtonLabel.ENROLLED_CONTENT:
                    if (_this.model.getSubscriberEnrollDetailList().length > 0){
                        sendChangeViewGroupEvent(DefineView.ENROLLED_ITEM_LIST_VIEW);
                    }
                    break;
            }
        }

        function redirectToTargetCategory(categoryId) {
            ExternalHandler.redirectToCategory(categoryId);
        }

        function redirectToTargetAsset(assetId) {
            ExternalHandler.redirectToAsset(assetId);

        }

        function redirectToTargetProductByEventActionTarget(eventActionTarget) {
            var productType = eventActionTarget.getProductType();
            switch (productType) {
                case ProductType.RVOD:
                case ProductType.FOD:
                    redirectToTargetAsset(eventActionTarget.getRedirectAssetId());
                    break;
                case ProductType.SVOD:
                    ExternalHandler.redirectToSVOD(eventActionTarget.getTargetId(), eventActionTarget.getRedirectCategoryId());
                    break;
                case ProductType.SVODPACKAGE:
                    ExternalHandler.redirectToSVODPackage(eventActionTarget.getTargetId(), eventActionTarget.getRedirectCategoryId());
                    break;
                case ProductType.PACKAGE:
                    ExternalHandler.redirectToPackage(eventActionTarget.getRedirectCategoryId());
                    break;
                case ProductType.BUNDLE:
                    ExternalHandler.redirectToBundle(eventActionTarget.getTargetId());
                    break;
            }
        }

        function redirectToVODByEventActionTarget(eventActionTarget) {
            var targetType = eventActionTarget.getTargetType();
            switch (targetType) {
                case EventActionTargetType.ASSET:
                    redirectToTargetAsset(eventActionTarget.getTargetId());
                    break;
                case EventActionTargetType.CATEGORY:
                    redirectToTargetCategory(eventActionTarget.getTargetId());
                    break;
                case EventActionTargetType.PRODUCT:
                    redirectToTargetProductByEventActionTarget(eventActionTarget);
                    break;
            }
        }


        function requestGetAvailableItemList() {

            var eventId = _this.model.getEventId();
            Communicator.requestGetEventActionTargetList(callbackForRequestGetEventActionTargetList, eventId);
        }


        function callbackForRequestGetEventActionTargetList(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                _this.model.setEventActionTargetList(response.portalEventActionTargetList);
                if (_this.model.getEventActionTargetList().length > 1){
                    sendChangeViewGroupEvent(DefineView.AVAILABLE_ITEM_LIST_TO_ENROLL_VIEW);
                } else {
                    var eventActionTarget = _this.model.getEventActionTargetList()[0];
                    redirectToVODByEventActionTarget(eventActionTarget);
                }
            } else {
                sendChangeViewGroupToAlertDialog(PopupValues.SYSTEM_ERROR);
            }
        }

        function ChangeToRelatedEventListView(openType){
            _this.model.setRelatedEventOpenType(openType);
            var param = {
                targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                targetView: DefineView.RELATED_EVENT_LIST_VIEW,
                relatedEventList: _this.model.getRelatedEventList()
            };
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
        }

        function sendChangeViewGroupEvent(targetView) {
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, getParamObjectForViewGroupChangeEvent(targetView));
        }

        function getParamObjectForViewGroupChangeEvent(targetView) {
            var param = {targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER, targetView: targetView, eventId: _this.model.getEventId()};

            if (targetView == DefineView.AVAILABLE_ITEM_LIST_TO_ENROLL_VIEW) {
                param.eventTitle = _this.model.getEvent().getTitle();
                param.eventActionTargetList = _this.model.getEventActionTargetList();
            } else if (targetView == DefineView.ENROLLED_ITEM_LIST_VIEW) {
                param.subscriberEnrollDetailList = _this.model.getSubscriberEnrollDetailList();
            }

            return param;
        }

        function hasButtonOnTextArea() {
            if(_this.model.getEventStatusValue()) {
                return _this.model.getEventStatusValue().hasButtonOnTextField;
            } else {
                return false;
            }
        }

        function isButtonGroupState() {
            return hasButtonOnTextArea() ? EventDetailDrawer.STATE_BUTTON_GROUP == _this.model.getVIndex() : true;
        }

        function doConfirmToEnroll() {
            if(TotalEventStateManager.isCollectPhoneNumberForEnroll()) {
                _this.model.setCollectPurpose(CollectPurpose.START_EVENT);
                sendChangeViewGroupEvent(DefineView.AGREE_REGULATION);
            } else {
                doManualEnroll();
            }
        }

        function doManualEnroll() {
            var eventId = _this.model.getEventId();
            var phoneNumber = _this.model.getPhoneNumber();
            Communicator.requestDoManualEnroll(callbackForDomanualEnroll, eventId, phoneNumber);
        }

        function callbackForDomanualEnroll(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                if(TotalEventStateManager.isCollectPhoneNumberForEnroll()) {
                    sendChangeViewGroupToAlertDialog(PopupValues.COMPLETE_AGREEMENT);
                } else {
                    requestGetEventInfo();
                    _this.active();
                }
                xPushEnrollEvent();
            } else {
                sendChangeViewGroupToAlertDialog(PopupValues.SYSTEM_ERROR);
            }
        }

        function xPushEnrollEvent() {
            var eventId = _this.model.getEventId();
            ExternalHandler.xPushInfo(ExternalHandler.XPUSH_EVENT_ENROLL, eventId);
        }

        function doWinConfirm() {
            if(TotalEventStateManager.isNeedConfirmWinState()) {
                var eventId = _this.model.getEventId();
                Communicator.requestDoWinConfirm(callbackForDoWinConfirm, eventId);
            }
        }

        function callbackForDoWinConfirm() {

        }
        function doConfirmToReceiptPrize() {
            _this.model.setCollectPurpose(CollectPurpose.RECEIVE_PRIZE);
            sendChangeViewGroupEvent(DefineView.AGREE_REGULATION);
            //doPrizeReceipt();
        }

        function doPrizeReceipt() {
            var eventId = _this.model.getEventId();
            var phoneNumber = _this.model.getPhoneNumber();
            Communicator.requestDoPrizeReceipt(callbackForDoPrizeReceipt, eventId, phoneNumber);

        }

        function doAfterCollectNumber(param) {
            _this.model.setPhoneNumber(param.phoneNumber);

            var collectPurpose = _this.model.getCollectPurpose();
            if (collectPurpose == CollectPurpose.START_EVENT){
                doManualEnroll();
            } else if (collectPurpose == CollectPurpose.RECEIVE_PRIZE){
                doPrizeReceipt();
            } else {
                doManualEnroll();
            }
        }

        function callbackForDoPrizeReceipt(response) {
            if(Communicator.isSuccessResponseFromHAS(response)) {
                sendChangeViewGroupToAlertDialog(PopupValues.COMPLETE_AGREEMENT);
            } else {
                sendChangeViewGroupToAlertDialog(PopupValues.SYSTEM_ERROR);
            }
        }

        function sendChangeViewGroupToAlertDialog(popupValue) {
            var param = {
                targetViewGroup: DefineView.POPUP_VIEWGROUP_MANAGER,
                targetView: DefineView.ALERT_DIALOG,
                popupValue: popupValue};
            _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, param);
        }

        function resumeByAlertDialog(param) {
            var popupId = param.popupId;

            var resultLabel = param.result;
            var buttonLabels = window.EPABase.StringSources.ButtonLabel;

            switch (popupId) {
                case PopupValues.COMPLETE_AGREEMENT.popupId:
                    if(buttonLabels.CONFIRM == resultLabel) {
                        requestGetEventInfo();
                        _this.active();
                    }
                    break;
                case PopupValues.SERVICE_ERROR.popupId:
                case PopupValues.SYSTEM_ERROR.popupId:
                    _this.active();
                    break;
                case PopupValues.RETRY_UNABLE_SYSTEM_ERROR.popupId:
                    finishDetailView();
                    break;
                case PopupValues.EXIT_MENU.popupId:
                    if(buttonLabels.CONFIRM == resultLabel) {
                        finishAppView();
                    } else {
                        _this.active();
                    }
                    break;
            }
        }

        function resumeProcess(param) {
            var sourceView = param.sourceView;
            switch (sourceView) {
                case DefineView.RELATED_EVENT_LIST_VIEW:
                    resumeByRelatedEventListView(param);
                    break;
                case DefineView.AVAILABLE_ITEM_LIST_TO_ENROLL_VIEW:
                    var eventActionTarget = param.eventActionTarget;
                    redirectToVODByEventActionTarget(eventActionTarget);
                    _this.active();
                    break;
                case DefineView.ALERT_DIALOG:
                    resumeByAlertDialog(param);
                    break;
                case DefineView.CONFIRM_COLLECT_PHONENUMBER:
                    doAfterCollectNumber(param);
                    break;
            }
        }

        function resumeByRelatedEventListView(param) {
            if (param.eventId != null) {
                var params = {
                    targetViewGroup: DefineView.DETAIL_VIEWGROUP_MANAGER,
                    targetView: DefineView.EVENT_DETAIL_VIEW,
                    eventId: param.eventId,
                    entryPoint: _this.model.getEntryPoint(),
                    sourceView: param.sourceView
                };
                _this.sendEvent(CCAEvent.CHANGE_VIEWGROUP, params);
            } else {
                if(RelatedEventOpenType.EXIT == _this.model.getRelatedEventOpenType()) {
                    finishDetailView();
                } else {
                    _this.active();

                }
            }
        }

        EventDetailView.COLLECT_BEFORE_ENROLL_EVENT_STATE = 0;
        EventDetailView.COLLECT_AFTER_ENROLL_EVENT_STATE = 1;


        return EventDetailView;
    });
