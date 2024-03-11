<?php
// login script
// 1. read table Accounts with accountname and hash
// 2a. if successful: generate token and enter token in Table 
// 2b. else: return status err_failed

if (require 'handleCors.php') {http_response_code(200); return;}
require 'database.php';

$returnVal = [];

if(empty($_GET["account"]) || empty($_GET["hash"]) ) {
    echo json_encode(["status" => "err_param"]);
    http_response_code(500);
    return;
}

if($output = db_select("Accounts",
  ['account_name' => $_GET["account"],
   'login_hash' => $_GET["hash"]])) {

    // cleanup old logins for the same account
    db_delete("AccountLogins", [
      'account_name' => $_GET['account']
    ]);

    $token = bin2hex(random_bytes(16));
    $expiration = date('Y-m-d h:m:s', strtotime('now +2 hour'));
    if(db_insert("AccountLogins", [
      "account_name" => $_GET["account"],
      "login_token" => $token,
      "expiration_date" => $expiration
    ])) {
      echo json_encode([
        "status" => "success",
        "data" => [
          "token"=> $token,
          "expire_on" => $expiration]
      ]);
    } else {
      echo json_encode(["status"=> "err_insert_token"]);
    }
} else {
  echo json_encode(["status" => "err_failed"]);
}
?>