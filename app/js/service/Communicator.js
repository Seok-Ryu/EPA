define(["service/EPAInfoManager", "service/STBInfoManager", "helper/CommunicatorHelper", "helper/StructureHelper"],
    function (EPAInfoManager, STBInfoManager, CommunicatorHelper, StructureHelper) {
        var Communicator = {};
        var HAS_SUCCESS_RESULT_CODE = 100;
        var POST = "post";
        var GET = "get";
        var TIMEOUT_TIME = 5000;

        var lastRequest = null;
        /*Communicator.requestID = 0;

         Communicator.increaseRequestID = function() {

         }

         Communicator.increaseRequestID = function() {

         }*/

        Communicator.setRequestID = function (requestID) {
            CommunicatorHelper.setTransactionID(requestID);
        }

        Communicator.getRequestID = function () {
            return CommunicatorHelper.getTransactionID();
        }

        function requestByPOST(url, data, isAsync, callback, dataType) {
            if (dataType == null) {
                dataType = 'json';
            }

            jQuery.ajaxSettings.traditional = true;

            lastRequest = $.ajax({
                url: url,
                data: data,
                async: isAsync,
                dataType: dataType,
                type: GET,
                timeout: TIMEOUT_TIME,
                success: function (response) {
                    console.info("requestData Sucess!!");
                    lastRequest = null;
                    callback(response);
                },
                error: function (response) {
                    console.info("requestData Fail!!");
                    lastRequest = null;
                    callback(response);
                }
            });
        }

        function abortRequest() {
            if (lastRequest != null) {
                lastRequest.abort();
            }
        }

        Communicator.isSuccessResponseFromHAS = function (response) {
            return response != null && response.resultCode == HAS_SUCCESS_RESULT_CODE;
        }
        Communicator.isCorrectRequestID = function (response) {
            return response != null && CommunicatorHelper.getTransactionID() == response.transactionId;
        }

        Communicator.isCorrectTransactionID = function (transactionId, response) {
            return transactionId == response.transactionId;
        }

        Communicator.createDataForRequestByParameterListTest = function (value1, value2, value3) {
            var data = CommunicatorHelper.createDataForRequestByParameterList({}, arguments);
            return data;
        }

        Communicator.requestTerminalKey = function (callbackFunction) {
            var url = CommunicatorHelper.getHASURL("authenticateClient");
            var data = CommunicatorHelper.getDataForRequestTerminalKey();
            requestByPOST(url, data, false, function (response) {
                callbackFunction(response);
            });
        }


        Communicator.requestAssetInfo = function (callbackFunction, assetId, assetProfile) {
            var url = CommunicatorHelper.getHASURL("getAssetInfo");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                callbackFunction(response);
            });
        }

        Communicator.requestGetAssetListByContentGroupId = function (callbackFunction, assetProfile, contentGroupId, startItemIndex, pageSize, indexRotation) {
            var url = CommunicatorHelper.getHASURL("getAssetListByContentGroupId");
            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                response.startItemIndex = startItemIndex;

                callbackFunction(response);
            });
        }

        Communicator.requestGetContentGroupList = function (callbackFunction, contentGroupProfile, categoryId, startItemIndex, pageSize) {
            var url = CommunicatorHelper.getHASURL("getContentGroupList");
            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                response.startItemIndex = startItemIndex;

                callbackFunction(response);
            });
        }

        Communicator.requestGetPortalMenuList = function (callbackFunction) {
            var url = CommunicatorHelper.getEventServerURL("getPortalMenuList");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                callbackFunction(StructureHelper.createportalMenuListStructure(response));
            });
        }

        Communicator.requestGetPortalEventList = function (callbackFunction, portalMenuId, eventProfile, startItemIndex, pageSize, indexRotation) {
            var url = CommunicatorHelper.getEventServerURL("getPortalEventList");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                response.startItemIndex = startItemIndex;

                callbackFunction(StructureHelper.createEventStructure(response));
            });
        }

        Communicator.requestGetMyEventList = function (callbackFunction, eventProfile, startItemIndex, pageSize, indexRotation) {
            var url = CommunicatorHelper.getEventServerURL("getMyPortalEventList");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                response.startItemIndex = startItemIndex;

                callbackFunction(StructureHelper.createEventStructure(response));
            });
        }

        Communicator.requestGetPortalNoticeList = function (callbackFunction, portalMenuId, startItemIndex, pageSize, indexRotation) {
            var url = CommunicatorHelper.getEventServerURL("getPortalNoticeList");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                callbackFunction(response);
            });
        }

        Communicator.requestGetEventInfo = function (callbackFunction, eventId, eventProfile) {
            var url = CommunicatorHelper.getEventServerURL("getPortalEventInfo");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);


            requestByPOST(url, data, true, function (response) {
                    callbackFunction(StructureHelper.createEventStructure(response));
            });
        }

        Communicator.requestGetRelatedEventListForActionTarget = function (callbackFunction, eventId, assetId, productId, goodId) {
            var url = CommunicatorHelper.getEventServerURL("getRelatedPortalEventList");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                callbackFunction(StructureHelper.createRelatedEventListStructure(response));
            });
        }

        Communicator.requestGetUncheckedWinEventCount = function (callbackFunction, subscriberId) {
            var url = CommunicatorHelper.getEventServerURL("getUncheckedWinEventCount");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                callbackFunction(response);
            });
        }


        Communicator.requestGetEnrollReservationInfo = function (callbackFunction, eventId) {
            var url = CommunicatorHelper.getEventServerURL("getEnrollReservationInfo");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                callbackFunction(StructureHelper.createEnrollReservationInfoStructure(response));
            });
        }

        Communicator.requestDoPrizeReceipt = function (callbackFunction, eventId, phoneNumber) {
            var url = CommunicatorHelper.getEventServerURL("doPrizeReceiptConfirm");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);


            requestByPOST(url, data, true, function (response) {
                callbackFunction(response);
            });
        }

        Communicator.requestDoWinConfirm = function (callbackFunction, eventId) {
            var url = CommunicatorHelper.getEventServerURL("doWinConfirm");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);


            requestByPOST(url, data, true, function (response) {
                callbackFunction(response);
            });
        }

        Communicator.requestDoManualEnroll = function (callbackFunction,  eventId, phoneNumber) {
            var url = CommunicatorHelper.getEventServerURL("doConfirmEnrollReservation");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);


            requestByPOST(url, data, true, function (response) {
                callbackFunction(response);
            });
        }

        Communicator.requestGetWinnerList = function (callbackFunction, eventId, pageSize, pageIndex) {
            var url = CommunicatorHelper.getEventServerURL("getWinnerList");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                callbackFunction(StructureHelper.createWinnerListStructure(response));
            });
        }

        Communicator.requestGetWinnerListByPageIndex = function (callbackFunction, eventId, pageIndex, pageSize) {
            var url = CommunicatorHelper.getEventServerURL("getWinnerList");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                callbackFunction(response);
            });
        }

        Communicator.requestGetEventActionTargetList = function (callbackFunction, eventId) {
            var url = CommunicatorHelper.getEventServerURL("getPortalEventActionTargetList");

            var data = CommunicatorHelper.getHASDefaultParameterWithTerminalKey();
            data = CommunicatorHelper.createDataForRequestByParameterList(data, arguments);

            requestByPOST(url, data, true, function (response) {
                callbackFunction(StructureHelper.createEventActionTargetStructure(response));
            });
        }


        return Communicator;
    });