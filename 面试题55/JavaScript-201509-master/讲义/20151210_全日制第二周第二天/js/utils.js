//utils�����д�Ķ�����Ŀ�г��õ�һЩ������Ϊ�˷�ֹ�������ĵط����ֳ�ͻ�����ǲ��õ���ģʽ����װ������

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


