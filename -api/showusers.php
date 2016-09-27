<?php
require('config.php');

$getUsers = mysql_query("SELECT * from user");
    while ($row_getUsers = mysql_fetch_array($getUsers,MYSQL_ASSOC))
    {
        echo $row_getUsers['iduser'].", ";
        echo $row_getUsers['firstname'].", ";
        echo $row_getUsers['lastname'].", ";
        echo $row_getUsers['email'].", ";
        echo $row_getUsers['username'].", ";
        echo $row_getUsers['facebookuserid'].", ";
    }

exit; // NEEDED TO RUN PHP ON STRICT SERVER
?>
