define(function(require,exports,module){
    //C技术开发
    
    function scale(obj1,obj2){
        var disX = 0;
        var disY = 0;
        var disW = 0;
        var disH = 0;

        obj2.onmousedown = function(ev){
            var oEvent = ev || event;
            disX = oEvent.clientX;
            disY = oEvent.clientY;
            disW = obj1.offsetWidth;
            disH = obj1.offsetHeight;

            document.onmousemove = function(ev){
                var oEvent = ev || event;
                var W = require("./range.js").range(disW + oEvent.clientX - disX,400,100);
                var H = require("./range.js").range(disH + oEvent.clientY - disY,400,100);
                obj1.style.width = W + "px";
                obj1.style.height = H + "px";
            };
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };
    }

    exports.scale = scale;
    
});