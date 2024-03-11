<?php
if (require 'handleCors.php') {http_response_code(200); return;}
require 'database.php';
if (!require 'checkLogin.php') {http_response_code(403); return;}

if(empty($_GET["group_id"]) || empty($_GET["account_name"])) {
  echo json_encode(['status' => 'err_param']);
  http_response_code(404);
  return;
}

if($output = db_delete("GroupMembers",
  ['group_id' => $_GET["group_id"],
   'account_name' => $_GET["account_name"]
  ])) {
    echo json_encode([
      'status' => 'success', 'data' => [
        'account_name' => $_GET["account_name"],
        'group_id' => $_GET["group_id"]
    ]]);
} else {
  echo json_encode($error);
}
?>