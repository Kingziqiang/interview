var utils = {
    //->listToArray:实现将类数组转换为数组
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    //->jsonParse:把JSON格式的字符串转换为JSON格式的对象
    jsonParse: function (str) {
        //var val = null;
        //try {
        //    val = JSON.parse(str);
        //} catch (e) {
        //    val = eval("(" + str + ")");
        //}
        //return val;
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};