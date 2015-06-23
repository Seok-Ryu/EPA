define(function () {
    //@ 싱글턴 객체로 사용하며 별도의 생성이 필요 없는 객체는 {} 로 정의함. this 로 내부 메소드 접근 불가능
    var EPAInfoManager = {};
    var terminalKey = "";
    var terminalKeyResultCode = "";

    EPAInfoManager.initialize = function () {
        console.info("initEPAInfo!");
        this.initTerminalKey();
    }

    EPAInfoManager.initTerminalKey = function () {
        console.info("initTerminalKey!");
        terminalKey = "";
        terminalKeyResultCode = "";
    }

    EPAInfoManager.setTerminalKey = function (_terminalKey) {
        terminalKey = _terminalKey;
    }

    EPAInfoManager.getTerminalKey = function () {
        return terminalKey;
    }

    EPAInfoManager.setTerminalKeyResultCode = function (_terminalKeyResultCode) {
        terminalKeyResultCode = _terminalKeyResultCode;
    }

    EPAInfoManager.getTerminalKeyResultCode = function () {
        return terminalKeyResultCode;
    }

    EPAInfoManager.getVersion = function () {
        return EPASetting.Config.Version + EPASetting.Config.QRVersion;
    }

    EPAInfoManager.getHASIP = function () {
        return EPASetting.Config.HAS.IP;
    }

    EPAInfoManager.getHASPort = function () {
        return EPASetting.Config.HAS.PORT;
    }

    EPAInfoManager.getEventServerIP = function () {
        return EPASetting.Config.EventServer.IP;
    }

    EPAInfoManager.getEventServerPort = function () {
        return EPASetting.Config.EventServer.PORT;
    }

    EPAInfoManager.getCategoryKeyBlockTime = function () {
        return EPASetting.Config.CategoryKeyBlockTime;
    }
    EPAInfoManager.needBlockToEnterKeyRepetition = function () {
        return EPASetting.Config.UseBlockToEnterKeyRepetition == "on";
    }
    EPAInfoManager.getRepetitionEnterKeyBlockTime = function () {
        return EPASetting.Config.RepetitionEnterKeyBlockTime;
    }

    return EPAInfoManager;
});