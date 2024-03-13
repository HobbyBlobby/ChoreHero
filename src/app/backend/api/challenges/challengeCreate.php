<?php
if (require 'handleCors.php') {http_response_code(200); return;}
require 'database.php';
if (!require 'checkLogin.php') {http_response_code(403); return;}

// $returnVal = [];

// if(empty($_GET["account"]) || empty($_GET["hash"]) ) {
//     echo json_encode(['status' => 'err_param']);
//     http_response_code(404);
//     return;
// }

// $sql = "SELECT * FROM `Accounts` WHERE `account_name` = '$_GET[account]'";

// if($result = mysqli_query($con,$sql))
// {
//     if(!mysqli_fetch_assoc($result)) { # no results > new account to create
//         $sql = "INSERT INTO `Accounts`(`account_name`,`login_hash`) VALUES ('$_GET[account]','$_GET[hash]')";
//         if($result = mysqli_query($con,$sql)) {
//             $returnVal["status"] = "success";
//             $returnVal["data"] = ["newAccount" => $_GET["account"]];
//         } else {
//             http_response_code(404);
//             return;
//         }     
//     } else {
//         $returnVal["status"] = "err_exists";
//         echo json_encode($returnVal);
//         http_response_code(404);
//         return;
//     }
//   echo json_encode($returnVal);
//   http_response_code(200);
//   return;
// }
// else
// {
//   http_response_code(404);
// }
    // $lines = [];
    // $lines[] = "Create Account for";
    // $lines[] = $_GET;
    // echo json_encode($lines);
?>