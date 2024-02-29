<?php
// login script
// 1. read table Accounts with accountname and hash
// 2a. if successful: generate token and enter token in Table 
// 2b. else: return status err_failed

require 'database.php';

$returnVal = [];

if(empty($_GET["account"]) || empty($_GET["hash"]) ) {
    $returnVal["status"] = "err_param";
    echo json_encode($returnVal);
    exit();
}

$sql = "SELECT * FROM `Accounts` WHERE `account_name` = '$_GET[account]' AND `login_hash` = '$_GET[hash]'";
if($result = mysqli_query($con,$sql)) {
  if(mysqli_fetch_assoc($result)) { # account exists with matching hash
    $returnVal["status"] = "success";
    $returnVal["data"] = [
      "token"=> bin2hex(random_bytes(16)),
      "expire_on" => date('Y-m-d h:m:s', strtotime('now +2 hour')),
      ];
  } else {
    $returnVal["status"] = "err_failed";
  }
  echo json_encode($returnVal);
} else {
  http_response_code(500); # DB read error, return server error
}

