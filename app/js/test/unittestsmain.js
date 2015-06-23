

"use strict";
require.config({
    paths: {
        'QUnit': '../../resources/libs/qunit-1.17.1',
        'resources/strings/ko' : '../../resources/strings/ko',
        'service/EPAInfoManager': '../service/EPAInfoManager',
        'service/STBInfoManager': '../service/STBInfoManager',
        'helper/CommunicatorHelper': '../helper/CommunicatorHelper',
        'cca/model/PortalMenu': '../cca/model/PortalMenu',
        'cca/model/SubscriberEnrollInfo': '../cca/model/SubscriberEnrollInfo',
        'cca/model/SubscriberWinInfo': '../cca/model/SubscriberWinInfo',
        'cca/model/SubscriberEnrollDetail': '../cca/model/SubscriberEnrollDetail',
        'cca/type/EventStatusType': '../cca/type/EventStatusType',
        'cca/model/Event': '../cca/model/Event',
        'cca/model/RelatedEvent': '../cca/model/RelatedEvent',
        'cca/model/Winner': '../cca/model/Winner',
        'cca/type/EnrollStatusType': '../cca/type/EnrollStatusType',
        'helper/StructureHelper': '../helper/StructureHelper',
        'helper/DateHelper': '../helper/DateHelper',
        'service/TotalEventStateManager': '../service/TotalEventStateManager',
        'cca/customType/EntryType': '../cca/customType/EntryType',
        'cca/type/PrizeType': '../cca/type/PrizeType',
        'cca/EventStatusValues': '../cca/EventStatusValues',
        'helper/UIHelper': '../helper/UIHelper',
        'cca/type/EventType': '../cca/type/EventType',
        'cca/model/EnrollReservationInfo': '../cca/model/EnrollReservationInfo',
        'cca/model/EventActionTarget': '../cca/model/EventActionTarget',
        'cca/type/WinConfirmStatus': '../cca/type/WinConfirmStatus',
        'cca/type/PrizeReceiptStatus': '../cca/type/PrizeReceiptStatus',
        'cca/type/EnrollActionType': '../cca/type/EnrollActionType'
    },
    shim: {
        'QUnit': {
            exports: 'QUnit',
            init: function() {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

// require the unit tests.
require(
    ['QUnit', 'UIHelperTest', "CommunicatorTest", "DateHelperTest", "TotalEventStateManagerTest"],
    function(QUnit, UIHelperTest, CommunicatorTest, DateHelperTest, TotalEventStateManagerTest) {
        // run the tests.
        UIHelperTest.run();
        CommunicatorTest.run();
        DateHelperTest.run();
        TotalEventStateManagerTest.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);
