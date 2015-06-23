/**
 * 사용범
 * 1. 최초 1회 데이터 요청하여 totalCount 확보 후 setInformation
 * 2. run
 * 3. 이후 키이벤트 처리(인덱스 처리)에서 afterMoveIndex
 *
 * A. requestFunction의 파라미터는 callback, startItemIndex, pageSize
 * B. afterRequestFunction 의 파라미터는 boolean (성공.실패)
 * C. request의 response 에는 startItemIndex 필드가 꼭 있어야함

 */
define(["service/Communicator"], function (Communicator) {
    var ListRequestHelper = {};
    var REQUEST_PERCENT = 0.6;

    ListRequestHelper.setInformation = function (totalCount, pageSize, requestFunction, model, listFieldName, afterRequestFunction, hasIndexRotation) {
        this.totalCount = totalCount;
        this.pageSize = pageSize;
        this.requestFunction = requestFunction;
        this.model = model;
        this.listFieldName = listFieldName;
        this.afterRequestFunction = afterRequestFunction;
        this.hasIndexRotation = hasIndexRotation;
        //this.run();
    }

    ListRequestHelper.run = function () {
        var firstRequestPageSize = this.pageSize * 2;
        if(this.totalCount > firstRequestPageSize) {
            if(this.hasIndexRotation) {
                var startIndex = this.totalCount - this.pageSize;
                var pageSize = firstRequestPageSize;
            } else {
                var startIndex = 0;
                var pageSize = this.pageSize;
                this.isFirstRequest = true;
            }
        } else {
            var startIndex = 0;
            var pageSize = this.totalCount;
        }
        this.requestFunction(this.requestCallback, startIndex, pageSize)
    }

    ListRequestHelper.afterMoveIndex = function () {
        if(this.isRequestline()) {
            var startIndex = this.getRequestStartIndex();
            var pageSize = this.getRequestPageSize(startIndex);

            if(startIndex < 0) {
                pageSize = pageSize + startIndex;
                startIndex = 0;
            }
            var realStartIndex = this.getRealStartIndex(startIndex, pageSize);
            var realPageSize = pageSize - (realStartIndex - startIndex);

            if(realPageSize > 0) {
                this.requestFunction(this.requestCallback, realStartIndex, realPageSize)
            } else {
                this.afterRequestFunction(true);
            }
        } else {
            this.afterRequestFunction(true);
        }
    }

    ListRequestHelper.getRequestStartIndex = function () {
        var startIndex = 0;
        if(this.isUpperRequestLine()) {
            startIndex = this.getUpperRequestStartIndex();
        } else if(this.isLowerRequestLine()) {
            startIndex = this.getLowerRequestStartIndex();
        }
        return startIndex;
    }

    ListRequestHelper.getRequestPageSize = function (startIndex) {
        if(startIndex + this.pageSize > this.totalCount) {
            return this.totalCount - startIndex;
        } else {
            return this.pageSize;
        }

    }

    ListRequestHelper.getRealStartIndex = function (startIndex, pageSize) {
        var lastList = this.getLastList();
        var realStartIndex = startIndex;
        for(var i = 0; i < pageSize; i++) {
            if(lastList[i + startIndex] != null) {
                realStartIndex += 1;
            } else {
                break;
            }
        }
        return realStartIndex;
    }

    ListRequestHelper.isRequestline = function () {
        if(this.isUpperRequestLine()) {
            return true;
        } else if(this.isLowerRequestLine()) {
            return true;
        } else {
            return false;
        }
    }

    ListRequestHelper.isUpperRequestLine = function () {
        var focusedIndex = this.model.getVFocusIndex();
        var upperRequestPoint = this.getUpperRequestPoint()

        return (focusedIndex - upperRequestPoint) % this.pageSize == 0;
    }

    ListRequestHelper.isLowerRequestLine = function () {
        var focusedIndex = this.model.getVFocusIndex();
        var lowerRequestPoint = this.getLowerRequestPoint()

        return (this.totalCount - lowerRequestPoint - focusedIndex) % this.pageSize == 0;
    }

    ListRequestHelper.getUpperRequestPoint = function () {
        return Math.floor(this.pageSize * REQUEST_PERCENT);
    }

    ListRequestHelper.getLowerRequestPoint = function () {
        return Math.ceil(this.pageSize * REQUEST_PERCENT);
    }

    ListRequestHelper.getUpperRequestStartIndex = function () {
        var focusedIndex = this.model.getVFocusIndex();
        return Math.ceil(focusedIndex / this.pageSize) * this.pageSize;

    }

    ListRequestHelper.getLowerRequestStartIndex = function () {
        var focusedIndex = this.model.getVFocusIndex();

        return this.totalCount - (this.pageSize * ( Math.ceil( (this.totalCount - focusedIndex) / this.pageSize ) + 1 ) );
    }

    ListRequestHelper.requestCallback = function (response) {
        if(Communicator.isSuccessResponseFromHAS(response)) {
            var responseList = response[ListRequestHelper.listFieldName];
            var startItemIndex = response.startItemIndex;

            ListRequestHelper.insertListData(responseList, startItemIndex);
            //@Comment indexRotation 을 지원하지 않는 API 일 경우 request를 2번 나눠서 진행해야한다
            if(ListRequestHelper.isFirstRequest && ListRequestHelper.hasIndexRotation == false) {
                ListRequestHelper.isFirstRequest = false;
                var startIndex = ListRequestHelper.totalCount - ListRequestHelper.pageSize;
                var pageSize = ListRequestHelper.pageSize;
                ListRequestHelper.requestFunction(ListRequestHelper.requestCallback, startIndex, pageSize);
                ListRequestHelper.afterRequestFunction(true);
            } else {
                ListRequestHelper.afterRequestFunction(true);
            }
        } else {
            ListRequestHelper.afterRequestFunction(false);
        }
    }

    ListRequestHelper.getLastList = function () {
        var lastList = this.model.getData();
        return lastList == null ? new Array(this.totalCount) : lastList;
    }


    ListRequestHelper.getFirstPageSize = function (startItemIndex, listSize) {
        var firstPageSize = 0;
        //startItemIndex = startItemIndex % totalCount;
        if(startItemIndex > (this.totalCount - listSize)) {
            firstPageSize = this.totalCount - startItemIndex;
        } else {
            firstPageSize = listSize;
        }
        return firstPageSize;
    }

    /**
     * 요청 시작 index부터 response 리스트 갯수만큼 데이터에 넣어준다.
     * @param responseList
     * @param startItemIndex
     */
    ListRequestHelper.insertListData = function (responseList, startItemIndex) {
        var lastList = this.getLastList();
        var firstPageSize = this.getFirstPageSize(startItemIndex, responseList.length);

        for(var i = 0; i < firstPageSize; i++) {
            lastList[i + startItemIndex] = responseList[i];
        }

        var secondPageSize = responseList.length - firstPageSize;
        for(var i = 0; i < secondPageSize; i++) {
            lastList[i] = responseList[firstPageSize + i];
        }
        this.model.setData(lastList);
    }

    return ListRequestHelper;
});
