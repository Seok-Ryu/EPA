define(["service/EPAInfoManager", "service/STBInfoManager"],
    function (EPAInfoManager, STBInfoManager) {
        var CommunicatorHelper = {};
        var domainId = "cj";
        var transactionId = '200';

        CommunicatorHelper.setTransactionID = function (_transactionId) {
            transactionId = _transactionId;
        }

        CommunicatorHelper.getTransactionID = function () {
            return transactionId;
        }

        CommunicatorHelper.getHASURL = function (apiName) {
            var ip = EPAInfoManager.getHASIP();
            var port = EPAInfoManager.getHASPort();
            var api = apiName + ".json";
            return 'http://' + ip + ':' + port + '/HApplicationServer/' + api
        }

        CommunicatorHelper.getEventServerURL = function (apiName) {
            var ip = EPAInfoManager.getEventServerIP();
            var port = EPAInfoManager.getEventServerPort();
            var api = apiName + ".json";
            return 'http://' + ip + ':' + port + '/HApplicationServer/eventPortal/' + api
        }

        CommunicatorHelper.getHASDefaultParameter = function (version, _transactionId) {
            var version = version ? version : 1;
            var requestID = _transactionId ? _transactionId : transactionId

            return {version: version, transactionId: requestID};
        }

        CommunicatorHelper.getHASDefaultParameterWithTerminalKey = function (version, _transactionId) {
            var data = this.getHASDefaultParameter(version, _transactionId);
            data.terminalKey = EPAInfoManager.getTerminalKey();

            return data;
        }

        CommunicatorHelper.getDataForRequestTerminalKey = function () {
            var data = this.getHASDefaultParameter();
            data.terminalId = STBInfoManager.getMacAddress();
            data.hardwareModel = STBInfoManager.getModelName();
            data.clientVersion = EPAInfoManager.getVersion();

            return data;
        }

        CommunicatorHelper.createDataForRequestByParameterList = function (data, parameterList) {
            var parameterNameList = this.getParameterNameList(parameterList);
            for (var i = 0, max = parameterNameList.length; i < max; i++) {
                if (parameterNameList[i] != null && parameterList[i] != null && typeof parameterList[i] != "function") {
                    data[parameterNameList[i]] = parameterList[i];
                }
            }
            return data;
        }
        CommunicatorHelper.getParameterNameList = function (parameterList) {
            var args = /\(([^)]+)/.exec(parameterList.callee.toString());
            var parameterNameList = null;
            if (args[1]) {
                parameterNameList = args[1].split(/\s*,\s*/);
            }
            return parameterNameList;
        }

        return CommunicatorHelper;
    });
