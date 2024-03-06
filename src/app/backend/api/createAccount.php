<?php

// 1. Check, if account exists
// 2. if not: add entry into Accounts
if (require 'handleCors.php') {return 200;}
require 'database.php';

$returnVal = [];

if(empty($_GET["account"]) || empty($_GET["hash"]) ) {
    $returnVal["status"] = "err_param";
    // $returnVal["param"] = $_GET;
    echo json_encode($returnVal);
    exit();
}

$sql = "SELECT * FROM `Accounts` WHERE `account_name` = '$_GET[account]'";

if($result = mysqli_query($con,$sql))
{
    if(!mysqli_fetch_assoc($result)) { # no results > new account to create
        $sql = "INSERT INTO `Accounts`(`account_name`,`login_hash`) VALUES ('$_GET[account]','$_GET[hash]')";
        if($result = mysqli_query($con,$sql)) {
            $returnVal["status"] = "success";
            $returnVal["data"] = ["newAccount" => $_GET["account"]];
        } else {
            http_response_code(404);
        }     
    } else {
        $returnVal["status"] = "err_exists";
    }
//   $i = 0;
//   while($row = mysqli_fetch_assoc($result))
//   {
//     $groups[$i] = $row;
//     $i++;
//   }

  echo json_encode($returnVal);
}
else
{
  http_response_code(404);
}
    // $lines = [];
    // $lines[] = "Create Account for";
    // $lines[] = $_GET;
    // echo json_encode($lines);
?>