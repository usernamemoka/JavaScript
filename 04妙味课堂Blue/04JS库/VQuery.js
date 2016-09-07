function myAddEvent(obj,sEv,fn){
    //改造后return false能同时具有阻止冒泡和默认事件的作用
    if(obj.attachEvent){
        obj.attachEvent("on"+sEv,function(){
            //fn.call(obj);//ie7
            if(false == fn.call(obj)){
                event.cancelBubble = true;//阻止冒泡
                return false;//阻止冒泡
            }
        });
    }
    else{
        obj.addEventListener(sEv,function(ev){
            if(false == fn.call(obj)){
                ev.cancelBubble = true;
                ev.preventDefault();//addEvent...绑定用此方法阻止默认事件，return false无用
            }
        },false);
    }
}

function getByClass(oParent,sClass){
    var aEle = document.getElementsByTagName("*");
    var aResult = [];
    for(var i = 0;i < aEle.length; i++){
        if(aEle[i].className == sClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj,false)[attr];
    }
}


function VQuery(vArg){
    this.elements = [];//用来保存选中的元素
    switch(typeof vArg){
        case "function":
            //window.onload = vArg;
            myAddEvent(window,"load",vArg);
            break;
        case "string":
            switch(vArg.charAt(0)){
                case "#"://id
                    var obj = document.getElementById(vArg.substring(1));
                    this.elements.push(obj);
                    break;
                case "."://class
                    this.elements = getByClass(document,vArg.substring(1));
                    break;
                default://tag
                    this.elements = document.getElementsByTagName(vArg);
            }
            break;
        case "object":
            this.elements.push(vArg);
    }
}

VQuery.prototype.click = function(fn){
    //console.log(this.elements);
    for(var i = 0;i < this.elements.length;i++){
        myAddEvent(this.elements[i],'click',fn);
    }
    return this;
};

VQuery.prototype.show = function(){
    for(var i = 0;i < this.elements.length; i++){
        this.elements[i].style.display = "block";
    }
    return this;
};

VQuery.prototype.hide = function(){
    for(var i = 0;i < this.elements.length; i++){
        this.elements[i].style.display = "none";
    }
    return this;
};

VQuery.prototype.hover = function(fnOver,fnOut){
    for(var i = 0; i < this.elements.length; i++){
        myAddEvent(this.elements[i],'mouseover',fnOver);
        myAddEvent(this.elements[i],'mouseout',fnOut);
    }
    return this;
};

VQuery.prototype.css = function(attr,value){
    if(arguments.length == 2){
        for(var i = 0;i < this.elements.length; i ++){
            this.elements[i].style[attr] = value;
        }
    }
    else{
        if(typeof attr == 'string'){
            return getStyle(this.elements[0],attr);
        }
        else{
             for(var i = 0; i < this.elements.length;i++){
                var k = '';
                for(k in attr){
                    this.elements[i].style[k] = attr[k];
                }
             }
        }
    }
    return this;
};
//0:fn1
//1:fn2
//2:fn1
//3:fn2
VQuery.prototype.toggle = function(){
    var _arguments = arguments;//几个函数
    for(var i = 0;i < this.elements.length;i++){
       addToggle(this.elements[i]);//每一个元素
    }
    function addToggle(obj){
       var count = 0;
       myAddEvent(obj,"click",function(){//注意函数中的arguments
           _arguments[count++ % _arguments.length].call(obj);//注意，分别执行几个函数
       });
    }
};

VQuery.prototype.attr = function(attr,value){
    if(arguments.length == 2){
        for(var i = 0 ; i < this.elements.length; i++){
            this.elements[i][attr] = value;
        }
    }
    else{
        return this.elements[0][attr];
    }
    return this;
};

VQuery.prototype.eq = function(iNum){
    return $(this.elements[iNum]);//普通的dom对象变成VQuery对象
};

function appendArr(arr1,arr2){
    for(var i = 0;i < arr2.length;i++){
        arr1.push(arr2[i]);
    }
}

VQuery.prototype.find = function(str){
    var aResult = [];
    for(var i = 0; i < this.elements.length; i++){
        switch(str.charAt(0)){
            case ".":
                var aEle = getByClass(this.elements[i],str.substring(1));
                aResult = aResult.concat(aEle);
                break;
            default:
                var aEle = this.elements[i].getElementsByTagName(str);
                //aResult = aResult.concat(aEle);//concat只能用于两个数组之间
                appendArr(aResult,aEle);
        }
    }
    var newVquery = $();
    newVquery.elements = aResult;
    return newVquery;
};

function getIndex(obj){
    var aBrother = obj.parentNode.children;
    for(var i = 0 ;i < aBrother.length;i++){
        if(aBrother[i] == obj){
            return i;
        }
    }
}
VQuery.prototype.index = function(){
    return getIndex(this.elements[0]);
};

VQuery.prototype.bind = function(sEv,fn){
    for(var i = 0; i < this.elements.length; i++){
        myAddEvent(this.elements[i],sEv,fn);
    }
};

VQuery.prototype.extend = function(name,fn){
    VQuery.prototype[name] = fn;
};


$().extend('size',function(){
    return this.elements.length;
});

$().extend('animate',function(json){
    for(var i = 0; i < this.elements.length;i++){
        startMove(this.elements[i],json);
    }
    function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }
        else{
            return getComputedStyle(obj,false)[attr];
        }
    }
    function startMove(obj,json,fnEnd){
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            var oStop = true;
            for( var attr in json){
                var cur = 0;
                if(attr == "opacity"){
                    cur = Math.round( parseFloat( getStyle(obj,attr) ) * 100 );
                }
                else{
                    cur = parseInt( getStyle(obj,attr) );
                }

                var speed = (json[attr] - cur) / 7;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if(cur != json[attr]){
                    oStop = false;
                }
                if(attr == "opacity"){
                    obj.style.filter = 'alpha(opacity:'+(cur+speed)+')';
                    obj.style.opacity = (cur + speed) / 100;
                }
                else{
                    obj.style[attr] = cur + speed + "px";
                }
            }
            if(oStop){
                clearInterval(obj.timer);
                fnEnd&&fnEnd();
            }
        },30);
    }
});

$().extend('drag',function(){
    for(var i = 0;i < this.elements.length;i++){
        drag(this.elements[i]);
    }
    function drag(obj){
        var disX = 0;
        var disY = 0;
        obj.onmousedown = function(ev){
            //这里位置的计算一定是mousedown的时候
            var oEvent = ev || event;
            disX = oEvent.clientX - obj.offsetLeft;
            disY = oEvent.clientY - obj.offsetTop;

            if(obj.setCapture){
                obj.onmousemove = mouseMove;
                obj.onmouseup = mouseUp;
                obj.setCapture();
            }
            else{
                document.onmousemove = mouseMove;
                document.onmouseup = mouseUp;
            }
            function mouseMove(ev){
                var oEvent = ev || event;

                obj.style.top = oEvent.clientY - disY + "px";
                obj.style.left = oEvent.clientX - disX + "px";
            }
            function mouseUp(){
                this.onmousemove = this.onmouseup = null;
                if(obj.releaseCapture){
                    obj.releaseCapture();
                }
            }
            return false;
        };
    }
});


function $(vArg){
    return new VQuery(vArg);
}