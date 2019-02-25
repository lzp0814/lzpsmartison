<?php

    include('db.php');//通过ID获取某一个商品详情的php接口

    $id = $_REQUEST["id"];

    $sql = "select * from chuizi_product where id = $id";

    $res = $mysqli->query($sql); //集合

    $row = $res->fetch_assoc();

    $json = json_encode($row);

    echo $json;
    
    $mysqli->close();
?>