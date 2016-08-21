define(function(require,exports,module){
    //前辈写的
    function range(iNum,iMax,iMin){
        if(iNum > iMax){
            return iMax;
        }
        else if(iNum < iMin){
            return iMin;
        }
        else{
            return iNum;
        }
    }
    exports.range = range;
});