<?php
    include('db.php');

    $phone = $_REQUEST['phone'];
    $pwd = $_REQUEST['password'];

    $sqlSelect = "select * from chuizi_user where user_phone='$phone'";
    $result = $mysqli->query($sqlSelect);
    // var_dump($result);
    if($result->num_rows>0){
        die('{"msg":"注册失败,手机号已被使用","err":1}');
    }

    $sql = "insert into chuizi_user (user_phone,user_password) values ('$phone','$pwd')";
    
    $res = $mysqli->query($sql); // 受影响的行数
    
    if($res){
        echo '{"msg":"注册成功","err":0}';
    }
    $mysqli->close();
?>