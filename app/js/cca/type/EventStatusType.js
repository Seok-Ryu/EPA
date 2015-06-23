define(function() {
    var EventStatusType = {};
    EventStatusType.BEFORE_PROGRESS = 10;
    EventStatusType.IN_PROGRESS = 20;
    EventStatusType.IN_DEADLINE = 30;
    EventStatusType.READY_OF_DRAW = 40;
    EventStatusType.FINISH_OF_DRAW = 50;
    EventStatusType.LACKED_PRIZE = 51;
    EventStatusType.ANNOUNCED_WINNER = 70;
    EventStatusType.FORCED_CLOSE = 80;


    return EventStatusType;
});