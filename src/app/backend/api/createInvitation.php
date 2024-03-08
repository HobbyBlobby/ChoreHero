<?php

if (require 'handleCors.php') {return 200;}
require 'database.php';
if (!require 'checkLogin.php') {http_response_code(403); return;}

$returnVal = [];

if(empty($_GET["group_id"])) {
    $returnVal["status"] = "err_param";
    echo json_encode($returnVal);
    http_response_code(404);
    return;
}

$sql = "SELECT * FROM `GroupInvitations` WHERE `account_name` = '$_GET[account_name]' AND `group_id` = '$_GET[group_id]'";

if($result = mysqli_query($con,$sql))
{
    if(!mysqli_fetch_assoc($result)) { # no results > new invitation to create
        $code = uniqid();
        $sql = "INSERT INTO `GroupInvitations`(`account_name`,`group_id`, `invitation_code`) VALUES ('$_GET[account_name]', $_GET[group_id], '$code')";
        if($result = mysqli_query($con,$sql)) {
            $returnVal["status"] = "success";
            $returnVal["data"] = [
                "account_name" => $_GET["account_name"],
                "group_id" => $_GET["group_id"],
                "invitation_code" => $code];
        } else {
            http_response_code(400); return;
        }     
    } else {
        $returnVal["status"] = "err_exists";
        echo json_encode($returnVal);
        http_response_code(404);
        return;
    }

  echo json_encode($returnVal);
  http_response_code(200);
}
else
{
  http_response_code(404);
}
?>