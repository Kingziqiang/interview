//utils里面编写的都是项目中常用的一些方法，为了防止和其他的地方名字冲突，我们采用单例模式来封装这个类库

var utils = {
    /*
     * listToArray:Converts an array of classes into an array
     * @parameter
     *    likeAry:[object] We need to operate an array of classes.
     * @return
     *    [array] Conversion completed array
     * by Team on 2015/12/10
     */
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }
};


