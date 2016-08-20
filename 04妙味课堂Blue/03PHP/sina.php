<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    *{
        margin: 0;
        padding: 0;
    }
    #ul1{
        width: 500px;
        min-height: 300px;
        margin: 0 auto;
        border: 1px solid #000;
    }
    #ul1 div{
        list-style-type: none;
        border-bottom: 1px dashed #ccc;
        padding: 3px;
        word-break: break-all;
        overflow: hidden;
        opacity: 0;
        filter: alpha(opacity:0);
    }
    </style>
</head>
<body>
    <textarea name="" id="txt1" cols="30" rows="10"></textarea>
    <input type="button" value="发布" id="btn1">
    <?php
        $sql = "SELECT ID,content,posttime FROM message ORDER BY ID DESC";
        mysql_connect("localhost","root","123456");//连数据库
        mysql_select_db("sina");//选择表
        $res = mysql_query($sql);//执行$sql语句并返回查询信息        
    ?>
    <div id="ul1">
        <!-- $row[1]第一个是message -->
        <?php while($row = mysql_fetch_row($res)){ ?>
            <div><?php echo $row[1]; ?></div>
        <?php } ?>
    </div>
    <script src="ajax.js"></script>
    <script src="startMove.js"></script>
    <script>
        var oTxt = document.getElementById("txt1");
        var oBtn = document.getElementById("btn1");
        var oUl = document.getElementById("ul1");

        var aDiv = oUl.getElementsByTagName("div");
        for(var i = 0;i < aDiv.length;i++){
            aDiv[i].style.opacity = 1;
            aDiv[i].style.filter = 'alpha(opacity:100)';
        }
        oBtn.onclick = function(){
            var url = "sina_post.php?act=add&content=" + oTxt.value;
            ajax(url,function(str){

            });
            var oLi = document.createElement("div");
            var aLi = oUl.getElementsByTagName("div");
            oLi.innerHTML = oTxt.value;
            if(aLi.length == 0){
                oUl.appendChild(oLi);
            }
            else{
                oUl.insertBefore(oLi,aLi[0]);
            }
            var iHeight = oLi.offsetHeight - 6;
            oLi.style.height = 0;
            //oLi.style.opacity = 0;
            startMove(oLi,{height:iHeight},function(){
                startMove(oLi,{opacity:100});
            });
            oTxt.value = "";
        };
    </script>
</body>
</html>