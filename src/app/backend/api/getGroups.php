<?php
if (require 'handleCors.php') {http_response_code(200); return;}
require 'database.php';
if (!require 'checkLogin.php') {http_response_code(403); return;}

$sql = "SELECT * FROM angular.Groups as gr 
        INNER JOIN angular.GroupMembers as gm on gm.group_id = gr.group_id 
        WHERE gm.account_name = '$_GET[account]'";
if($output = _doSelect($sql)) {
  echo json_encode($output);
} else {
  echo json_encode($error);
}
?>