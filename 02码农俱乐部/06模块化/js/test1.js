define(function(require,exports,module){//参数固定写法
    //exports:对外的接口
    //require("./test2.js");//依赖JS文件，被依赖文件不一定是模块

    //如果依赖的是一个模块的话，那么require的返回值就是模块的对外接口exports
    function tab(){
        alert( require("./test3.js").a );
    }
    exports.tab = tab;
});
