var utils = {
    ctrWin: function (attr, value) {
        if (arguments.length === 0) {
            return;
        }
        if (arguments.length === 1) {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },
    listToArray: function (likeArray) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeArray, 0);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                ary[ary.length] = likeArray[i];
            }
        }
        return ary;
    },
    toJSON: function (jsonStr) {
        var jsonObj = null;
        try {
            jsonObj = JSON.parse(jsonStr);
        } catch (e) {
            jsonObj = eval("(" + jsonStr + ")");
        }
        return jsonObj;
    },
    getCSS: function (curEle, attr) {
        var val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
        !isNaN(parseFloat(val)) ? val = parseFloat(val) : null;
        return val;
    },
    offset: function (curEle) {
        var offsetT = curEle.offsetTop, offsetL = curEle.offsetLeft, offsetP = curEle.offsetParent;
        while (offsetP) {
            offsetL += offsetP.offsetLeft;
            offsetT += offsetP.offsetTop;
            if (navigator.userAgent.indexOf("MSIE 8.0") <= -1) {
                offsetL += offsetP.clientLeft;
                offsetT += offsetP.clientTop;
            }
            offsetP = offsetP.offsetParent;
        }
        return {top: offsetT, left: offsetL};
    }
};