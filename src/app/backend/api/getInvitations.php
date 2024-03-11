<?php
if (require 'handleCors.php') {http_response_code(200); return;}
require 'database.php';
if (!require 'checkLogin.php') {http_response_code(403); return;}

$sql = "SELECT * FROM angular.GroupInvitations as inv
        INNER JOIN angular.Groups as gr on gr.group_id = inv.group_id
        WHERE account_name = '$_GET[account]'";
if(array_key_exists("group_id", $_GET)) {
  $sql = "SELECT * FROM angular.GroupInvitations as inv
  INNER JOIN angular.Groups as gr on gr.group_id = inv.group_id
  WHERE inv.group_id = '$_GET[group_id]'";
}

if($output = _doSelect($sql)) {
  echo json_encode($output);
} else {
  echo json_encode($error);
}
?>