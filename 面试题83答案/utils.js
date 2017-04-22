    var utils={};
    //1 处理document.body和document.documentElement属性的加绒小
    utils.ctrWin=function (attr, value) {      
        if (arguments.length === 1) {
            return document.documentElement[attr]||document.body[attr];
        }
        if(arguments.length>=2){
               document.documentElement[attr] = value;
              document.body[attr] = value;
        }     
    };
    //2 将类数组转换成数组
    utils.listToArray=function (likeArray) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeArray, 0);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                ary[ary.length] = likeArray[i];
            }
        }
        return ary;
    };
    //3 将字符串转换成JSON格式的对象
    utils.toJSON=function (jsonStr) {
        var jsonObj = null;
        try {
            jsonObj = JSON.parse(jsonStr);
        } catch (e) {
            jsonObj = eval("(" + jsonStr + ")");
        }
        return jsonObj;
    };
    //4 兼容的获取样式写法
    utils.getCsss=function (curEle,attr){
        var val = typeof window.getComputedStyle == "function" ? getComputedStyle(curEle,null)[attr] : curEle.currentStyle[attr];
        if(!isNaN(parseFloat(val))) val = parseFloat(val);
        return val;
    };    
    //5 兼容的设置样式写法
    utils.setCss=function (curEle,attr,val){
        with(curEle){//理解with的用法，这样就把ele当前当前的作用域了，不必在写每一个CSS属性之前再写ele.了
            switch(attr){
                case 'float'://处理float的兼容性问题
                        style['cssFloat']=val;               
                        style['styleFloat']=val;
                    break;
                case 'opacity': //处理不透明度的兼容性问题
            //这儿还应该处理一下，因为opacity的值是介于0和1之间的
                        val=Math.max(0,val)&&Math.min(1,val);              
                        style['opacity']=val;
                        style['filter']="alpha(opacity:"+val*100+")";        
                    break;
                case 'width':
                case 'height':                
                case 'paddingLeft':
                case 'paddingBottom':
                case 'paddingTop':
                case 'paddingRight':
                case 'borderLeftWidth':
                case 'borderRightWidth':
                case 'borderTopWidth':
                case 'borderBottomWidth':
                        //这些css属性值的特点就是都不能为负数，所以会用max方法运算一下
                        var reg=/^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
                        //这个正则相对要完善一点，可以判断带小数的
                        if(reg.test(val)){
                            var num=RegExp.$1;//取出第一个分组
                            var unit=RegExp.$2;//取出第二个分组：单位部分
                            num=Math.max(0,num);//如果传进来的值是负数，则用0
                            if(unit)//如果有单位，则加上单位，如果没有单位，则以px为默认单位
                                val=num+unit;
                            else
                                val=num+'px';
                        }
                        style[attr]=val;
                    break;               
                case 'marginLeft':
                case 'marginRight':
                case 'marginTop':
                case 'marginBottom':
                case 'right':
                case 'left':
                case 'top':
                case 'bottom':
                        var reg=/^(-?\d+(?:\.\d+)?)(pt|px|em|in)?$/;
                        //这个正则相对要完善一点，可以判断带小数的了.
                        //这个正则可以处理象：2.5em,22px,22,3pt,-10.6in这样的css单位
                        if(reg.test(val)){
                            //如果符合此正则，则按以下方式处理
                            var num=RegExp.$1;
                            var unit=RegExp.$2;               
                            if(unit)
                                //如果是带单位的，则加上单位
                                val=num+unit;
                            else
                                //如果不带单位，则用默认的单位px
                                val=num+'px';
                        }
                        style[attr]=val;
                    break;
                default:
                        style[attr]=val;
            }       
        }
    };
    //6 兼容的获取offsetLeft和offsetTop写法
    utils.offset=function(curEle){                
                //1 获取html左边框和上边框分别距离屏幕最左侧和最上方的距离 
                var bLeft= utils.getCsss(document.documentElement,"marginLeft"),bTop=utils.getCsss(document.documentElement,"marginTop");
                if(curEle==document.documentElement)  return {left:bLeft,top:bTop};           
                //2 获取body左边框和上边框分别距离屏幕最左侧和最上方的距离  
                var hLeft = utils.getCsss(document.documentElement,"marginLeft")+utils.getCsss(document.documentElement,"borderLeftWidth")+utils.getCsss(document.documentElement,"paddingLeft")+utils.getCsss(document.body,"marginLeft");
                var hTop = utils.getCsss(document.documentElement,"marginTop")+utils.getCsss(document.documentElement,"borderTopWidth")+utils.getCsss(document.documentElement,"paddingTop")+utils.getCsss(document.body,"marginTop");
                if(curEle==document.body) return {left:hLeft,top:hTop}; 
                var tempPar=par = curEle.parentNode,  pos = utils.getCsss(par,"position");
                tempPar.style.position="static";//将父元素统一设置为不定位                                          
                var totalLeft =curEle.offsetLeft,totalTop = curEle.offsetTop;
                if(/Firefox/.test(navigator.userAgent)){                
                    totalLeft+= utils.getCsss(document.documentElement,"marginLeft")-document.body.offsetLeft;
                    totalTop+= utils.getCsss(document.documentElement,"marginTop")-document.body.offsetTop;                
                }else if(/(MSIE\s(8.0|9.0|10.0))|(rv:\d+\.\d\)\slike Gecko)/.test(navigator.userAgent)){                
                                
                }else if(/MSIE\s(5.0|6.0|7.0)/.test(navigator.userAgent)){                                  
                    while (par){ //直到html为止                                    
                           totalLeft += par.clientLeft+par.offsetLeft;  
                           totalTop += par.clientTop+par.offsetTop;
                           curEle = par;
                           par = par.offsetParent;                        
                    }   

                }else{
                    totalLeft +=utils.getCsss(document.documentElement,"marginLeft");
                    totalTop +=utils.getCsss(document.documentElement,"marginTop");
                }
                tempPar.style.position=pos;//恢复原来的样式
                return {left:totalLeft,top:totalTop};       
    }   