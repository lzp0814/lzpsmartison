<?php
    include('db.php');
    $phone = $_REQUEST['phone'];
    $pwd = $_REQUEST['password'];

    $sql = "select * from chuizi_user where user_phone='$phone' and user_password='$pwd'";
    // echo $sql;
    $res = $mysqli->query($sql);
    
    if($res->num_rows>0){
        // while($row=$res->fetch_assoc()){
        //     var_dump($row);
        //     echo "<br>";
        // }
        echo '{"msg":"登陆成功","err":0}';
    }else{
        echo '{"msg":"登陆失败，请检查手机号和密码","err":1}';

    }

    $mysqli->close();

   
?>