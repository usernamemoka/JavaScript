define(function(require,exports,module){
    //B技术开发
    function drag(obj){
        var disX = 0;
        var disY = 0;
        obj.onmousedown = function(ev){
            var oEvent = ev || event;
            disX = oEvent.clientX - obj.offsetLeft;
            disY = oEvent.clientY - obj.offsetTop;
            document.onmousemove = function(ev){
                var oEvent = ev || event;
                var L = require("./range.js").range(oEvent.clientX - disX,document.documentElement.clientWidth - obj.offsetWidth,0);
                var T = require("./range.js").range(oEvent.clientY - disY,document.documentElement.clientHeight - obj.offsetHeight,0);
                obj.style.left = L + "px";
                obj.style.top = T + "px";
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            };
            return false;
        };
    }

    exports.drag = drag;
});
