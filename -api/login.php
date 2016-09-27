<?php
require('config.php');
$mailadress = $_POST['mail'];
$password = $_POST['password'];
$findUser = mysql_query("SELECT iduser, password from user WHERE email='".$mailadress."'");
$row_findUser = mysql_fetch_array($findUser,MYSQL_ASSOC);

if($row_findUser['password']==$password){
    // UPDATE LAST LOGIN FOR USER
    $update_userinfo = mysql_query("UPDATE user SET lastlogin = now() WHERE iduser=".$row_findUser['iduser']);

    // GET ALL USER DATA
    $getUserInfo = mysql_query("SELECT * from user WHERE email='".$mailadress."'");
    $row_getUserInfo = mysql_fetch_array($getUserInfo,MYSQL_ASSOC);
    // RETURN LOGIN-> TRUE WITH ALL DATA FORMATED AS JSON
    $row_getUserInfo = array('login'=>'true') + $row_getUserInfo;
    print json_encode($row_getUserInfo);
} else {
    // RETURN LOGIN-ERROR RESPONSE FORMATED AS JSON
    $error = array('login'=>'false', 'error'=>'email or password does not exist');
    print json_encode($error);
}// IF-ELSE END

exit; // NEEDED TO RUN PHP ON STRICT SERVER
?>