define(function () {
    var STBInfoManager = {};

    var macAddress = "";
    var smartCardId = "";
    var numberOfCallCenter = "";
    var modelNumber = "1234-5678"
    var soId = "";
    var subscribeId = "";

    STBInfoManager.initialize = function (data) {
        console.info("STBInfoManager, initialize");
        if(data != null) {
            macAddress = data['mac'] ? data['mac'] : "";
            modelNumber = data['STBModel'] ? data['STBModel'] : "";
            smartCardId = data['smartCardId'] ? data['smartCardId'] : "";
            //numberOfCallCenter = data['numberOfCallCenter'] ? data['numberOfCallCenter'] : "";
            subscribeId = data['subscriberId'] ? data['subscriberId'] : "";
            soId = data['SOCode'] ? data['SOCode'] : "";
        }
    }

    STBInfoManager.getMacAddress = function () {
        return macAddress;
    }

    STBInfoManager.getSmartCardId = function () {
        return smartCardId;
    }

    STBInfoManager.getModelName = function () {
        return modelNumber;
    }

    STBInfoManager.getNumberOfCallCenter = function () {
        return numberOfCallCenter;
    }

    STBInfoManager.getSoId = function () {
        return soId;
    }

    STBInfoManager.getSubscribeId = function () {
        return subscribeId;
    }

    STBInfoManager.getModelName = function () {
        return modelNumber;
    }

    STBInfoManager.hasAllNecessaryInformation = function () {
        return macAddress.length > 1 && soId.length > 0 && subscribeId.length > 0 && modelNumber.length > 0
    }

    return STBInfoManager;
});
