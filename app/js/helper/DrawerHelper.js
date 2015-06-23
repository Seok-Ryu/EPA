/**
 * element 를 조작 하거나 그리는 부분이 중복되는 경우 사용
 */
define(function () {
    var DrawerHelper = {};
    var TIME_OF_WAITING_DATA = 300;
    var waitTimer = null;


    DrawerHelper.drawScroll = function (focusIndex, maxSize) {
        var scrollBar = $("#bg_scroll .scroll_bar");
        var scrollArea = $("#bg_scroll");

        var maxScrollHeight = parseInt(scrollArea.css("height")); //416px

        var scrollBarHeight = maxScrollHeight / maxSize;

        var topPosition = scrollBarHeight * focusIndex - maxScrollHeight;
        scrollBar.css("height", scrollBarHeight)
        scrollBar.css("top", topPosition);
        scrollArea.show();
    }

    DrawerHelper.setWaitingTimer = function (callbackFunction) {
        setTimeout(function() {
            callbackFunction();
            DrawerHelper.clearWaitingTimer();
        }, TIME_OF_WAITING_DATA);
    }

    DrawerHelper.clearWaitingTimer = function() {
        clearTimeout(waitTimer);
        waitTimer = null;
    }

    return DrawerHelper;
});
