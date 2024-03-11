<?php
// login script
// 1. if checkLogin returns FALSE > we are already logged out > success
// 2. delete AccountLogins entry

if (require 'handleCors.php') {http_response_code(200); return;}
require 'database.php';

if(!array_key_exists("account", $_GET)) {
  echo json_encode(["status" => "err_param"]);
  http_response_code(500);
  return;
}

if (!require 'checkLogin.php') {
  http_response_code(200);
  echo json_encode([
    "status" => "success",
    "data" => [
      "account_name"=> $_GET["account"]
    ]]);
      return;
}

if(db_delete("AccountLogins", [
  "account_name" => $_GET["account"]
])) {
  echo json_encode([
    "status" => "success",
    "data" => [
      "account_name"=> $_GET["account"]
    ]]);
      return;

} else {
  echo json_encode($error);
  return;
}
?>