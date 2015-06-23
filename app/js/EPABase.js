require.config({
    waitSeconds: 0,
    paths: {
        'resources/strings/ko': '../resources/strings/ko'
    }
});
require(['main/EPAService', 'resources/strings/ko', 'service/STBInfoManager', "service/EPAInfoManager", "main/ExternalHandler"],
    function (EPAService, StringSource, STBInfoManager, EPAInfoManager, ExternalHandler) {

        var appInfoFileName = 'appInfo.json';

        var EPABase = {
            StringSources: StringSource,
            EPAService: undefined
        }

        //내부에서 VOD 메인을 찾기 위한 변수 저장
        window.EPABase = EPABase;

        loadConfig();

        function loadConfig() {
            var obj = $.getJSON(appInfoFileName, function (data) {
                EPASetting.Config = data;
                initialize();

                run();
            });
        }

        function initialize() {
            initializeToEPAInfoManager();
            initializeToSTBInfoManager();
            initializeToEPAService();
            addEventListener();
        }


        function initializeToEPAService() {
            EPABase.EPAService = new EPAService();
            EPABase.EPAService.initialize();
        }

        function initializeToSTBInfoManager() {
        }

        function initializeToEPAInfoManager() {
            EPAInfoManager.initialize();
        }

        function addEventListener() {
            ExternalHandler.initialize();
            //CSSHandler.setCCAService(EPABase.EPAService);
            //window.cssWrapper.setHandler(CSSHandler);
        }

        function run() {
            if (EPASetting.Config.DevelopmentMode == "on") {
                setTimeout(function () {
                    var data = {
                        /*"mac" : "cc:2d:8c:c3:01:de",*/
                        //08:eb:74:6a:38:0d
                        //08:eb:74:0d:3d:32
                        "mac": "dc:d3:21:dd:75:f5",
                        "STBId": "value",
                        "SOCode": "43",
                        "subscriberId": "60002440",
                        "isB2B": "value",
                        "STBModel": "SX930C-CJ"
                    }
                    window.cssWrapper.onReqStatusInfo(data);

                    setTimeout(function () {
                        window.cssWrapper.onReqMove({menuId: "9100"});
                        //window.cssWrapper.onReqMove({menuId:"9102", eventId:"377", assetId:"cjc|CJUJ1304231308011922"});//
                        //window.cssWrapper.onReqMove({menuId:"9102",eventId:"44"});
                    }, 50);
                }, 50);
            }
        }

        /*function getStartEPAParameters() {
            var data = {};
            data.assetId = getQueryVariable('assetId');
            data.eventId = getQueryVariable('eventId');
        }

        function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
            console.log('Query variable %s not found', variable);
        }*/
    });