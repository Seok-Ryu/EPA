var totalCount = 100;
var pageSize = 8;

var serverData = new Array();
for(var i =0; i < totalCount; i++) {
    serverData[i] = i;
}


function requet(startIndex, pageSize) {
    var temp = [];
    startIndex = startIndex % totalCount;
    if(startIndex + pageSize > serverData.length) {
        var firstPageSize = serverData.length - startIndex;
        for(var i = 0; i < firstPageSize; i++) {
            temp[i] = serverData[i + startIndex];
        }
        var secondPageSize = pageSize - firstPageSize;
        var temp2 = requet(0, secondPageSize);
        temp = temp.concat(temp2)
        return temp;
    } else {
        for(var i = 0; i < pageSize; i++) {
            temp[i] = serverData[i + startIndex];
        }
        return temp;
    }
}

function calPageSize(startItemIndex) {
    var firstPageSize, secondPageSize;
    startItemIndex = startItemIndex % totalCount;
    if(startItemIndex > (totalCount - requestPageSize)) {
        firstPageSize = totalCount - startItemIndex;
    } else {
        firstPageSize = requestPageSize;
    }
    //firstPageSize = (startItemIndex > (totalCount - requestPageSize)) ? firstPageSize = totalCount - startItemIndex:  requestPageSize;
    secondPageSize = requestPageSize - firstPageSize;

    //console.log("페이지계산", firstPageSize, secondPageSize)
    return firstPageSize;
}

function foo(result, array, startIndex, size) {
    startIndex = startIndex % totalCount
    for(var i = 0; i < size; i++) {
        result[i + startIndex] = array[i];
    }
    //console.log("첫배열", result)
    var secondPageSize = requestPageSize - size;
    for(var i = 0; i < secondPageSize; i++) {
        result[i] = array[size + i];
    }
    //console.log("합친배열", result)

    return result;
}

var startItemIndexList = [0, 84, 85, totalCount-pageSize, totalCount-1, totalCount, totalCount + 1, totalCount + 10];
//var startItemIndex = 0;
//var startItemIndex = 84;
//var startItemIndex = 85;
//var startItemIndex = totalCount - pageSize;
//var startItemIndex = totalCount - 1;
var requestPageSize = pageSize *2;
/*for(var i = 0; i < startItemIndexList.length; i++) {
    var startItemIndex = startItemIndexList[i];
    console.log("startItemIndex : " + startItemIndex);
    var result = requet(startItemIndex, requestPageSize);
    console.log(result)
    var firstPageSize = calPageSize(startItemIndex);
    var temp = [];

    foo(temp, result, startItemIndex, firstPageSize);
}*/


var final = new Array(totalCount);

console.log("배열확인", final.length, final);
/*var startItemIndex_1 = totalCount-pageSize;

var result_1 = requet(startItemIndex_1, requestPageSize);
foo(final, result_1, startItemIndex_1, calPageSize(startItemIndex_1));
console.log("startItemIndex_1 :" + startItemIndex_1, "length:"+ final.length)
console.log(final);

var startItemIndex_2 = pageSize

var result_2 = requet(startItemIndex_2, requestPageSize);
foo(final, result_2, startItemIndex_2, calPageSize(startItemIndex_2));
console.log("startItemIndex_2 :" + startItemIndex_2, "length:"+ final.length)
console.log(final);

var startItemIndex_3 = 84

var result_3 = requet(startItemIndex_3, requestPageSize);
foo(final, result_3, startItemIndex_3, calPageSize(startItemIndex_3));
console.log("startItemIndex_3 :" + startItemIndex_3, "length:"+ final.length)
console.log(final);*/
/*
var tempList = [];
var requestLine = Math.floor(pageSize * 0.6);
for(var i = 0; i < 100; i++) {
    var focusedIndex = i;
    var result = (focusedIndex - requestLine) % pageSize ;
    console.log(focusedIndex, result, result == 0);
}*/
/*var tempList = [];
for(var i = 0; i < 31; i++) {
    var focusedIndex = i;
    tempList[i] = i;
}
console.log(tempList, tempList.length)*/
/*var x = [0, 1,2];
for(var i = 0; i < x.length; i++) {
    var y = 31 - (8 * (x[i] + 1));
    console.log(y);
}*/

var x = [0, 1,2];
for(var i = 0; i < 31; i++) {
    /*var y = Math.abs(i - 31 + 4 + 1) % 8
    //console.log(i, y);
    if(y == 0) {
        var z = Math.abs(i - 31 + 4 + 1) / 8;
        //var x = 31 - ((z+2) * 8);

        x = 31 - (((Math.abs(i - 31 + 4 + 1) / 8) + 1) * 8);
        console.log("x:", x);
    }*/
    //var y = 31 - (4 + 1 + (8 * x[i]));

    //var y = (31 - i) % 5
    //var y = (i - 5) % 8;
    //var y = (31 - 5 - i) % 8;
    //console.log(y)
    //var y = 31 - (8 * (Math.ceil((31 - i) / 8 )));
    //var y = Math.ceil((31 - i) / 8) ;
    var y = 31 - ( 8 * ( Math.ceil( (31- i)/8 ) + 1 ) );
console.log(y)
    /*if(y == 0) {
        console.log(i)
    }*/
}
//Math.abs(focusedIndex - this.totalCount + requestLine) % this.pageSize == 0