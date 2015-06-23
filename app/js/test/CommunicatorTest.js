
"use strict";
define(
    ['../service/Communicator'],
    function(Communicator) {
        var run = function() {
            test('리퀘스트 데이터 생성 테스트.', function() {
                deepEqual(Communicator.createDataForRequestByParameterListTest(function(){}, "a12345", 1), {"value2":"a12345","value3":1}, '데이터 일치 확인');
            });
        };
        return {run: run}
    }
);