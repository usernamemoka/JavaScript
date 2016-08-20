<?php
    switch ($_GET['act']) {
        case 'add':
            $content = $_GET['content'];
            $t = time();
            $sql = "INSERT INTO message (ID,content,posttime) VALUES (0,'{$content}',{$t})";
            mysql_connect("localhost","root","123456");//连数据库
            mysql_select_db("sina");//选择表
            mysql_query($sql);//执行$sql语句
            break;
    }
?>