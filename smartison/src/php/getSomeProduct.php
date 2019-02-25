<?php
    include('./db.php');//通过ID集合获取所有购物车商品的php接口

    $idlist = $_REQUEST['idlist'];

    $sql = "select * from chuizi_product where id in ($idlist)";

    $res = $mysqli->query($sql);

    $arr = array();
    while($row = $res->fetch_assoc()){
       array_push($arr,$row);
    }
    $json = json_encode($arr);
    echo $json;

    $mysqli->close();
?>